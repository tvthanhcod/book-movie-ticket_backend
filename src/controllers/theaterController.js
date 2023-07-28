const theater = require('../models/Theater')

const getAll = async (req, res) => {
    const theaters = await theater.findAll()
    theaters ? res.status(200).json(theaters) : res.status(500).json({ message: false })
}

const getArea = async (req, res) => {
    const areas = await theater.findAreaAndCountTheater()
    areas ? res.status(200).json(areas) : res.status(500).json({ message: false })
}

const getAllTheater = async (req, res) => {
    const id = req.params.id
    const theaters = await theater.findTheaterByLocationId(id)
    theaters ? res.status(200).json(theaters) : res.status(500).json({ message: false })
}

const insertData = async (req, res) => {
    const theaterName = req.body.name
    const checkSameName = theater.ExistSameNameTheater(theaterName)
    if (checkSameName) {
        res.status(409).json("theater alright exist")
        return
    }
    const statusInsert = await theater.insert(req.body)
    statusInsert ? res.status(200).json({ message: "insert success" }) : res.status(500).json({ message: "insert failure" })
}


const updateTheater = async (req, res) => {
    const updateTheaterId = req.body.id
    const statusUpdate = await theater.update(updateTheaterId, req.body)
    statusUpdate ? res.status(200).json({ message: "update success" }) : res.status(500).json({ message: "insert failure" })
}


const deleteOneTheater = async (req, res) => {
    const statusDelete = await theater.deleteOne(req.body.id)
    statusDelete ? res.status(200).json({ message: "delete success" }) : res.status(500).json({ message: "delete failure" })
}


const deleteAllTheater = async (req, res) => {
    const statusDelete = await theater.deleteAll()
    statusDelete ? res.status(200).json({ message: "delete success" }) : res.status(500).json({ message: "delete failure" })
}

module.exports = {
    getAll,
    getArea,
    getAllTheater,
    insertData,
    updateTheater,
    deleteOneTheater,
    deleteAllTheater
}