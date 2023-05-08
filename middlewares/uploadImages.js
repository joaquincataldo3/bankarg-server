const path = require("path");
const multer = require('multer');


const mainImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.join(__dirname, "../src/images/shoes/main")
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' ' + file.originalname)
    }
});

const sideImagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.join(__dirname, "../src/images/shoes/side")
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' ' + file.originalname)
    }
});

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === 'main_img') {
          mainImageStorage.getDestination(req, file, function (err, destination) {
            if (err) return cb(err);
            cb(null, destination);
          });
        } else if (file.fieldname === 'side_imgs') {
          sideImagesStorage.getDestination(req, file, function (err, destination) {
            if (err) return cb(err);
            cb(null, destination);
          });
        } else {
          cb(new Error('Unexpected fieldname'));
        }
      },
      filename: function (req, file, cb) {
        if (file.fieldname === 'main_img') {
          mainImageStorage.getFilename(req, file, function (err, filename) {
            if (err) return cb(err);
            cb(null, filename);
          });
        } else if (file.fieldname === 'side_imgs') {
          sideImagesStorage.getFilename(req, file, function (err, filename) {
            if (err) return cb(err);
            cb(null, filename);
          });
        } else {
          cb(new Error('Unexpected fieldname'));
        }
      }
    })
  });
  
  const uploadFields = upload.fields([
    { name: 'main_img', maxCount: 1 },
    { name: 'side_imgs', maxCount: 8 }
]);
  

module.exports = uploadFields;