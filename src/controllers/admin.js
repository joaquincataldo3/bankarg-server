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
    processLogin: asyncHandler(async (req, res) => {
        const { password, username } = req.body

        if (!username || !password) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const verifyUsername = await Admin.findOne({ username })

        if (!verifyUsername) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const admin = verifyUsername

        const verifyPassword = await bcryptjs.compare(password, admin.password)

        if (!verifyPassword) {
            res.status(404)
            throw new Error('Invalid credentials')
        }

        const secretKey = process.env.JWT

        const token = jwt.sign({ id: admin._id, isAdmin: true }, secretKey)

        res.cookie('admin_access_token', token, {
            httpOnly: true
        }).status(200).json({ admin }) 

    }),
    processRegister: asyncHandler(async (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const hashPassword = bcryptjs.hashSync(password, 10)

        const newAdmin = await Admin.create({ username, password: hashPassword })

        return res.status(201).json(newAdmin);
    }),
    updateOne: (req, res) => {

    },
    deleteOne: (req, res) => {

    }
}

module.exports = controller