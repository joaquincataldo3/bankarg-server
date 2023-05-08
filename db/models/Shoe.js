const { mongoose, Schema, Types } = require('mongoose');

const Shoe = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    brand: {
        type: Types.ObjectId, ref: 'Brand', required: true
    },
    byOrder: {
        type: Boolean,
        required: true
    },
    inStock: {
        required: true,
        type: Boolean,
    },
    sizes: [{
        type: Types.ObjectId, ref: 'Us_Arg_Size'
    }],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
}
)

module.exports = mongoose.model('Shoe', Shoe);
