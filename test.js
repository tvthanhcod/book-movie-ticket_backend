const db = require('./src/config/database')


for (let i = 1; i <= 80; i++) {
    db.query(`INSERT INTO seats (room_id, seat_number, seat_status, theater_id) VALUES ('1', ${i}, '0', '3');`)
}

