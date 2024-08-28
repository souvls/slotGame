const mongoose = require('mongoose')
const condb = require('../config/condb');

let MemberSchema = mongoose.Schema({
    Name: {
        type: String,
        unique: true,
        required: true
    },
    Username: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Total_bet_amount: {
        type: Number,
        required: true,
        default: 0,
    },
    Total_prized_amount: {
        type: Number,
        required: true,
        default: 0,
    },
    Total_result: {
        type: Number,
        required: true,
        default: 0,
    },
    Total_free: {
        type: Number,
        required: true,
        default: 0,
    },
    Total_pay: {
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
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    temp: String
}, { timestamps: true });

let Member = condb.model("member", MemberSchema);
module.exports = Member;