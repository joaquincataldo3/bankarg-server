const Admin = require('../../db/models/Admin')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const controller = {
    getAll: (req, res) => {
        return res.status(200).json({ msg: 'all admins' })
    },
    getOne: (req, res) => {

    },
    login: asyncHandler(async (req, res) => {
        const { password, email } = req.body

        if (!password || !email) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const verifyEmail = await Admin.findOne({ email })

        if (!verifyEmail) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const admin = verifyEmail

        const verifyPassword = await bcryptjs.compare(password, admin.password)

        if (!verifyPassword) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const secretKey = process.env.JWT

        const tokenAdminInfo = {
            id: admin._id,
            isAdmin: true
        }

        const token = jwt.sign(tokenAdminInfo, secretKey, {expiresIn: "1h"})

        res.cookie('user_access_token', token, {
            httpOnly: true
        }).status(200).json({ admin }) 

    }),
    register: asyncHandler(async (req, res) => {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const hashPassword = bcryptjs.hashSync(password, 10)

        const newAdmin = await Admin.create({ username, password: hashPassword. email })

        return res.status(201).json(newAdmin);
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