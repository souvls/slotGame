const mongoose = require('mongoose')
const condb = require('../config/condb');
const { type } = require('os');

let UserHistoryPlayedSchema = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    Result: {
        type: String,
        require: true
    },
    Amount: {
        type: Number,
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

let UserHistoryPlayed = condb.model("user_history_played", UserHistoryPlayedSchema);
module.exports = UserHistoryPlayed;