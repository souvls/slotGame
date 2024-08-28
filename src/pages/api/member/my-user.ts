import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
const User = require('../../../Models/User');
const Member = require('../../../Models/Member');
const User_history_credit = require('../../../Models/User_history_credit');
const Member_history_credit = require('../../../Models/Member_history_credit');

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
            User.find({ MemberID: member.id }).sort({ createdAt: -1 })
                .then((result: any) => {
                    res.status(200).json({ status: 'ok', message: 'success', result: result });
                })
        } else if (req.method === 'PATCH') {
            try {
                const { UserID, Username, Password } = req.body;
                User.findByIdAndUpdate(UserID, { Username: Username, Password: Password })
                res.status(200).json({ status: 'ok', message: 'success', });
            } catch (err) {
                res.status(400).json({ status: 'no', message: 'error' });
            }
        } else if (req.method === 'POST') {
            try {
                console.log(member)
                const { Username, Password } = req.body;
                const NewUser = new User({
                    Username: member.name+Username,
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
                //find and clear credit
                User.findById(UserID)
                    .then(async (result: any) => {
                        //sent back credit to member
                        if (result.Amount > 0) {
                            //create histroy credit
                            const NewMemberHistory = new Member_history_credit({
                                MemberID: result.MemberID,
                                Amount: result.Amount,
                                Transaction: "toback",
                                Date: getDate()
                            })
                            await Member.findOneAndUpdate(
                                { _id: member.id },
                                { $inc: { Amount: result.Amount } },
                                { new: true }
                            );
                            await NewMemberHistory.save();
                        }
                        await User_history_credit.deleteMany({UserID:result._id})
                        await User.findByIdAndDelete(UserID)
                        res.status(201).json({ status: 'ok', message: 'success' });
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