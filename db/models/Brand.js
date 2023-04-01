const {mongoose, Schema, Types} = require('mongoose');

const Brand = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)

module.exports = mongoose.model('Brand', Brand);