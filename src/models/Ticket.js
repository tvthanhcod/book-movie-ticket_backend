const db = require('../config/database')

class Ticket {
    static findAll() {
        const sql = "SELECT * FROM tickets"
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
        const { seat_number, showtime_id, account_id } = fields
        const sql = `INSERT INTO tickets (seat_number, showtime_id, account_id)
        VALUES (${seat_number}, ${showtime_id}, ${account_id})
        `
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }

    static update(ticketId, fields) {
        const sql = `UPDATE tickets SET 
        seat_number = ${fields.seat_number}, 
        showtime_id = '${fields.showtime_id}',
        account_id = ${fields.account_id}
        WHERE _id = ${ticketId}
        `
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteOne(ticketId) {
        const sql = `DELETE FROM tickets WHERE _id = ${ticketId}`
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }
}

module.exports = Ticket