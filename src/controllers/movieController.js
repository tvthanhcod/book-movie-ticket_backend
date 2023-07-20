
const movie = require('../models/Movie')

const getAll = async (req, res) => {
    const movies = await movie.findAll()
    movies ? res.status(200).json(movies) : res.status(500).json("message: system error")
}

const insertData = async (req, res) => {
    const movieName = req.body.title
    const checkSameName = await movie.ExistSameNameMovie(movieName)
    if (checkSameName) {
        res.status(409).json("movie alright exist")
        return
    }
    const statusInsert = await movie.insert(req.body)
    statusInsert ? res.status(200).json("message: insert movie success") : res.status(500).json("message: insert movie fail")
}


const updateMovie = async (req, res) => {
    const updateId = req.body.id

    const statusUpdate = await movie.update(updateId, req.body)
    statusUpdate ? res.status(200).json("message: update movie success") : res.status(500).json("message: update movie fail")
}


const deleteOneMovie = async (req, res) => {
    const statusDelete = await movie.deleteOne(req.body.id)
    statusDelete ? res.status(200).json("message: delete movie success") : res.status(500).json("message: delete movie success")
}


const deleteAllMovie = async (req, res) => {
    const statusDelete = await movie.deleteAll()
    statusDelete ? res.status(200).json("message: delete all movie success") : res.status(500).json("message: delete all movie fail")
}

module.exports = {
    getAll,
    insertData,
    updateMovie,
    deleteOneMovie,
    deleteAllMovie
}