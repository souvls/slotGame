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
                try {
                    const _user = await User.findById(user.id);
                    if (_user.ip === ip) {
                        res.status(200).json({
                            "code": 0,
                            "message": "",
                            "balance": parseFloat(parseFloat(_user.Amount).toFixed(2)),
                        });
                    } else {
                        res.status(200).json({
                            "code": 999,
                            "message": "logout",
                            "balance": 0,
                        });
                    }
                } catch (error) {
                    //res.status(405).end(`Not Allowed`);
                }

            }
        });
    })
}