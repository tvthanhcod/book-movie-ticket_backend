const theater = require('../models/Theater')

const getAll = async (req, res) => {
    const theaters = await theater.findAll()
    theaters ? res.status(200).json(theaters) : res.status(500).json({ message: false })
}

const getTheaterById = async (req, res) => {
    const id = req.params.id
    const date = req.params.date
    const dataTheater = await theater.findOneById(id, date)
    const groupMovie = {}
    const groupShowDate = {}
    const dataResult = {}


    dataTheater.map(theater => {
        const { theater_id, theater_name, location_id, movie_id, title, thumbnail, showtime_id, show_date, start_time, end_time, price } = theater
        dataResult['theater_id'] = theater_id
        dataResult['theater_name'] = theater_name
        dataResult['theater_location'] = location_id
        if (!groupMovie[movie_id]) {
            groupShowDate[`${movie_id}-${show_date}`] = {
                show_date,
                data_detail: [
                    { showtime_id, start_time, end_time, price }
                ]
            }
            groupMovie[movie_id] = {
                movie_id,
                title,
                thumbnail,
                data: [groupShowDate[`${movie_id}-${show_date}`]]
            }
        } else {
            if (!groupShowDate[`${movie_id}-${show_date}`]) {
                groupShowDate[`${movie_id}-${show_date}`] = {
                    show_date,
                    data_detail: [
                        { showtime_id, start_time, end_time, price }
                    ]
                }
                groupMovie[movie_id] = {
                    movie_id,
                    title,
                    thumbnail,
                    data: [...groupMovie[movie_id].data, groupShowDate[`${movie_id}-${show_date}`]]
                }

            } else {
                groupShowDate[`${movie_id}-${show_date}`] = {
                    show_date,
                    data_detail: [...groupShowDate[`${movie_id}-${show_date}`].data_detail, { showtime_id, start_time, end_time, price }]
                }
                const updateDataGroupMovie = groupMovie[movie_id].data.map(item => {
                    const grmDate = new Date(item.show_date).getTime()
                    const grSDate = new Date(groupShowDate[`${movie_id}-${show_date}`].show_date).getTime()
                    if (grmDate === grSDate) {
                        item.data_detail = [...groupShowDate[`${movie_id}-${show_date}`].data_detail]
                    }
                    return item
                })
                groupMovie[movie_id] = {
                    movie_id,
                    title,
                    thumbnail,
                    data: updateDataGroupMovie
                }
            }
        }
    }
    )
    const groupMovieResult = Object.keys(groupMovie).map(key => groupMovie[key])
    dataResult['data'] = [...groupMovieResult]

    dataResult ? res.status(200).json(dataResult) : res.status(500).json({ message: false })
}

const getArea = async (req, res) => {
    const areas = await theater.findAreaAndCountTheater()
    areas ? res.status(200).json(areas) : res.status(500).json({ message: false })
}

const getAllTheaterByLocation = async (req, res) => {
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
    getTheaterById,
    getArea,
    getAllTheaterByLocation,
    insertData,
    updateTheater,
    deleteOneTheater,
    deleteAllTheater
}