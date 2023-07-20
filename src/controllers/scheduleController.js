const schedule = require('../models/Schedule')


class scheduleController {
    static async getAll(req, res) {
        const schedules = await schedule.findAll()
        schedules ? res.status(200).json(schedules) : res.status(500).json("system error")
    }

    static async insertData(req, res) {
        const statusInsert = schedule.insert(req.body)
        statusInsert ? res.status(200).json("message: insert schedule success") : res.status(500).json("message: insert schedule fail")
    }

    static async updateSchedule(req, res) {
        const updateScheduleId = req.body.id
        const statusUpdate = await schedule.update(updateScheduleId, req.body)
        statusUpdate ? res.status(200).json({ message: "update schedule success" }) : res.status(500).json({ message: "insert schedule failure" })
    }

    static async deleteOneTheater(req, res) {
        const statusDelete = await schedule.deleteOne(req.body.id)
        statusDelete ? res.status(200).json({ message: "delete schedule success" }) : res.status(500).json({ message: "delete schedule failure" })
    }
}

module.exports = scheduleController
