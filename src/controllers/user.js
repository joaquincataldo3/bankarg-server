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
    login: asyncHandler(async (req, res) => {
        const { password, email } = req.body

        if (!email || !password) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const verifyEmail = await User.findOne({ email })

        if (!verifyEmail) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const user = verifyEmail

        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const secretKey = process.env.JWT

        const tokenUserInfo = {
            id: user._id,
            isAdmin: false
        }

        const token = jwt.sign(tokenUserInfo, secretKey, {expiresIn: "1h"})

        res.cookie('user_access_token', token, {
            httpOnly: true
        }).status(200).json({user})


    }),
    register: asyncHandler(async (req, res) => {

        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const hashPassword = bcryptjs.hashSync(password, 10)

        const newUser = await User.create({ username, password: hashPassword, email })

        return res.status(201).json(newUser);

    }),
    logout: (req, res) => {
        res.clearCookie('user_access_token')
    },
    updateOne: (req, res) => {

    },
    deleteOne: (req, res) => {

    }
}

module.exports = controller