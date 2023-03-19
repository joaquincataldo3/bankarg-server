const controller = require('../controllers/account')
const express = require('express')
const router = express.Router()

router.get('/all', controller.getAll)
router.get('/:accountId', controller.getOne)

router.post('/register', controller.createOne)

router.put('/update', controller.updateOne)

router.delete('/update', controller.deleteOne)

module.exports = router