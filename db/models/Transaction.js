const {mongoose, Schema, Types} = require('mongoose');


const Transaction = new Schema({
    number: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    user_id: {
        type: Types.ObjectId, ref: 'User'
    },
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)


module.exports = mongoose.model('Transaction', Transaction);
