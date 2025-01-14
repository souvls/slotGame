const mongoose = require('mongoose')
const condb = require('../config/condb')

let TransactionSchema = mongoose.Schema({
    member_account: {
        type: String,
    },
    member_id: {
        type: String
    },
    agent_id: {
        type: String
    },
    before_balance: {
        type: Number,
    },
    balance: {
        type: Number,
    },
    operator_code: {
        type: String,
    },
    product_code: {
        type: Number,
    },
    game_type: {
        type: String,
    },
    request_time: {
        type: String,
    },
    sign: {
        type: String,
    },
    currency: {
        type: String,
    },
    transactions: [{
        "id": {
            type: String,
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
        },
        "wager_code": {
            type: String,
            required: true,
        },
        "wager_status": {
            type: String,
            required: true,
        },
        "payload": [],
        "settled_at": {
            type: Number,
            required: true,
            default: 0
        },
        "game_code": {
            type: String,
        }
    }]

}, { timestamps: true });

let Transaction = condb.model("transaction", TransactionSchema);
module.exports = Transaction;