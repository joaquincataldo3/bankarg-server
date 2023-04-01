const {mongoose, Schema, Types} = require('mongoose');

const Us_Arg_Size = new Schema({
    us_size: {
        type: Number,        
        required: true
    },
    arg_size: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)

module.exports = mongoose.model('Us_Arg_Size', Us_Arg_Size);
