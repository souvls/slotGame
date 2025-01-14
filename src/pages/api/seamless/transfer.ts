import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
// const Wager = require("../../../Models/Wagger");
const Transaction = require("../../../Models/Transaction");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        var total_amount = 0;
        const transactionID = []
        try {
            console.log(req.body);
            const { member_account, currency, transactions, product_code, operator_code, request_time, sign, game_type } = req.body;

            const originalSign = md5(operator_code + request_time + "transfer" + process.env.SECRET_KEY);
            if (sign !== originalSign) {
                console.log("Invalid Sign")
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Invalid Sign",
                    }
                );
                return
            }
            if (currency !== "IDR" && currency !== "THB" && currency !== 'IDR2' && currency !== 'KRW2' && currency !== 'MMK2' && currency !== 'VND2' && currency !== 'LAK2' && currency !== 'KHR2') {
                console.log("Expected to Return Invalid Currency")
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Expected to Return Invalid Currency",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
                return
            }
            for (const i of transactions) {
                transactionID.push(i.id)
                total_amount += parseFloat(parseFloat(i.amount).toFixed(2))
            }

            //check duplicate
            const duplicate = await Transaction.find({ 'transactions.id': { $in: transactionID } })
            if (duplicate.length !== 0 || hasDuplicates(transactionID)) {
                console.log("Duplicate Transaction")
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": "Duplicate Transaction",
                    }
                );
                return;
            }
            const user = await User.findOne({ Username: member_account });
            if (!user || !user.status) {
                console.log("Member Not Exists")
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member Not Exists",
                    }
                );
                return;
            } else {
                const update_balance_user = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $inc: { Amount: parseFloat(total_amount.toFixed(2)) } },
                    { new: true }
                );
                const TST = new Transaction({
                    agent_id: user.MemberID,
                    member_account: member_account,
                    member_id: user._id,
                    before_balance: parseFloat(parseFloat(user.Amount).toFixed(2)),
                    balance: parseFloat(parseFloat(update_balance_user.Amount).toFixed(2)),
                    operator_code: operator_code,
                    product_code: product_code,
                    game_type: game_type,
                    request_time: request_time,
                    sign: sign,
                    currency: currency,
                    transactions: transactions
                });
                TST.save();
                res.status(200).json(
                    {
                        "code": 0,
                        "message": "",
                        "before_balance": parseFloat(parseFloat(user.Amount).toFixed(2)),
                        "balance": parseFloat(parseFloat(update_balance_user.Amount).toFixed(2))
                    }
                );
            }

        } catch (err) {
            res.status(200).json(
                {
                    "code": 999,
                    "message": "",
                    "before_balance": 0,
                    "balance": 0
                }
            );
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
function hasDuplicates(array: any) {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
}