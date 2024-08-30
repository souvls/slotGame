import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        try {
            const { member_account, transactions, request_time, sign } = req.body;
            const hash = md5(request_time + '' + process.env.SECRET_KEY + "getwager" + process.env.OP_CODE);
            const wager = await fetch(process.env.API_NAME + "/api/operators/wagers/" + transactions[0].id + "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE + "&sign=" + hash + "&request_time=" + request_time).then((response) => response.json());
            if (!wager.wager) {
                res.status(200).json(
                    {
                        "code": 1006,
                        "message": "Bet Not Exist",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
            }

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
                                "message": "Member Not Exist",
                                "before_balance": 0,
                                "balance": 0
                            }
                        );
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
                            "message": "Member Not Exist",
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