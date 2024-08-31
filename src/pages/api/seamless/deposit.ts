import axios from 'axios';
import md5 from 'md5';
import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Transaction = require("../../../Models/Transaction")
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        try {
            const { operator_code, member_account, transactions, request_time } = req.body;

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
                    const newTransaction = new Transaction({
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
                    })
                    User.findOneAndUpdate(
                        { _id: result._id },
                        { $inc: { Amount: transactions[0].amount } },
                        { new: true }
                    ).then((newBalance: any) => {
                        newTransaction.save();
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