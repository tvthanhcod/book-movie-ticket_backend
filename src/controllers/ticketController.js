const ticket = require('../models/Ticket')


class ticketController {
    static async getAll(req, res) {
        const tickets = await ticket.findAll()
        tickets ? res.status(200).json(tickets) : res.status(500).json("system error")
    }

    static async insertData(req, res) {
        const statusInsert = ticket.insert(req.body)
        statusInsert ? res.status(200).json("message: insert ticket success") : res.status(500).json("message: insert ticket fail")
    }

    static async updateticket(req, res) {
        const updateticketId = req.body.id
        const statusUpdate = await ticket.update(updateticketId, req.body)
        statusUpdate ? res.status(200).json({ message: "update ticket success" }) : res.status(500).json({ message: "insert ticket failure" })
    }

    static async deleteOneTheater(req, res) {
        const statusDelete = await ticket.deleteOne(req.body.id)
        statusDelete ? res.status(200).json({ message: "delete ticket success" }) : res.status(500).json({ message: "delete ticket failure" })
    }
}

module.exports = ticketController
