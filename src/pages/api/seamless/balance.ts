import type { NextApiRequest, NextApiResponse } from 'next'
import md5 from 'md5';
const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        try {
            console.log(req.body);
            const { member_account, operator_code, request_time, currency, sign } = req.body
            //currency
            if (currency === "TRY" || currency === "THB") {
                //sign
                const originalSign = md5(operator_code + request_time + "getbalance" + process.env.SECRET_KEY);
                if (sign === originalSign) {
                    //user
                    const user = await User.findOne({ Username: member_account });
                    if (user) {
                        if (user.status) {
                            var amount = user.Amount;
                            if (currency === 'IDR2' || currency === 'KRW2' || currency === 'MMK2' || currency === 'VND2' || currency === 'LAK2' || currency === 'KHR2') {
                                amount = amount / 1000
                            }
                            console.log({
                                "code": 0,
                                "message": "",
                                "balance": parseFloat(parseFloat(amount).toFixed(2)),
                            })
                            res.status(200).json(
                                {
                                    "code": 0,
                                    "message": "",
                                    "balance": parseFloat(parseFloat(amount).toFixed(2)),
                                }
                            );
                        } else {
                            console.log(
                                {
                                    "code": 1000,
                                    "message": "Member Not Exists",
                                }
                            )
                            res.status(200).json(
                                {
                                    "code": 1000,
                                    "message": "Member Not Exists",
                                }
                            );
                        }
                    } else {
                        console.log({
                            "code": 1000,
                            "message": "Member Not Exists",
                        })
                        res.status(200).json(
                            {
                                "code": 1000,
                                "message": "Member Not Exists",
                            }
                        );
                    }
                } else {
                    console.log(
                        {
                            "code": 1004,
                            "message": "Incorrect Signature",
                        }
                    )
                    res.status(200).json(
                        {
                            "code": 1004,
                            "message": "Incorrect Signature",
                        }
                    );
                }
            } else {
                console.log(
                    {
                        "code": 1004,
                        "message": "Expected return Invalid Currency",
                    }
                )
                res.status(200).json(
                    {
                        "code": 1004,
                        "message": "Expected return Invalid Currency",
                    }
                );
            }
        } catch (err) {
            console.log({
                "code": 0,
                "message": err,
            });
            res.status(200).json(
                {
                    "code": 0,
                    "message": err,
                }
            );
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}