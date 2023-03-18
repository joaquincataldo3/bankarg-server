const {mongoose, Schema, Types} = require('mongoose');


const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    account_numbers:[{
        type: Types.ObjectId, ref: 'Account'   
    }],
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)


module.exports = mongoose.model('User', User);
