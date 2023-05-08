const {mongoose, Schema, Types} = require('mongoose');

const Side_Image = new Schema({
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

module.exports = mongoose.model('Side_Image', Side_Image);
