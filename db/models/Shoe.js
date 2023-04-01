const {mongoose, Schema, Types} = require('mongoose');

const Shoe = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: Types.ObjectId, ref: 'Brand'   
    },
    sizes: [{
        type: Types.ObjectId, ref: 'ArgUsSize'   
    }],
    inStock: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)

module.exports = mongoose.model('Shoe', Shoe);
