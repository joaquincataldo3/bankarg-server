const path = require("path");
const multer = require('multer');

const sideImagesStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        console.log('entro side')
        const folder = path.join(__dirname, "../src/images/shoes/side")
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + ' ' + file.originalname)
    }
})

const uploadSideImage = multer( {sideImagesStorage: sideImagesStorage} ); 

module.exports = uploadSideImage;