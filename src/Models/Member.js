const mongoose = require('mongoose')
const condb = require('../config/condb');
const { type } = require('os');

let MemberSchema = mongoose.Schema({
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
    Role: {
        type: String,
        required: "member"
    },
    PartnersPercent:{
        type:Number,
        require:true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    temp:String
},{ timestamps: true });

let Member = condb.model("member", MemberSchema);
module.exports = Member;