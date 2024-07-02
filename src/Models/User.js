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
        ref: 'members'
    },
    Role: {
        type: String,
        required: true,
        default: "user"
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true });

let users = condb.model("users", UserSchema);
module.exports = users;