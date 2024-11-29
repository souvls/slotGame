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
        var total_amount =0;
        const transactionID = []
        try {
            const { member_account, operator_code, product_code, game_type, request_time, sign, currency, transactions } = req.body;
            console.log(req.body);

            const user = await User.findOne({ Username: member_account });
            if (!user) {
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member Not Exists",
                    }
                );
                return;
            }

            for (const i of transactions) {
                transactionID.push(i.id)
                total_amount += parseFloat(parseFloat(i.amount).toFixed(2))
            }

            //check duplicate
            const duplicate = await Transaction.find({ id: { $in: transactionID } })
            if (duplicate.length !== 0 || hasDuplicates(transactionID)) {
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
            }

            Transaction.insertMany(transactions);
            const update_balance_user = await User.findOneAndUpdate(
                { _id: user._id },
                { $inc: { Amount: total_amount } },
                { new: true })
            res.status(200).json(
                {
                    "code": 0,
                    "message": "",
                    "before_balance": user.Amount,
                    "balance": update_balance_user.Amount
                }
            );
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