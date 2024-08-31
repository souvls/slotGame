import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        //console.log(req.body)
        try {
            res.status(200).json(
                {
                    "code": 0,
                    "message": "",
                }
            );

        } catch (err) {
            //console.log(err);
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