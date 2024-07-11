import type { NextApiRequest, NextApiResponse } from 'next'





export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        console.log(req.body)
        res.status(200).json(
            {
                "code": 0,
                "message": "",
                "balance": 12345.0000
            }
        );
    }
    if (req.method === 'GET') {
        res.status(200).json(
            {
                "code": 0,
                "message": "",
                "balance": 12345.0000
            }
        );
    }



}