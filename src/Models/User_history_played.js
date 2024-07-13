const mongoose = require('mongoose')
const condb = require('../config/condb');
const { type } = require('os');

let UserHistoryPlayedSchema = mongoose.Schema({
    Username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    GameName: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    action:{
        type: String,
        require: true
    },
    bet_amount: {
        type: Number,
        require: true,
        default:0
    },
    prized_amount: {
        type: Number,
        require: true,
        default:0
    },
    tip_amount: {
        type: Number,
        require: true,
        default:0
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true });

let UserHistoryPlayed = condb.model("user_history_played", UserHistoryPlayedSchema);
module.exports = UserHistoryPlayed;