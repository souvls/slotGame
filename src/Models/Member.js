const mongoose = require('mongoose')
const condb = require('../config/condb');

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
    Total_income: {
        type: Number,
        required: true,
        default: 0,
    },
    Amount: {
        type: Number,
        required: true,
        default: 0,
    },
    Role: {
        type: String,
        required: true,
        default: "member"
    },
    PartnersPercent: {
        type: Number,
        require: true
    },
    DateStart:{
        type: Date,
        default:0
    },
    DateEnd:{
        type:Date,
        default:0
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    temp: String
}, { timestamps: true });

let Member = condb.model("member", MemberSchema);
module.exports = Member;