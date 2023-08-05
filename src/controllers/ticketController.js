const ticket = require('../models/Ticket')
const seat = require('../models/Seat')


class ticketController {
    static async getAll(req, res) {
        const tickets = await ticket.findAll()
        tickets ? res.status(200).json(tickets) : res.status(500).json("system error")
    }

    static async insertData(req, res) {
        const { account_id, room_id, theater_id, showtime_id, seats_booked } = req.body
        const statusInsert = await ticket.insert({
            account_id,
            showtime_id,
            seats_booked
        })
        if (statusInsert) {
            seats_booked.map(async (itemSeat) => {
                const statusUpdateSeat = await seat.updateStatusSeat({
                    room_id: room_id,
                    theater_id: theater_id,
                    seatUpdate: Number(itemSeat),
                    statusUpdate: 1
                });
                if (!statusUpdateSeat) {
                    res.status(500).json({ errorCode: 2, message: "ERROR HANDLE IN DATABASE" })
                }
            })
            res.status(200).json({ errorCode: 0, message: "INSERT TICKET SUCCESS" });
        } else { res.status(500).json({ errorCode: 1, message: "ERROR FROM SERVER" }) }
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
