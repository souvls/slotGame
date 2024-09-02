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

            //check user
            const user = await User.findOne({ Username: member_account });
            if (user) {
                const transaction = await Transaction.find();
                //check duplicate
                const duplicate = transaction.find((item: any) => item.id === transactions[0].id);
                if (!duplicate) {
                    const wager = transaction.find((item: any) => item.wager_code === transactions[0].wager_code);
                    if (wager) {
                        const updateuser = await User.findOneAndUpdate(
                            { _id: user._id },
                            { $inc: { Amount: transactions[0].amount } },
                            { new: true }
                        );
                        res.status(200).json(
                            {
                                "code": 0,
                                "message": "",
                                "before_balance": user.Amount,
                                "balance": updateuser.Amount
                            }
                        );
                        new Transaction(transactions[0]).save();
                    } else {
                        res.status(200).json(
                            {
                                "code": 1006,
                                "message": " Bet Not Exist",
                            }
                        );
                        return;
                    }
                } else {
                    res.status(200).json(
                        {
                            "code": 1003,
                            "message": " Duplicate Transaction",
                        }
                    );
                }

                // const duplicate = await Transaction.findOne({ id: transactions[0].id })
                // if (!duplicate) {
                //     //check wagger
                //     const wager = await Transaction.findOne({ wager_code: transactions[0].wager_code })
                //     if (wager) {
                //         const updateuser = await User.findOneAndUpdate(
                //             { _id: user._id },
                //             { $inc: { Amount: transactions[0].amount } },
                //             { new: true }
                //         );
                //         if (updateuser) {
                //             res.status(200).json(
                //                 {
                //                     "code": 0,
                //                     "message": "",
                //                     "before_balance": user.Amount,
                //                     "balance": updateuser.Amount
                //                 }
                //             );
                //         }
                //     } else {
                //         res.status(200).json(
                //             {
                //                 "code": 1006,
                //                 "message": " Bet Not Exist",
                //             }
                //         );
                //         return;
                //     }
                // } else {
                //     res.status(200).json(
                //         {
                //             "code": 1003,
                //             "message": " Duplicate Transaction",
                //         }
                //     );
                // }
            } else {
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "Member Not Exists",
                    }
                );
            }
        } catch (err) {

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