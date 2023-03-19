const Admin = require('../../db/models/Admin')
const bcryptjs = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const controller = {
    getAll: (req, res) => {
        return res.status(200).json({msg: 'all admins'})
    },
    getOne: (req, res) => {

    },
    processLogin: (req, res) => {

    },
    processRegister: asyncHandler(async (req, res) => {
        const { username, password } = req.body

        if (!username || !password ) {
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