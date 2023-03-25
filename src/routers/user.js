const controller = require('../controllers/user')
const express = require('express')
const router = express.Router()
const {verifyToken, verifyUser, verifyAdmin} = require('../../middlewares/auth')

router.get('/all', verifyToken, verifyAdmin, controller.getAll)
router.get('/:userId', verifyToken, verifyUser, controller.getOne)
router.get('/logout', controller.logout)

router.post('/login', controller.login)
router.post('/register', controller.register)

router.put('/update', verifyToken, verifyUser, controller.updateOne)

router.delete('/delete', verifyToken, verifyUser, controller.deleteOne)

module.exports = router