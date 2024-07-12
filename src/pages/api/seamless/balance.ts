import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { member_account } = req.body
            const result = await User.findOne({ Username: member_account });
            if (result) {
                res.status(200).json(
                    {
                        "code": 0,
                        "message": "",
                        "balance": result.Amount
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "code": 1000,
                        "message": "",
                        "balance": 0
                    }
                );
            }
        } catch (err) {
            console.log(err);
            res.status(200).json(
                {
                    "code": 999,
                    "message": "",
                    "balance": 0
                }
            );
        }
    }
}