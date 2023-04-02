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

        const sizeDataToUpdate = {
            us_size: req.body.us_size,
            arg_size: req.body.arg_size
        }
        const updatedMovie = await Movie.findByIdAndUpdate(id, sizeDataToUpdate, { new: true }) // new option returns the document after applied

        return res.status(204).json(updatedMovie)
    }),
    pushSizeInShoe:  asyncHandler( async(req, res) => {
        const shoeId = req.query.sh
        const sizeId = req.query.si

        if (!ObjectId.isValid(shoeId) || !ObjectId.isValid(sizeId)) {
            return res.status(400).json({ msg: 'Shoe or Size ID invalid' })
        }

        const shoeToFind = await Movie.findById(shoeId)
        const sizeToFind = await Actor.findById(sizeId)

        if (!sizeToFind || !shoeToFind) {
            return res.status(404).json({ msg: 'Shoe or Size not found' })
        }

        
        const size = sizeToFind

        const shoeUpdated = await Movie.findByIdAndUpdate(shoeId, 
            {
            $addToSet: { // it pushes the actor in case is not found
                sizes: size
            },
        }, {
            new: true
        })

        return res.status(200).json(shoeUpdated)

    }),
    deleteOne: asyncHandler( async(req, res) => {
        const id = req.params.sizeId

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Size id invalid' })
        }

        const sizetoFind = await Us_Arg_Size.findById(id)
        if (!sizetoFind) {
            return res.status(404).json({ msg: 'Size not found' })
        }

        const sizeToDelete = sizetoFind

        await Movie.findByIdAndRemove(sizeToDelete)

        return res.status(200).json({ msg: 'Size successfully deleted', id: id })
    })
}

module.exports = controller