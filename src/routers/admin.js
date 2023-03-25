const controller = require('../controllers/admin')
const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/auth')

router.get('/all', verifyToken, verifyAdmin, controller.getAll)
router.get('/:userId', verifyToken, verifyAdmin, controller.getOne)

router.post('/login', controller.login)
router.post('/register', verifyToken, verifyAdmin, controller.register)

router.put('/update', verifyToken, verifyAdmin, controller.updateOne)

router.delete('/delete', verifyToken, verifyAdmin, controller.deleteOne)

module.exports = router