const controller = require('../controllers/us_arg_sizes')
const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/auth')

router.get('/all',  controller.getAll)
router.get('/:sizeId',  controller.getOne)

router.post('/', verifyToken, verifyAdmin, controller.createOne)

router.put('/update', verifyToken, verifyAdmin, controller.updateOne)

router.delete('/delete', verifyToken, verifyAdmin, controller.deleteOne)

module.exports = router