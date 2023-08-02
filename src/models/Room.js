const db = require('../config/database')


class Room {

    static findByRoomAndTheater(condition) {
        const { roomId, theaterId } = condition
        return new Promise(resolve => {
            const sql = `SELECT A._id AS room_id , A.theater_id, A.seat_total, B.seat_number, B.seat_status, B.seat_typeId
            FROM rooms A JOIN seats B ON A._id = B.room_id AND A.theater_id = B.theater_id WHERE A._id = ${roomId} AND A.theater_id = ${theaterId}`
            db.query(sql, (err, result) => {
                resolve(err ? [] : result)
            })
        })
    }

}

module.exports = Room