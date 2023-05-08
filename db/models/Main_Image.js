const {mongoose, Schema, Types} = require('mongoose');

const MainImage = new Schema({
    image: {
        type: String,
        required: true
    },
    shoe_id: {
        type: Types.ObjectId,
        ref: 'Shoe', 
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)

module.exports = mongoose.model('Main_Image', MainImage);
