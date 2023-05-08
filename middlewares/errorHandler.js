const fs = require('fs')

const errorHandler = (err, req, res, next) => {
    const errorStatus = res.statusCode || 500

    res.status(errorStatus)

    res.json({
        msg: err.message
    })

    const sideImages = req.files.side_imgs;
    if (sideImages) {
        sideImages.forEach(image =>
            fs.unlinkSync(path.join(__dirname, '../src/images/shoes/main' + image.filename)) // borrar imagen en caso de que haya errors
        );
    }

    const mainImage = req.file.main_img[0];
    if (mainImage) {
        fs.unlinkSync(path.join(__dirname, '../src/images/shoes/side' + mainImage.filename)) // borrar imagen en caso de que haya errors
    }

}

module.exports = errorHandler