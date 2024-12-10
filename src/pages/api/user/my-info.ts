import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
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
                const _user = await User.findById(user.id)
                if (_user.ip === ip) {
                    res.status(200).json({ status: 'ok', message: 'success', result: _user });
                } else {
                    res.status(200).json({ status: 'no', message: "logout" });
                }
            }
            if (req.method === 'POST') {
                const { ip } = req.body;
                const _user = await User.findById(user.id)
                if (_user.ip === ip) {
                    res.status(200).json({ status: 'ok', message: 'success', result: _user });
                } else {
                    res.status(200).json({ status: 'no', message: "logout" });
                }
            }
            else {
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    })
}