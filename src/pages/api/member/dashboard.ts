import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

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
        const member: any = req.headers.data
        if (req.method === 'GET') {
            try {
                const myInfo = await Member.findById(member.id);
                const myUsers = await User.find();
                const myHistoryCredit = await User_history_credit.find().sort({ createdAt: -1 });
                const myHistoryPlayed = await User_history_played.find().sort({ createdAt: -1 });
                res.status(400).json({ status: 'ok', message: 'dashboard', myInfo: myInfo, myUsers: myUsers, myHistoryCredit: myHistoryCredit, myHistoryPlayed: myHistoryPlayed });
            } catch (err) {
                console.log(err)
                res.status(400).json({ status: 'no', message: err });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });


}