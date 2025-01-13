const mongoose = require('mongoose')
const condb = require('../config/condb');

let MemberHistoryCreditSchema = mongoose.Schema({
    Member: {
        id: {
            type: String,
            required: true,
        },
        Username: {
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
    }
}, { timestamps: true });

let MemberHistoryCredit = condb.model("member_history_credit", MemberHistoryCreditSchema);
module.exports = MemberHistoryCredit;