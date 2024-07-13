import type { NextApiRequest, NextApiResponse } from 'next'

const SuperAdmin = require('../../../Models/SuperAdmin');
const Token = require('../../../Middleware/Token');
const x = require('../../../Models/Maintenance');
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
            //console.log(x)
            // Handle POST request
            const { Username, Password } = req.body;
            const result = await SuperAdmin.findOne({Username: Username,Password: Password})
            //console.log(req.body)
            //console.log(result)
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
        res.setHeader('Allow', ['POST','GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}