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
        var total_amount = 0;
        const transactionID = []
        try {
            const { member_account, currency, transactions, operator_code, request_time, sign } = req.body;
            console.log(req.body);

            if (!member_account) {
                console.log("Member not Exist");
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

            for (const i of transactions) {
                if (i.action !== 'SETTLED') {
                    console.log("Expected to Return Invalid Action");
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
                transactionID.push(i.id)
                total_amount += parseFloat(parseFloat(i.amount).toFixed(2));
            }
            //check transaction
            const duplicate = await Transaction.find({ id: { $in: transactionID } })
            if (duplicate.length !== 0 || hasDuplicates(transactionID)) {
                console.log("Duplicate Transaction")
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
            }

            if (currency !== "IDR" && currency !== "THB" && currency !== 'IDR2' && currency !== 'KRW2' && currency !== 'MMK2' && currency !== 'VND2' && currency !== 'LAK2' && currency !== 'KHR2') {
                console.log("Expected to Return Invalid Currency")
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

            //check sing
            const originalSign = md5(operator_code + request_time + "withdraw" + process.env.SECRET_KEY);
            if (sign !== originalSign) {
                console.log("Invalid Sign")
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Invalid Sign",
                    }
                );
                return
            }


            User.findOne({ Username: member_account })
                .then(async (result: any) => {
                    if (!result) {
                        console.log("Member not Exist");
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": "Member not Exist",
                            }
                        );
                        return;
                    }

                    User.findOneAndUpdate(
                        { _id: result._id },
                        { $inc: { Amount: total_amount } },
                        { new: true }
                    ).then((newBalance: any) => {
                        console.log({
                            "code": 0,
                            "message": "deposit",
                            "before_balance": result.Amount,
                            "balance": newBalance.Amount
                        })
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
                        console.log(err);
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
function hasDuplicates(array: any) {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
}