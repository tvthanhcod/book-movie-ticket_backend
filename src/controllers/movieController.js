
const movie = require('../models/Movie')

const getAll = async (req, res) => {
    const groupObject = {}
    const movies = await movie.findAll()
    if (movies.length > 0) {
        movies.forEach((movie) => {
            const { _id, title, name_category,
                duration, thumbnail, director, createAt,
                show_date, theater_name,
                start_time, end_time, price } = movie
            if (!groupObject[_id]) {
                groupObject[_id] = {
                    _id,
                    title,
                    name_category,
                    duration,
                    thumbnail,
                    director,
                    createAt,
                    data_detail: [{
                        show_date,
                        theater_name,
                        start_time,
                        end_time,
                        price
                    }]
                }
            } else {
                groupObject[_id].data_detail = [...groupObject[_id].data_detail, {
                    show_date,

                    theater_name,
                    start_time,
                    end_time,
                    price
                }]
            }
        })
    }

    const resultData = Object.keys(groupObject).map(key => ({
        ...groupObject[key]
    }))

    movies ? res.status(200).json(resultData) : res.status(500).json("message: system error")
}

const getOne = async (req, res) => {
    const movieId = req.params.id
    const groupObject = {}
    const movies = await movie.findOne(movieId)
    if (movies.length > 0) {
        movies.forEach((movie) => {
            const { _id, title, name_category,
                duration, thumbnail, director, createAt,
                show_date, theater_name,
                start_time, end_time, price } = movie
            if (!groupObject[_id]) {
                groupObject[_id] = {
                    _id,
                    title,
                    name_category,
                    duration,
                    thumbnail,
                    director,
                    createAt,
                    data_detail: [{
                        show_date,
                        theater_name,
                        start_time,
                        end_time,
                        price
                    }]
                }
            } else {
                groupObject[_id].data_detail = [...groupObject[_id].data_detail, {
                    show_date,
                    theater_name,
                    start_time,
                    end_time,
                    price
                }]
            }
        })
    }

    const resultData = groupObject[Object.keys(groupObject)[0]]
    movies ? res.status(200).json(resultData) : res.status(500).json("message: system error")
}

const insertData = async (req, res) => {
    const movieName = req.body.title
    const thumbnail = req.file.path
    console.log(thumbnail)
    req.body = { ...req.body, thumbnail: thumbnail }
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
    getOne,
    insertData,
    updateMovie,
    deleteOneMovie,
    deleteAllMovie
}