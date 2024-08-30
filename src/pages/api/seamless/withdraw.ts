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
            const { member_account, currency, transactions, operator_code, request_time, sign } = req.body;
            if (transactions[0].action !== 'BET') {
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Expected to Return Invalid Action",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
            }
            if (currency !== "IDR" && currency !== "THB" && currency !== 'IDR2' && currency !== 'KRW2' && currency !== 'MMK2' && currency !== 'VND2' && currency !== 'LAK2' && currency !== 'KHR2') {
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Expected to Return Invalid Currency",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
            }
            if (!member_account) {
                res.status(200).json(
                    {
                        "code": 1001,
                        "message": "Member not Exist",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
            }
            const originalSign = md5(operator_code + request_time + "withdraw" + process.env.SECRET_KEY);
            if (sign === originalSign) {
                var total_amount = 0
                for (const i of transactions) {
                    total_amount += Number(i.amount)
                }
                //console.log(total_amount)
                User.findOne({ Username: member_account })
                    .then((result: any) => {
                        //check amount
                        if (result.Amount + total_amount < 0) {
                            res.status(200).json(
                                {
                                    "code": 1001,
                                    "message": "Insufficient Balance",
                                    "before_balance": 0,
                                    "balance": 0
                                }
                            );
                            return;
                        } else {
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
                        }


                    }).catch((err: any) => {
                        res.status(200).json(
                            {
                                "code": 1001,
                                "message": "Member not Exist",
                                "before_balance": 0,
                                "balance": 0
                            }
                        );
                    })
            } else {
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Invalid Sign",
                    }
                );
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