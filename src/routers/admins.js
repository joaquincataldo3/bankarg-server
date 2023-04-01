const controller = require('../controllers/admins')
const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/auth')

router.get('/all',  controller.getAll)
router.get('/:adminId',  controller.getOne)

router.post('/login', verifyToken, verifyAdmin, controller.login)
router.post('/register',verifyToken, verifyAdmin,  controller.register)
router.get('/logout', verifyToken, verifyAdmin, controller.logout)

router.put('/update', verifyToken, verifyAdmin, controller.updateOne)

router.delete('/delete', verifyToken, verifyAdmin, controller.deleteOne)

module.exports = router