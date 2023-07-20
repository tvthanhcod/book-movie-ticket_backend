const category = require('../models/Theater')

const getAll = async (req, res) => {
    const categories = await category.findAll()
    categories ? res.status(200).json(categories) : res.status(500).json("message: system error")
}

const insertData = async (req, res) => {
    const statusInsert = await category.insert(req.body)
    statusInsert ? res.status(200).json("message: insert category success") : res.status(500).json("message: insert category fail")
}


const updateCategory = async (req, res) => {
    const statusUpdate = await category.update(req.body.id, req.body.name)
    statusUpdate ? res.status(200).json("message: update category success") : res.status(500).json("message: update category fail")
}


const deleteOneCategory = async (req, res) => {
    const statusDelete = await category.deleteOne(req.body.id)
    statusDelete ? res.status(200).json("message: delete category success") : res.status(500).json({ message: "delete category fail" })
}


const deleteAllCategory = async (req, res) => {
    const statusDelete = await category.deleteAll()
    statusDelete ? res.status(200).json("message: delete all category success") : res.status(500).json("message: delete all category fail")
}

module.exports = {
    getAll,
    insertData,
    updateCategory,
    deleteOneCategory,
    deleteAllCategory
}