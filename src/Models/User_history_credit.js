const mongoose = require('mongoose')
const condb = require('../config/condb');

let UserHistoryCreditSchema = mongoose.Schema({
    User: {
        id: {
            type: String,
            required: true,
        },
        Username: {
            type: String,
            required: true,
        },
        MemberID: {
            type: String,
            required: true,
        }
    },
    Amount: {
        type: Number,
        required: true,
        default: 0,
    },
    BeforeAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    AfterAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    Transaction: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true });

let UserHistoryCredit = condb.model("user_history_credit", UserHistoryCreditSchema);
module.exports = UserHistoryCredit;