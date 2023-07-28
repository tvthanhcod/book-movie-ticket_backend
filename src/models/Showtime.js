const db = require('../../src/config/database')

class Showtime {
    static findAll() {
        const sql = "SELECT * FROM showtimes"
        return new Promise(resolve => {
            db.query(sql, (err, result) => {
                err ? (resolve(err)) : (
                    result.length > 0 ? (
                        resolve(result)
                    ) : (resolve([]))
                )
            })
        })
    }

    static insert(fields) {
        const { start_time, end_time, price, schedule_id } = fields
        const sql = `INSERT INTO showtimes (start_time, end_time, price, schedule_id)
        VALUES ("${start_time}", "${end_time}", ${price}, ${schedule_id})
        `
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }

    static update(showtimeId, fields) {
        const sql = `UPDATE showtimes SET 
        start_time = '${fields.start_time}', 
        end_time = '${fields.end_time}', price = ${fields.price},
        schedule_id = ${fields.schedule_id}
        WHERE _id = ${showtimeId}
        `
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteOne(showtimeId) {
        const sql = `DELETE FROM showtimes WHERE _id = ${showtimeId}`
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }
}

module.exports = Showtime