const db = require('../config/database')

class Seat {
    static updateStatusSeat(fields) {
        const { room_id, theater_id, seatUpdate, statusUpdate } = fields
        const sql = `UPDATE seats SET seat_status = ${statusUpdate} 
            where room_id = ${room_id} 
            and theater_id = ${theater_id} 
            and seat_number = ${seatUpdate}`
        return new Promise(resolve => {
            db.query(sql, (err) => {
                err ? resolve(false) : resolve(true)
            })
        })
    }
}

module.exports = Seat