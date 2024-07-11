const mongoose = require('mongoose')
const condb = require('../config/condb');

let MemberHistoryCreditSchema = mongoose.Schema({
    MemberID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'member',
        require: true
    },
    Amount: {
        type: Number,
        required: true,
        default: 0,
    },
    Transaction: {
        type:String,
        require:true
    },
    Date:{
        type:String,
        require:true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

let MemberHistoryCredit = condb.model("member_history_credit", MemberHistoryCreditSchema);
module.exports = MemberHistoryCredit;