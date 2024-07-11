import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
const User = require('../../../Models/User');
const Member = require('../../../Models/Member');
const User_history_credit = require('../../../Models/User_history_credit');
const User_history_played = require('../../../Models/User_history_played');

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
            await User.find({ MemberID: member.id }).sort({ createdAt: -1 })
                .then((result: any) => {
                    res.status(200).json({ status: 'ok', message: 'success', result: result });
                })
        } else if (req.method === 'PATCH') {
            try {
                const { UserID, Username, Password } = req.body;
                await User.findByIdAndUpdate(UserID, { Username: Username, Password: Password })
                res.status(200).json({ status: 'ok', message: 'success', });
            } catch (err) {
                res.status(400).json({ status: 'no', message: 'error' });
            }
        } else if (req.method === 'POST') {
            try {
                const { Username, Password } = req.body;
                const NewUser = new User({
                    Username: Username,
                    Password: Password,
                    Amount: 0,
                    MemberID: member.id
                })
                await NewUser.save().then((result: any) => {
                    res.status(201).json({ status: 'ok', message: 'success', result: result });
                })
            } catch (err) {
                //console.log(err);
                res.status(400).json({ status: 'no', message: 'ຊື່ຊ້ຳກັນ' });
            }
        } else if (req.method === 'DELETE') {
            try {
                const { UserID } = req.body;
                // check user history
                await User_history_played.find({ UserID: UserID })
                    .then(async (result: any) => {
                        if (result.length > 0) {
                            res.status(200).json({ status: 'no', message: 'ລຶບຢູເຊີນີ້ບໍ່ໄດ້ ຈົນກວ່າຈະເຄຍຍອດ' });
                        } else {
                            //find and clear credit
                            await User.findById(UserID)
                                .then(async (result: any) => {
                                    //sent back credit to member
                                    if (result.Amount > 0) {
                                        //create histroy credit
                                        const newHistory = new User_history_credit({
                                            UserID: UserID,
                                            Amount: result.Amount,
                                            Transaction: "comeback",
                                            Date: getDate()
                                        })
                                        await Member.findOneAndUpdate(
                                            { _id: member.id },
                                            { $inc: { Amount: result.Amount } },
                                            { new: true }
                                        );
                                        await newHistory.save();
                                    }
                                    await User.findByIdAndDelete(UserID)
                                    res.status(201).json({ status: 'ok', message: 'success' });
                                })
                        }
                    })
            } catch (err) {
                res.status(400).json({ status: 'no', message: 'err' });
            }
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });


}