const path = require("path");
const multer = require('multer');


const mainImageStorage = multer.diskStorage({
    destination: (req, res, cb) => {
    
        const folder = path.join(__dirname, "../src/images/shoes/main")
        cb(null, folder)
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + ' ' + file.originalname)
    }
})

const uploadMainImage = multer( {mainImageStorage: mainImageStorage} ); 

module.exports = uploadMainImage;