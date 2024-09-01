import axios from 'axios';
import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Transaction = require("../../../Models/Transaction")
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        var total_amount = 0
        const transactionID = []
        try {
            const { operator_code, member_account, transactions, request_time } = req.body;

            const user = User.findOne({ Username: member_account });
            if (!user) {
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member Not Exist",
                    }
                );
                return;
            }
            for (const i of transactions) {
                transactionID.push(i.id)
                total_amount += Number(i.amount);
            }

            //check duplicate
            const duplicate = await Transaction.find({ id: { $in: transactionID } })
            if (duplicate.length !== 0) {
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
            }
            Transaction.insertMany(transactions)
            const newBalance = await User.findOneAndUpdate(
                { _id: user._id },
                { $inc: { Amount: total_amount } },
                { new: true }
            );
            res.status(200).json(
                {
                    "code": 0,
                    "message": "",
                    "before_balance": user.Amount,
                    "balance": newBalance.Amount
                }
            );
        } catch (err) {
            console.log(err);
            res.status(200).json(
                {
                    "code": 999,
                    "message": "",
                }
            );
            return;
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