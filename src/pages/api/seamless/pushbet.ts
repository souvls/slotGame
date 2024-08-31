import type { NextApiRequest, NextApiResponse } from 'next'
const Transaction = require("../../../Models/Transaction");
const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {

        try {
            const { operator_code, transactions } = req.body;
            const member_account = transactions[0].member_account

            const user = await User.findOne({ Username: member_account })
            if (!user) {
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member Not Exist",
                    }
                );
                return;
            }

            Transaction({
                "amount": transactions[0].amount,
                "bet_amount": transactions[0]?.bet_amount,
                "valid_bet_amount": transactions[0].valid_bet_amount,
                "prize_amount": transactions[0].prize_amount,
                "tip_amount": transactions[0].tip_amount,
                "wager_code": transactions[0].wager_code,
                "wager_status": transactions[0].wager_status,
                "settled_at": transactions[0].settled_at,
            }).save();
            res.status(200).json(
                {
                    "code": 0,
                    "message": "",
                    "before_balance": user.Amount,
                    "balance": user.Amount
                }
            );
        } catch (err) {
            //console.log(err);
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