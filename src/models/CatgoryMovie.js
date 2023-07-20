const db = require('../config/database')


class Category {

    static findAll() {
        return new Promise(resolve => {
            db.query("SELECT * FROM categories", (err, data) => {
                resolve(err ? err : data)
            })
        })
    }

    static insert(category_name) {
        const sqlStr = `INSERT INTO categories (name)
        values ("${category_name}")
        `
        return new Promise(resolve => {
            db.query(sqlStr, err => {
                resolve(err ? false : true)
            })
        })
    }

    static update(categoryUpdateId, name) {
        const sqlStr = `UPDATE categories 
        SET name = "${name}")
        WHERE _id = ${categoryUpdateId}
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteOne(category_id) {
        const sqlStr = `
            DELETE FROM categories where _id = ${category_id}
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }

    static deleteAll() {
        const sqlStr = `
            DELETE FROM categories
        `
        return new Promise(resolve => {
            db.query(sqlStr, (err) => {
                resolve(err ? false : true)
            })
        })
    }
}

module.exports = Category