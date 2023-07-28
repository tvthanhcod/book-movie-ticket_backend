
const db = require('../../src/config/database')

class Movie {

    static findAll() {
        return new Promise(async (resolve) => {
            db.query(`SELECT D._id, D.title, E.name as name_category, D.duration, D.thumbnail, D.director, D.createAt, D.show_date, D.theater_name , F.start_time, F.end_time, F.price 
            from (SELECT B._id, B.title, B.category_id, B.duration, B.thumbnail, B.director, B.createAt, A.show_date, C.name as theater_name , A._id as schedule_id  
            FROM schedules A INNER JOIN movies B ON A.movie_id = B._id JOIN theaters C ON A.theater_id = C._id) D 
            JOIN catgories E ON D.category_id = E._id JOIN showtimes F ON D.schedule_id = F.schedule_id
            `, (err, movies) => {
                resolve(err ? err : movies)
            })
        })
    }

    static findOne(id) {
        return new Promise(async (resolve) => {
            db.query(`SELECT D._id, D.title, E.name as name_category, D.duration, D.thumbnail, D.director, D.createAt, D.show_date, D.theater_name , F.start_time, F.end_time, F.price 
            FROM (SELECT B._id, B.title, B.category_id, B.duration, B.thumbnail, B.director, B.createAt, A.show_date, C.name as theater_name , A._id as schedule_id 
            FROM schedules A INNER JOIN movies B ON A.movie_id = B._id JOIN theaters C ON A.theater_id = C._id WHERE B._id = ${id} ) D JOIN catgories E ON D.category_id = E._id JOIN showtimes F ON D.schedule_id = F.schedule_id;
            `, (err, movies) => {
                resolve(err ? err : movies)
            })
        })
    }


    static ExistSameNameMovie(movieName) {
        return new Promise(resolve => {
            db.query(`SELECT * FROM movies WHERE title = "${movieName}"`, (err, movies) => {
                err ? resolve(err) : resolve(movies.length > 0 ? true : false)
            })
        })
    }


    static insert(fields) {
        const { title, category_id, duration, thumbnail, director } = fields
        const sqlStr = `INSERT INTO movies (title, category_id, duration, thumbnail, director)
        values ("${title}", ${category_id}, "${duration}", "${thumbnail}", "${director}")
        `
        return new Promise(async (resolve) => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static update(movieUpdateId, fields) {
        const { title, category_id, duration, thumbnail, director } = fields
        const sqlStr = `UPDATE movies 
        SET title = "${title}", category_id = ${category_id}, duration = "${duration}", thumbnail = "${thumbnail}", director = "${director}")
        WHERE _id = ${movieUpdateId}
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteOne(movie_id) {
        const sqlStr = `
            DELETE FROM movies WHERE _id = ${movie_id}
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteAll() {
        const sqlStr = `
            DELETE FROM movies
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }
}

module.exports = Movie