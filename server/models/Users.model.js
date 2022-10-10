const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "reader", "writer"],
        default: "reader"
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacation',
    }]
}, { timestamps: true });

module.exports = mongoose.model('Users', UserSchema);