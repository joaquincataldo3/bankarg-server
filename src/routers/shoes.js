const controller = require('../controllers/shoes')
const express = require('express')
const router = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/auth')
const uploadImages = require('../../middlewares/uploadImages')

router.get('/all', controller.getAll)
router.get('/:shoeId', controller.getOne)

/* router.post('/smain-image', uploadMainImage.single('main_img'), contro) */
router.post('/', /* verifyToken, verifyAdmin, , */ uploadImages,  controller.createOne)

router.put('/', /* verifyToken, verifyAdmin, */ controller.updateOne)

router.delete('/', /* verifyToken, verifyAdmin, */ controller.deleteOne)

module.exports = router