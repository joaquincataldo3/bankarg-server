const Main_Image = require('../../db/models/Main_Image')
const Shoe = require('../../db/models/Shoe')
const Side_Images = require('../../db/models/Side_Image')
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')

const controller = {
    getAll: asyncHandler(async (req, res) => {
        const shoes = await Brand.find()
        res.status(200).json(shoes)
    }),
    getOne: asyncHandler(async (req, res) => {
        const id = req.params.shoeId
        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                msg: 'Shoe id invalid'
            });
        }
        const shoeToFind = await Brand.findById(id)
        if (!shoeToFind) {
            res.status(404).json({ msg: 'Shoe not found' })
        }
        const shoe = shoeToFind
        res.status(200).json(shoe)
    }),
    /*  createMainImage: asyncHandler(async (req, res) => {
 
         const shoeId = req.params.id
 
     }), */
    createOne: asyncHandler(async (req, res) => {
        const shoeInBody = {
            name: req.body.name,
            color: req.body.color,
            brand: req.body.brand,
            sizes: req.body.sizes,
            inStock: req.body.inStock,
            byOrder: req.body.byOrder
        }
        const newShoe = await Shoe.create(shoeInBody)
        const mainImgToPush = {
            image: req.files.main_img[0].filename,
            shoe_id: newShoe._id
        }
        const mainImg = await Main_Image.create(mainImgToPush)
        const shoeImages = req.files.side_imgs
        const shoeArrayImagesToPush = []
        for (let i = 0; i < shoeImages.length; i++) {
            const id = newShoe._id
            const image = shoeImages[i].filename;
            shoeArrayImagesToPush.push({ image, shoe_id: id });
        }

        const sideImgs = await Side_Images.insertMany(shoeArrayImagesToPush)
        return res.status(201).json(newShoe, mainImg, sideImgs)
    }),
    updateOne: asyncHandler(async (req, res) => {
        const shoeId = req.params.id;

        if (!ObjectId.isValid(shoeId)) {
            return res.status(400).json({ msg: 'Movie ID invalid' })
        }

        const findShoe = await Movie.findById(shoeId)

        if (!findShoe) {
            return res.status(404).json({ msg: 'Movie not found' })
        }

        const shoe = findShoe;

        const data = {
            name: req.body.name ? req.body.name : shoe.name,
            color: req.body.color ? req.body.color : shoe.color,
            brand: req.body.brand ? req.body.brand : shoe.brand,
            byOrder: req.body.byOrder ? req.body.byOrder : shoe.byOrder,
            inStock: req.body.inStock ? req.body.inStock : shoe.inStock,
            sizes: req.body.inStock ? req.body.sizes : null,
        }

        const sideImgsToDelete = []

        const imgsToDeleteFilter = shoe.images.filter(image => { //FILTER TO DELETE IMAGES 
            if (!req.body.current_side_imgs.includes(image.image)) {
                return sideImgsToDelete.push(image.image)
            }
        })

        if (sideImgsToDelete.length > 0) {

            sideImgsToDelete.forEach(image =>
                fs.unlinkSync(path.join(__dirname, '../../public/images/devices/' + image)) // DELETE IMGS IN LOCAL FOLDER    
            );

            async function deleteImgsInDB(i) {
                if (i < sideImgsToDelete.length) {
                    const image = sideImgsToDelete[i];

                    // Find image in DB
                    const imagenEncontrada = await Side_Images.findOne({image});

                    if (imagenEncontrada) {
                        // Delete img if exists
                        try {
                            await imagenEncontrada.remove();
                            console.log(`La imagen ${image} ha sido eliminada`);
                        } catch (err) {
                            console.error(`Error al eliminar la imagen ${image}: ${err}`);
                        }
                    } else {
                        console.log(`La imagen ${unage} no existe en la base de datos`);
                    }

                    // Recursively call fn
                    await deleteImgsInDB(i + 1);
                }
            }

            deleteImgsInDB(0);
        }

        if(req.body.current_main_image.length === 1){
            const imageAlreadyExists = Main_Image.findOne({image: req.body.current_main_image})
            if(!imageAlreadyExists){
               await Main_Image.create({image: req.body.current_main_image, shoe_id: shoe._id})
            }
        }

        const shoeUpdated = await Movie.findByIdAndUpdate(shoeId, data, { new: true })

        return res.status(200).json(shoeUpdated)
    }),
    deleteOne: asyncHandler(async (req, res) => {
        const shoeId = req.params.id

        if (!ObjectId.isValid(shoeId)) {
            return res.status(400).json({ msg: 'Shoe ID invalid' })
        }

        await Shoe.findByIdAndRemove(shoeId)

        return res.status(200).json({ msg: 'Shoe successfully deleted', id: shoeId })
    })
}

module.exports = controller