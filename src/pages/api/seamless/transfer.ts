import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Wager = require("../../../Models/Wagger");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        var total_amount = 0
        try {
            const { member_account, operator_code, product_code, game_type, request_time, sign, currency, transactions } = req.body;
            for (const i of transactions) {
                total_amount += Number(i.amount)
            }
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
            console.log(member_account + "/" + " playing:" + game_type)
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
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}