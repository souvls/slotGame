import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';

const Member = require('../../../Models/Member');
const User = require('../../../Models/User');
const User_history_credit = require('../../../Models/User_history_credit');

import { format } from 'date-fns'
const getDate = () => {
    const now = new Date();
    const data = format(now, 'dd/MM/yy HH:mm:ss');
    return data;
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isAdmin(req, res, async () => {
            const admin: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    await User_history_credit.find().populate({
                        path: 'UserID',
                        populate: {
                            path: 'MemberID',
                            model: 'member'
                        }
                    }).exec()
                        .then((result: any) => {
                            //console.log(result);
                            res.status(200).json({ status: 'ok', message: 'success', result: result });
                        })
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}