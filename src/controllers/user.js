const User = require('../../db/models/User')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const controller = {
    getAll: (req, res) => {
        return res.status(200).json({ msg: 'all users' })
    },
    getOne: (req, res) => {

    },
    processLogin: asyncHandler(async (req, res) => {
        const { password, email } = req.body

        if (!email || !password) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const verifyUsername = await User.findOne({ email })

        if (!verifyUsername) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const user = verifyUsername

        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const secretKey = process.env.JWT

        const token = jwt.sign({id: user._id, isUser: true}, secretKey)

        res.cookie('user_access_token', token, {
            httpOnly: true
        }).status(200).json({user})


    }),
    processRegister: asyncHandler(async (req, res) => {

        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const hashPassword = bcryptjs.hashSync(password, 10)

        const newUser = await User.create({ username, password: hashPassword, email })

        return res.status(201).json(newUser);

    }),
    updateOne: (req, res) => {

    },
    deleteOne: (req, res) => {

    }
}

module.exports = controller