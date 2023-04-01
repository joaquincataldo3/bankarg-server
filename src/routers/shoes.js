const controller = require('../controllers/shoes')
const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/auth')

router.get('/all', controller.getAll)
router.get('/:shoeId', controller.getOne)

router.post('/', verifyToken, verifyAdmin, controller.createOne)

router.put('/', verifyToken, verifyAdmin, controller.updateOne)

router.delete('/', verifyToken, verifyAdmin, controller.deleteOne)

module.exports = router