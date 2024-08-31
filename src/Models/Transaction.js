const mongoose = require('mongoose')
const condb = require('../config/condb')

let TransactionSchema = mongoose.Schema({
    "id": {
        type: String,
        required: true,
        unique: true,
    },
    "amount": {
        type: Number,
        required: true,
        default: 0
    },
    "bet_amount": {
        type: Number,
        required: true,
        default: 0
    },
    "valid_bet_amount": {
        type: Number,
        required: true,
        default: 0
    },
    "prize_amount": {
        type: Number,
        required: true,
        default: 0
    },
    "tip_amount": {
        type: Number,
        required: true,
        default: 0
    },
    "action": {
        type: String,
        required: true,
    },
    "wager_code": {
        type: String,
        required: true,
        unique: true,
    },
    "wager_status": {
        type: String,
        required: true,
        unique: true,
    },
    "payload": {
        type: Array,
        required: true
    },
    "settled_at": {
        type: Number,
        required: true,
        default: 0
    },
    "game_code": {
        type: String,
        required: true,
    }
}, { timestamps: true });

let Transaction = condb.model("transaction", TransactionSchema);
module.exports = Transaction;