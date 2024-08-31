import axios from 'axios';
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
            const { operator_code, member_account, transactions, request_time } = req.body;
            // const hash = md5(`${request_time}${process.env.SECRET_KEY}getwager${operator_code}`)
            // const wager = await axios(`${process.env.API_NAME}/api/operators/wagers/${transactions[0].id}?operator_code=${operator_code}&sign=${hash}&request_time=${request_time}`);

            // if (wager.data) {
            //     res.status(200).json(
            //         {
            //             "code": 1006,
            //             "message": "Wager Code Not Exists",
            //         }
            //     );
            //     return;
            // }

            // var total_amount = 0
            // for (const i of transactions) {
            //     total_amount += Number(i.amount)
            // }
            User.findOne({ Username: member_account })
                .then((result: any) => {
                    if (!result) {
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": "Member Not Exist",
                            }
                        );
                        return;
                    }
                    //console.log(amount)
                    User.findOneAndUpdate(
                        { _id: result._id },
                        { $inc: { Amount: transactions[0].amount } },
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
                        return;
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
                        return;

                    });
                }).catch((err: any) => {
                    console.log(err);
                    res.status(200).json(
                        {
                            "code": 1000,
                            "message": "Member Not Exist",
                        }
                    );
                    return;
                })
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