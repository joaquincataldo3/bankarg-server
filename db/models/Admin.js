const {mongoose, Schema} = require('mongoose');

const Admin = new Schema({
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
    createdAt: {
        type: Date,
        default: () => Date.now(), 
        immutable: true 
    }
} 
)

module.exports = mongoose.model('Admin', Admin);
