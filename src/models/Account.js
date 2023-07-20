const db = require('../src/config/database')


class Account {

    static updatePassword(userId, newPassword) {
        return new Promise(resolve => {
            db.query(`UPDATE accounts SET password = "${newPassword}" WHERE _id = ${userId}`, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static findAll() {
        return new Promise(resolve => {
            db.query(`SELECT * FROM accounts`, (err, accounts) => {
                resolve(err ? err : accounts)
            })

        })

    }
}


module.exports = Account