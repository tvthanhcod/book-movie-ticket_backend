
const db = require('../config/database')

class Theater {

    static findAll() {
        return new Promise(resolve => {
            db.query("SELECT * FROM theaters", (err, theaters) => {
                resolve(err ? err : theaters)
            })
        })
    }

    static ExistSameNameTheater(theaterName) {
        return new Promise(resolve => {
            db.query(`SELECT * FROM theaters WHERE name = "${theaterName}"`, (err, theaters) => {
                err ? resolve(err) : resolve(theaters.length > 0 ? true : false)
            })
        })
    }

    static insert(fields) {
        const { name, location } = fields
        const sqlStr = `INSERT INTO theaters (name, location)
        VALUES ("${name}", "${location}")
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static update(theaterUpdateId, fields) {
        const { name, location } = fields
        const sqlStr = `UPDATE theaters 
        SET name = "${name}", location = "${location}")
        WHERE _id = ${theaterUpdateId}
        `
        return new Promise(async (resolve) => {
            db.query(sqlStr, (err) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }

    static deleteOne(theater_id) {
        const sqlStr = `
            DELETE FROM theaters where _id = ${theater_id}
        `
        return new Promise(async (resolve) => {
            db.query(sqlStr, (err) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }

    static deleteAll() {
        const sqlStr = `
            DELETE FROM theaters
        `
        return new Promise(async (resolve) => {
            db.query(sqlStr, (err) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }
}

module.exports = Theater
