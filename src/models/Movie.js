
const db = require('../src/config/database')

class Movie {

    static findAll() {
        return new Promise(async (resolve) => {
            db.query("SELECT * FROM movies", (err, movies) => {
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