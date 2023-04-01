const controller = require('../controllers/brands')
const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/auth')

router.get('/all',  controller.getAll)
router.get('/:brandId',  controller.getOne)

router.post('/', verifyToken, verifyAdmin, controller.createOne)

router.put('/update', verifyToken, verifyAdmin, controller.updateOne)

router.delete('/delete/:brandId', verifyToken, verifyAdmin, controller.deleteOne)

module.exports = router