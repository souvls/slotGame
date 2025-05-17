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
            const { member_account, currency, transactions, product_code, operator_code, request_time, sign, game_type } = req.body;
            // console.log(req.body);

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
            const duplicate = await Transaction.find({ 'transactions.id': transactions[0].id })
            if (duplicate.length > 0) {
                console.log("Duplicate Transaction")
                res.status(200).json(
                    {
                        "code": 1003,
                        "message": " Duplicate Transaction",
                    }
                );
                return;
            }
            if (transactions[0].action !== 'SETTLED') {
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

            if (currency !== "TRY" && currency !== "THB") {
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
            const originalSign = md5(operator_code + request_time + "deposit" + process.env.SECRET_KEY);
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
                    if (result.status === false) {
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
                        { $inc: { Amount: parseFloat(parseFloat(transactions[0].amount).toFixed(2)) } },
                        { new: true }
                    ).then((newBalance: any) => {
                        // console.log({
                        //     "code": 0,
                        //     "message": "pushbet",
                        //     "before_balance": parseFloat(parseFloat(result.Amount).toFixed(2)),
                        //     "balance": parseFloat(parseFloat(newBalance.Amount).toFixed(2))
                        // });
                        const TST = new Transaction({
                            agent_id: result.MemberID,
                            member_account: member_account,
                            member_id: result._id,
                            before_balance: parseFloat(parseFloat(result.Amount).toFixed(2)),
                            balance: parseFloat(parseFloat(newBalance.Amount).toFixed(2)),
                            operator_code: operator_code,
                            product_code: product_code,
                            game_type: game_type,
                            request_time: request_time,
                            sign: sign,
                            currency: currency,
                            transactions: transactions
                        });
                        TST.save();
                        res.status(200).json(
                            {
                                "code": 0,
                                "message": "",
                                "before_balance": parseFloat(parseFloat(result.Amount).toFixed(2)),
                                "balance": parseFloat(parseFloat(newBalance.Amount).toFixed(2))
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
        console.log("Not allow " + req.method);
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
function hasDuplicates(array: any) {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
}