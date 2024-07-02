const mongoose = require('mongoose')
const condb = require('../config/condb');

let UserHistoryCreditSchema = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
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
    },
}, { timestamps: true });

let UserHistoryCredit = condb.model("user_history_credit", UserHistoryCreditSchema);
module.exports = UserHistoryCredit;