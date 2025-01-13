import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Transaction = require("../../../Models/Transaction");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { member_account, currency, transactions, product_code, operator_code, request_time, sign, game_type } = req.body;
            console.log(req.body);

            if (transactions[0].action !== 'BET') {
                console.log("Expected to Return Invalid Action");
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Expected to Return Invalid Action",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
            }
            const duplicate = await Transaction.find({ 'transactions.id': transactions[0].id })
            if (duplicate.length > 0) {
                console.log("Duplicate Transaction")
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
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
            }

            //check sing
            const originalSign = md5(operator_code + request_time + "withdraw" + process.env.SECRET_KEY);
            if (sign !== originalSign) {
                console.log("Invalid Sign")
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Invalid Sign",
                    }
                );
            }
            const user = await User.findOne({ Username: member_account });
            if (!user || !user.status) {
                console.log("Member not Exist");
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member not Exist",
                    }
                );
            }
            if (user.Amount - parseFloat(transactions[0].amount) < 0) {
                console.log("Insufficient Balance");
                res.status(200).json(
                    {
                        "code": 1001,
                        "message": "Insufficient Balance",
                    }
                );
            }
            //update user amount
            const withdraw = await User.findOneAndUpdate(
                { _id: user._id },
                { $inc: { Amount: parseFloat(parseFloat(transactions[0].amount).toFixed(2)) } },
                { new: true }
            )
            if (withdraw) {
                console.log({
                    "code": 0,
                    "message": "withdraw",
                    "before_balance": parseFloat(parseFloat(user.Amount).toFixed(2)),
                    "balance": parseFloat(parseFloat(withdraw.Amount).toFixed(2))
                });
                const TST = new Transaction({
                    member_account: member_account,
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
                        "balance": parseFloat(parseFloat(withdraw.Amount).toFixed(2))
                    }
                );
            }
        } catch (err) {
            console.log(err);
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
        console.log("Not allow " + req.method);
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
// function hasDuplicates(array: any) {
//     const uniqueElements = new Set(array);
//     return uniqueElements.size !== array.length;
// }