import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isMember from '@/Middleware/isMember';
import { update_money } from '@/Middleware/my-money';

const User = require('../../../Models/User');
const Member = require('../../../Models/Member');
const User_history_credit = require("../../../Models/User_history_credit")
const User_history_played = require("../../../Models/User_history_played")

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
        isMember(req, res, async () => {
            const member: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    //await update_money();
                    const myInfo = await Member.findById(member.id);
                    const myUsers = await User.find({MemberID:member.id});
                    res.status(400).json({ status: 'ok', message: 'dashboard', myInfo: myInfo, myUsers: myUsers});
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ status: 'no', message: err });
                }
            } else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });


}