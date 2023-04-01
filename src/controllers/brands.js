const Brand = require('../../db/models/Brand')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')



const controller = {
    getAll: asyncHandler(async (req, res) => {
        const brands = await Brand.find()
        res.status(200).json(brands)
    }),
    getOne: asyncHandler(async (req, res) => {
        const id = req.params.brandId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'Brand id invalid'
            });
        }
        const brandToFind = await Brand.findById(id)
        if (!brandToFind) {
            return res.status(404).json({ msg: 'Brand not found' })
        }
        const brand = brandToFind
        return res.status(200).json(brand)
    }),
    createOne: asyncHandler(async (req, res) => {
        const brandInBody = {
            name: req.body.name
        }
        const brandToCreate = await Brand.create(brandInBody)
        return res.status(201).json(brandToCreate)
    }),
    updateOne: asyncHandler(async (req, res) => {
        const id = req.params.brandId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Brand ID invalid' })
        }
        const brandDataToUpdate = {
            name: req.body.name
        }
        const updatedMovie = await Movie.findByIdAndUpdate(id, brandDataToUpdate, { new: true }) // new option returns the document after applied

        return res.status(201).json(updatedMovie)
    }),
    deleteOne: asyncHandler(async (req, res) => {
        const id = req.params.brandId

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Brand id invalid' })
        }

        await Movie.findByIdAndRemove(id)

        return res.status(200).json({ msg: 'Movie successfully deleted', id: id })
    })
}

module.exports = controller