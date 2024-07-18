import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Wager = require("../../../Models/Wagger");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    if (req.method === 'POST') {
        var total_amount = 0
        try {
            const { member_account, operator_code, product_code, game_type, request_time, sign, currency, transactions } = req.body;
            // const newWager = new Wager({
            //     member_account: member_account,
            //     operator_code: operator_code,
            //     product_code: product_code,
            //     game_type: game_type,
            //     request_time: request_time,
            //     sign: sign,
            //     currency: currency,
            //     transactions: transactions
            // });
            for (const i of transactions) {
                total_amount += Number(i.amount)
            }
            const user = await User.findOne({ Username: member_account });
            console.log(user)
            const update_balance_user = await User.findOneAndUpdate(
                { _id: member_account },
                { $inc: { Amount: total_amount } },
                { new: true })
            // await newWager.save();
            console.log(update_balance_user)
            res.status(200).json(
                {
                    "code": 0,
                    "message": "",
                    "before_balance": user.Amount,
                    "balance": update_balance_user.Amount
                }
            );
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