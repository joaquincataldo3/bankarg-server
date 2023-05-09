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
            res.status(400)
            throw new Error ('ID de marca invalido')
            
        }
        const brandToFind = await Brand.findById(id)
        if (!brandToFind) {
            res.status(404).json 
            throw new Error ('Marca no encontrada')
        }
        const brand = brandToFind
        res.status(200).json(brand)
    }),
    createOne: asyncHandler(async (req, res) => {
        const brandInBody = {
            name: req.body.name
        }
        const brandToCreate = await Brand.create(brandInBody)
        res.status(201).json(brandToCreate)
    }),
    updateOne: asyncHandler(async (req, res) => {
        const id = req.params.brandId
        if (!ObjectId.isValid(id)) {
           res.status(400)
           throw new Error ('ID de marca invalido')
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
           res.status(400)
           throw new Error ('ID de marca invalido')
        }

        await Movie.findByIdAndRemove(id)

        return res.status(200).json(id)
    })
}

module.exports = controller