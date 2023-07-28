const db = require('../../src/config/database')
require('dotenv').config()



class User {


    static findAll() {
        const sql = 'SELECT * FROM customers'
        return new Promise(resolve => {
            db.query(sql, (err, data) => {
                resolve(err ? err : data)
            })
        })
    }

    static find(userId) {
        return new Promise(resolve => {
            db.query(`SELECT * FROM customers WHERE _id = ${userId}`, (err, user) => {
                if (err) {
                    resolve(err)
                } else {
                    user.length > 0 ? resolve(user) : resolve([])
                }
            })
        })
    }

    static async insert(fields) {
        const connect = await db.promise().getConnection()
        try {
            await connect.beginTransaction()
            return new Promise(async (resolve) => {
                db.query(`INSERT INTO accounts (username, password) values ("${fields.username}", "${fields.password}")`, async (err, data) => {
                    if (err) {
                        await connect.rollback()
                        connect.release()
                        resolve(false)
                        return
                    }
                    const sqltr = `INSERT INTO customers ( name, phone, email, account_id ) values ("${fields.name}", "${fields.phone}", "${fields.email}", ${data.insertId})`
                    db.query(sqltr, async (err) => {
                        if (err) {
                            await connect.rollback()
                            connect.release()
                            resolve(false)
                        } else {
                            await connect.commit()
                            connect.release()
                            resolve(true)
                        }
                    })
                })
            })
        } catch (error) {
            await connect.rollback()
            connect.release()
            throw error
        }

    }

    static updateUser(userId, updateFields) {
        const name = updateFields.name
        const phone = updateFields.phone
        const email = updateFields.email

        return new Promise(resolve => {
            const sql = `UPDATE customers SET name = "${name}", phone = "${phone}", email = "${email}" WHERE _id = ${userId}`
            db.query(sql, (err) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }

    static async deleteOne(userId) {
        // delete all about info customer and account
        const poolConnect = await db.promise().getConnection();
        try {
            await poolConnect.beginTransaction()
            return new Promise(resolve => {
                //command block 1
                db.query(`DELETE FROM customer WHERE _id=${userId}`, async (err) => {
                    if (err) {
                        await poolConnect.rollback()
                        poolConnect.release()
                        resolve(false)
                        return
                    } else {
                        // command block 2
                        db.query(`DELETE FROM customer WHERE _id=${userId}`, async (err) => {
                            err ? (
                                await poolConnect.rollback(),
                                poolConnect.release(),
                                resolve(false)
                            ) : (
                                await poolConnect.commit(),
                                poolConnect.release(),
                                resolve(true)
                            );
                        })
                    }
                })
            })
        } catch (error) {
            await poolConnect.rollback()
            poolConnect.release()
        }
    }
}


module.exports = User