const {mongoose, Schema, Types} = require('mongoose');


const Account = new Schema({
    number: {
        type: Number,
        required: true
    },
    balance: {
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


module.exports = mongoose.model('Account', Account);