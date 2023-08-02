
const db = require('../../src/config/database')

class Theater {

    static findAll() {
        return new Promise(resolve => {
            db.query(`SELECT * FROM theaters`,
                (err, theaters) => {
                    resolve(err ? err : theaters)
                })
        })
    }

    static findOneById(id, date) {
        return new Promise(resolve => {
            db.query(`SELECT C.theater_id, C.name AS theater_name, C.location_id, C.show_date, D._id AS showtime_id, D.start_time, D.end_time, D.price, D.room_id, E._id AS movie_id, E.title, E.thumbnail
        FROM(Select A._id AS theater_id, A.name, A.location AS location_id, B._id AS schedule_id, B.show_date, B.movie_id
            FROM theaters A JOIN schedules B ON A._id = B.theater_id WHERE A._id = ${id} and B.show_date = '${date}') C JOIN showtimes D ON C.schedule_id = D.schedule_id JOIN movies E ON C.movie_id = E._id`,
                (err, theaters) => {
                    resolve(err ? err : theaters)
                })
        })
    }

    static findAreaAndCountTheater = () => {
        return new Promise(resolve => {
            db.query(`SELECT A._id, A.address, count(location) AS number_theater 
            FROM theater_location A JOIN theaters B ON A._id = B.location
            GROUP BY B.location`, (err, areas) => {
                resolve(err ? err : areas)
            })
        })
    }

    static findTheaterByLocationId = (id) => {
        return new Promise(resolve => {
            db.query(`SELECT A._id, A.name 
            FROM theaters A JOIN theater_location B ON A.location = B._id WHERE B._id = ${id}`, (err, theaters) => {
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
