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
           res.status(400).json
           throw new Error ('ID talle invalido')
           
        }
        const sizeToFind = await Us_Arg_Size.findById(id)
        if (!sizeToFind) {
            res.status(404)
            throw new Error ('Marca no encontrada')
        }
        const size = sizeToFind
        return res.status(200).json(size)
    }),
    createOne: asyncHandler( async(req, res) => {
        const sizeInBody = {
            us_size: req.body.us_size,
            arg_size: req.body.arg_size
        }
        const sizeToCreate = await Us_Arg_Size.create(sizeInBody)
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
            res.status(400)
            throw new Error ('Zapatilla o Size ID invalido')
        }

        const shoeToFind = await Movie.findById(shoeId)
        const sizeToFind = await Actor.findById(sizeId)

        if (!sizeToFind || !shoeToFind) {
            res.status(404).json
            throw new Error ('Zapatilla o Talle no encontrado')
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
            res.status(400)
            throw new Error ('ID talle invalido')
        }

        const sizetoFind = await Us_Arg_Size.findById(id)
        if (!sizetoFind) {
            res.status(404)
            throw new Error ('Talle no encontrado')
        }

        const sizeToDelete = sizetoFind

        await Movie.findByIdAndRemove(sizeToDelete)

        return res.status(200).json(id)
    })
}

module.exports = controller