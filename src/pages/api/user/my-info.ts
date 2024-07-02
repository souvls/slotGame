import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

const User = require('../../../Models/User');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        const user: any = req.headers.data
        //console.log(user)
        if (req.method === 'GET') {
            await User.findById(user.id)
                .then((result: any) => {
                    res.status(200).json({ status: 'ok', message: 'success', result: result });
                })
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });


}