import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Transaction = require("../../../Models/Transaction");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        var total_amount = 0;
        const transactionID = [];
        const wager_code = [];
        try {
            const { member_account, transactions } = req.body;


            for (const i of transactions) {
                transactionID.push(i.id);
                wager_code.push(i.wager_code);
                total_amount += Number(i.amount);
            }
            const duplicate = await Transaction.find({ id: { $in: transactionID } })
            if (duplicate.length !== 0 || hasDuplicates(transactionID)) {
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
            }
            const wager = await Transaction.find({ wager_code: { $in: wager_code } })
            if (wager.length === 0) {
                res.status(200).json(
                    {
                        "code": 1006,
                        "message": "Bet Not Exist",
                    }
                );
                return;
            }
            Transaction.insertMany(transactions);
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
function hasDuplicates(array: any) {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
}