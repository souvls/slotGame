import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import { Balance } from '@/Service/user';
const User = require('../../../Models/User');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === 'GET') {
                const { ip } = req.query;
                if (ip) {
                    const balance = await Balance(user.id, ip.toString());
                    res.status(200).json(balance);
                }
            }
        });
    })
}