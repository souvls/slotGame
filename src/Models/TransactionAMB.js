const mongoose = require('mongoose')
const condb = require('../config/condb');


let TxnsambeSchema = mongoose.Schema(
    {
        "id": {
            type: String,
        },
        "productId": {
            type: String,
        },
        "username": {
            type: String,
        },
        "currency": {
            type: String,
        },
        "timestampMillis": {
            type: Number,
        },
        "txns": [
            {
                "id": {
                    type: String,
                    
                },
                "status": {
                    type: String,
                },
                "roundId": {
                    type: String,
                },
                "betAmount": {
                    type: Number,
                },
                "payoutAmount": {
                    type: Number,
                },
                "gameCode": {
                    type: String,
                },
                "playInfo": {
                    type: String,
                },
                "txnId": {
                    type: String,
                },
                "isEndRound": {
                    type: Boolean,
                },
            }
        ]
    }
);

let Txnsambe = condb.model("txnsamb", TxnsambeSchema);
module.exports = Txnsambe;