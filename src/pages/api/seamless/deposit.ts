import md5 from 'md5';
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
            const { member_account, currency, transactions, operator_code, request_time, sign } = req.body;
            const originalSign = md5(operator_code + request_time + "deposit" + process.env.SECRET_KEY);

            //check transaction
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
            if (transactions[0].action !== 'SETTLED') {
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Expected to Return Invalid Action",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
                return;
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
                return
            }
            if (!member_account) {
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member not Exist",
                        "before_balance": 0,
                        "balance": 0
                    }
                );
                return
            }
            if (sign !== originalSign) {
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Invalid Sign",
                    }
                );
                return
            }

            User.findOne({ Username: member_account })
                .then((result: any) => {
                    if (!result) {
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": "Member not Exist",
                            }
                        );
                        return;
                    }
                    new Transaction({
                        "id": transactions[0].id,
                        "amount": transactions[0].amount,
                        "bet_amount": transactions[0].bet_amount,
                        "valid_bet_amount": transactions[0].valid_bet_amount,
                        "prize_amount": transactions[0].prize_amount,
                        "tip_amount": transactions[0].tip_amount,
                        "action": transactions[0].action,
                        "wager_code": transactions[0].wager_code,
                        "wager_status": transactions[0].wager_status,
                        "payload": transactions[0].payload,
                        "settled_at": transactions[0].settled_at,
                        "game_code": transactions[0].game_code
                    }).save();
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
                    }).catch((err: any) => {
                        //console.log(err);
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": err,
                            }
                        );
                    });
                }).catch((err: any) => {
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