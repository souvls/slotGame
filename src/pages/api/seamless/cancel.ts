import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    if (req.method === 'POST') {
        try {
            const { member_account, transactions } = req.body;
            var total_amount = 0
            for (const i of transactions) {
                total_amount += Number(i.amount)
            }
            User.findOne({ Username: member_account })
                .then((result: any) => {
                    if (!result) {
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": "Member Not Exists",
                            }
                        );
                        return;
                    }
                    //console.log(amount)
                    User.findOneAndUpdate(
                        { _id: result._id },
                        { $inc: { Amount: total_amount } },
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
                            }
                        );
                    });
                }).catch((err: any) => {
                    console.log(err);
                    res.status(200).json(
                        {
                            "code": 1000,
                            "message": err,
                        }
                    );
                })

        } catch (err) {
            console.log(err);
            res.status(200).json(
                {
                    "code": 999,
                    "message": "",
                }
            );
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}