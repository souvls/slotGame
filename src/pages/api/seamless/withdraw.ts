import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { member_account, transactions } = req.body;
            for (const i of transactions) {
                User.findOne({ Username: member_account })
                    .then((result: any) => {
                        //console.log(amount)
                        User.findOneAndUpdate(
                            { _id: result._id },
                            { $inc: { Amount: Number(i.amount) } },
                            { new: true }
                        ).then((newBalance: any) => {
                            res.status(200).json(
                                {
                                    "code": 0,
                                    "message": "",
                                    "before_balance": result.Amount,
                                    "balance": newBalance.Amount
                                }
                            );
                        }).catch((err: any) => {
                            console.log(err);
                            res.status(200).json(
                                {
                                    "code": 1000,
                                    "message": err,
                                    "before_balance": 0,
                                    "balance": 0
                                }
                            );
                        });
                    }).catch((err: any) => {
                        console.log(err);
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": err,
                                "before_balance": 0,
                                "balance": 0
                            }
                        );
                    })
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
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}