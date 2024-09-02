import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Transaction = require("../../../Models/Transaction");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        try {
            const { member_account, transactions } = req.body;

            const duplicate = await Transaction.findOne({ id: transactions[0].id })
            if (duplicate) {
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
            }
            User.findOne({ Username: member_account })
                .then((result: any) => {
                    //console.log(amount)
                    if (!result) {
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": "Member Not Exists",
                            }
                        );
                        return;
                    }

                    User.findOneAndUpdate(
                        { _id: result._id },
                        { $inc: { Amount: parseInt(transactions[0].amount) } },
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
                        new Transaction(transactions[0]).save();
                    }).catch((err: any) => {
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