const controller = require('../controllers/users')
const express = require('express')
const router = express.Router()

router.get('/all', controller.getAll)
router.get('/:userId', controller.getOne)

router.post('/login', controller.processLogin)
router.post('/register', controller.processRegister)

router.put('/update', controller.updateOne)

router.delete('/update', controller.deleteOne)

module.exports = router