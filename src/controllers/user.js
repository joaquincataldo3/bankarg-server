const User = require('../../db/models/User')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const controller = {
    getAll: (req, res) => {
        return res.status(200).json({ msg: 'all users' })
    },
    getOne: (req, res) => {

    },
    processLogin: (req, res) => {

    },
    processRegister: asyncHandler(async (req, res) => {

        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400)
            throw new Error('Please complete all the fields')
         }

        const newUser = await User.create({ username, password, email })

        return res.status(201).json(newUser);

    }),
    updateOne: (req, res) => {

    },
    deleteOne: (req, res) => {

    }
}

module.exports = controller