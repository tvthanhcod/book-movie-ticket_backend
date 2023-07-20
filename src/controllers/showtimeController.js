const showtime = require('../models/Showtime')


class showtimeController {
    static async getAll(req, res) {
        const showtimes = await showtime.findAll()
        showtimes ? res.status(200).json(showtimes) : res.status(500).json("system error")
    }

    static async insertData(req, res) {
        const statusInsert = showtime.insert(req.body)
        statusInsert ? res.status(200).json("message: insert showtime success") : res.status(500).json("message: insert showtime fail")
    }

    static async updateshowtime(req, res) {
        const updateshowtimeId = req.body.id
        const statusUpdate = await showtime.update(updateshowtimeId, req.body)
        statusUpdate ? res.status(200).json({ message: "update showtime success" }) : res.status(500).json({ message: "insert showtime failure" })
    }

    static async deleteOneTheater(req, res) {
        const statusDelete = await showtime.deleteOne(req.body.id)
        statusDelete ? res.status(200).json({ message: "delete showtime success" }) : res.status(500).json({ message: "delete showtime failure" })
    }
}

module.exports = showtimeController
