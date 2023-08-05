const db = require('../../src/config/database')

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
        const { seats_booked, showtime_id, account_id } = fields

        let sql = `INSERT INTO tickets (seat_number, showtime_id, account_id)
            VALUES`
        seats_booked.forEach(seat_number => {
            if (seats_booked[seats_booked.length - 1] !== seat_number) {
                sql += `(${Number(seat_number)}, ${showtime_id}, ${account_id}),`
            } else {
                sql += `(${Number(seat_number)}, ${showtime_id}, ${account_id})`
            }
        })
        return new Promise(resolve => {
            db.query(sql, err => {
                err ? resolve(false) : resolve(true)
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