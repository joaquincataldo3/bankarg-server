const Shoe = require('../../db/models/Shoe')
const Image = require('../../db/models/Image')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')

const controller = {
    getAll: asyncHandler(async (req, res) => {
        const shoes = await Brand.find()
        res.status(200).json(shoes)
    }),
    getOne: asyncHandler(async (req, res) => {
        const id = req.params.shoeId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'Shoe id invalid'
            });
        }
        const shoeToFind = await Brand.findById(id)
        if (!shoeToFind) {
            return res.status(404).json({ msg: 'Shoe not found' })
        }
        const shoe = shoeToFind
        return res.status(200).json(shoe)
    }),
    createOne: asyncHandler(async (req, res) => {
        const shoeInBody = {
            name: req.body.name,
            brand: req.body.brand,
            sizes: req.body.sizes,
            inStock: req.body.inStock
        }
        const shoeToCreate = await Brand.create(shoeInBody)
        const shoe = shoeToCreate
        const shoeImages = req.files
        const imgsToPush = shoeImages.forEach(img => {
            return {
                image: img,
                shoe_id: shoe._id
            }
        })
        await Image.insertMany(imgsToPush)
        return res.status(201).json(shoe)
    }),
    updateOne: asyncHandler(async (req, res) => {

    }),
    deleteOne: asyncHandler(async (req, res) => {
        
    })
}

module.exports = controller