import type { NextApiRequest, NextApiResponse } from 'next'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import { Login } from '@/Service/user';

const User = require('../../../Models/User');
const Token = require('../../../Middleware/Token');

// type ResponseData = {
//     status: string,
//     message: string,
//     token: string
// }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        if (req.method === 'POST') {
            const { Username, Password, ip } = req.body;
            const isLogin = await Login(Username, Password, ip);
            res.status(200).json(isLogin);
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    })
}