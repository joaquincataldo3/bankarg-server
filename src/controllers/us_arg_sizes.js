const Us_Arg_Size = require('../../db/models/Us_Arg_Size')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')


const controller = {
    getAll: asyncHandler( async(req, res) => {
        const sizes = await Us_Arg_Size.find()
        res.status(200).json(sizes)
    }),
    getOne: asyncHandler( async(req, res) => {
        const id = req.params.sizeId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'Size id invalid'
            });
        }
        const sizeToFind = await Us_Arg_Size.findById(id)
        if (!sizeToFind) {
            return res.status(404).json({ msg: 'Brand not found' })
        }
        const size = sizeToFind
        return res.status(200).json(size)
    }),
    createOne: asyncHandler( async(req, res) => {
        const sizeInBody = {
            us_size: req.body.us_size,
            arg_size: req.body.arg_size
        }
        const sizeToCreate = await Brand.create(sizeInBody)
        const size = sizeToCreate
        return res.status(201).json(size)
    }),
    updateOne: asyncHandler( async(req, res) => {

    }),
    deleteOne: asyncHandler( async(req, res) => {
        
    })
}

module.exports = controller