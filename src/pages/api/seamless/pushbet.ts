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

            res.status(200).json(
                {
                    "code": 0,
                    "message": "",
                    "before_balance": user.Amount,
                    "balance": user.Amount
                }
            );
            Transaction(transactions[0]).save();

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