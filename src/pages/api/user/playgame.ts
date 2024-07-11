import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';


import { format } from 'date-fns'
const getDate = () => {
    const now = new Date();
    const data = format(now, 'dd/MM/yy HH:mm:ss');
    return data;
}
const User = require('../../../Models/User');
const User_history_played = require('../../../Models/User_history_played')
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            //console.log(user)
            if (req.method === 'GET') {
                await User_history_played.find({ UserID: user.id }).sort({ createdAt: -1 })
                    .then((result: any) => {
                        res.status(200).json({ status: 'ok', message: 'my_history', result: result });
                    })
            } else if (req.method === "POST") {
                try {
                    const { Amount, Result } = req.body;
                    const new_history_play = new User_history_played({
                        UserID: user.id,
                        GameName: "xBetRanDom",
                        Result: Result,
                        Amount: Amount,
                        Date: getDate(),
                        status: true
                    });
                    new_history_play.save();
                    if (Result === 'WIN') {
                        const x = Amount - (Amount * 0.02);
                        await User.findOneAndUpdate(
                            { _id: user.id },
                            { $inc: { Amount: x } },
                            { new: true }
                        ).then((result: any) => {
                            res.status(200).json({ status: 'ok', message: 'WIN', result: result });
                        });
                    } else {
                        await User.findOneAndUpdate(
                            { _id: user.id },
                            { $inc: { Amount: -Amount } },
                            { new: true }
                        ).then((result: any) => {
                            res.status(200).json({ status: 'ok', message: 'LOSS', result: result });
                        });
                    }
                } catch (err) {
                    res.status(200).json({ status: 'no', message: 'err' });
                }
            }
            else {
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    })
}