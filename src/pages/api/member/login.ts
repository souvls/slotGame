import type { NextApiRequest, NextApiResponse } from 'next'


const Member = require('../../../Models/Member');
const Token = require('../../../Middleware/Token');
type ResponseData = {
    status: string,
    message: string,
    token: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        try {
            // Handle POST request
            const { Username, Password } = req.body;
            const result = await Member.findOne({ Username: Username, Password: Password })
            if (result) {
                const token = await Token.genToken1(result._id, result.Username, result.Role)
                res.status(200).json({ status: 'ok', message: 'login succes', token: token });
            } else {
                res.status(200).json({ status: 'no', message: 'login false', token: '' });
            }
        } catch (err) {
            throw err
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}