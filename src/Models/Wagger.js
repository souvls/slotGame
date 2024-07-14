const mongoose = require('mongoose')
const condb = require('../config/condb');
const { type } = require('os');

let WagerSchema = mongoose.Schema({
    member_account: {
        type: String,
        required: true
    },
    operator_code: {
        type: String,
        required: true
    },
    product_code: {
        type: Number,
        required: true
    },
    game_type: {
        type: String,
        required: true
    }, 
    request_time: {
        type: String,
        required: true
    }, 
    sign: {
        type: String,
        required: true
    }, 
    transactions: {
        type: Array,
        required: true
    },
    currency:{
        type:String,
        currency: 'IDR'
    }
}, { timestamps: true });

let Wager = condb.model("wager", WagerSchema);
module.exports = Wager;