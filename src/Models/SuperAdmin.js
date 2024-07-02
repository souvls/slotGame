const mongoose = require('mongoose')
const condb = require('../config/condb')

let SuperadminSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: "super"
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
},{ timestamps: true });

let Superadmin = condb.model("superadmin", SuperadminSchema);
module.exports = Superadmin;