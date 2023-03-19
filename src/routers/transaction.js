const controller = require('../controllers/transaction')
const express = require('express')
const router = express.Router()

router.get('/all', controller.getAll)
router.get('/:accountId', controller.getOne)

router.post('/create', controller.createOne)

router.delete('/update', controller.deleteOne)

module.exports = router