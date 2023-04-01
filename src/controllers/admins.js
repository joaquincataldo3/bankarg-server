const Admin = require('../../db/models/Admin')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const maxAge = 360

const controller = {
    getAll: asyncHandler( async (req, res) => {
        const admins = await Admin.find()
        res.status(200).json(admins)
    }),
    getOne: asyncHandler( async (req, res) => {
        const id = req.params.adminId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'Admin id invalid'
            });
        }
        const adminToFind = await Admin.findById(id)
        if (!adminToFind) {
            return res.status(404).json({ msg: 'Admin not found' })
        }
        const admin = adminToFind
        return res.status(200).json(admin)
    }),
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

        /* const tokenAdminInfo = {
            id: admin._id,
            isAdmin: true
        } */

        const token = jwt.sign({...admin, isAdmin: true}, secretKey)

        res.cookie('user_access_token', token, {
            httpOnly: true, maxAge: maxAge * 10000
        })
        
        return res.status(200).json({ admin, token }) 

    }),
    register: asyncHandler(async (req, res) => {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            res.status(400)
            throw new Error('Please complete all the fields')
        }

        const hashPassword = bcryptjs.hashSync(password, 10)

        const newAdmin = await Admin.create({ username, password: hashPassword, email })

        return res.status(201).json(newAdmin);
    }),
    logout: (req, res) => {
        res.cookie('user_access_token', '', {maxAge: 1})
        res.status(200).json({ msg: "you've been logged out" })
    },
    updateOne: (req, res) => {

    },
    deleteOne: (req, res) => {

    }
}

module.exports = controller