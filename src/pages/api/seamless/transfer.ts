import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Wager = require("../../../Models/Wagger");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    if (req.method === 'POST') {
        try {
            const {
                member_account,
                operator_code,
                product_code,
                game_type,
                request_time,
                sign,
                currency,
                transactions } = req.body;
            var total_amount = 0
            for (const i of transactions) {
                total_amount += Number(i.amount)
            }
            console.log(total_amount)
            User.findOne({ Username: member_account })
                .then((result: any) => {
                    //console.log(amount)
                    User.findOneAndUpdate(
                        { _id: result._id },
                        { $inc: { Amount: total_amount } },
                        { new: true }
                    ).then((newBalance: any) => {
                        const newWager = new Wager({
                            member_account:member_account,
                            operator_code:operator_code,
                            product_code:product_code,
                            game_type:game_type,
                            request_time:request_time,
                            sign:sign,
                            currency:currency,
                            transactions:transactions
                        })
                        newWager.save();
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