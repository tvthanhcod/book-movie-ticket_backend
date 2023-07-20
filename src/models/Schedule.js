const db = require('../src/config/database')


class Schedule {

    // find all 
    static async findAll() {
        return new Promise(resolve => {
            db.query(`
            SELECT schedules._id, schedules.show_date, movies.title AS movie_name, 
            theaters.name AS theater_name FROM schedules
            JOIN movies ON schedules.movie_id = movies._id 
            JOIN theaters ON schedules.theater_id = theaters._id 
            `, (err, schedules) => {
                err ? resolve(err) : (schedules.length > 0 ? resolve(schedules) : resolve([]))
            })
        })
    }

    static insert(fields) {

        const { show_date, movie_id, theater_id } = fields

        const sql = `INSERT INTO schedules (show_date, movie_id, theater_id)
        VALUES ('${show_date}', ${movie_id}, ${theater_id})
        `
        return new Promise(resolve => {
            db.query(sql, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static update(scheduleId, fields) {
        const sql = `UPDATE schedules SET 
        show_date = '${fields.show_date}', 
        movie_id = ${fields.movie_id}, theater_id = ${fields.theater_id}
        WHERE _id = ${scheduleId}
        `
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteOne(scheduleId) {
        const sql = `DELETE FROM schedules WHERE _id = ${scheduleId}`
        return new Promise(resolve => {
            db.query(sql, err => {
                resolve(err ? false : true)
            })
        })
    }
}

module.exports = Schedule