const mongoose = require('mongoose')
const condb = require('../config/condb')

let UserSchema = mongoose.Schema({
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true,
        default: 0,
    },
    MemberID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member'
    },
    Role: {
        type: String,
        required: true,
        default: "user"
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    ip: {
        type: String
    }
}, { timestamps: true });


let User = condb.model("user", UserSchema);
module.exports = User;