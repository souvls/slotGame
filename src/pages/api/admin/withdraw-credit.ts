import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';

const Member = require('../../../Models/Member');
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
        isAdmin(req, res, async () => {
            const admin: any = req.headers.data
            if (req.method === 'POST') {
                try {
                    const { MemberID, Amount } = req.body;
                    const NewMemberHistory = new Member_history_credit({
                        MemberID: MemberID,
                        Amount: Amount,
                        Transaction: "withdraw",
                        Date: getDate()
                    })
                    //find member
                    await Member.findOneAndUpdate(
                        { _id: MemberID },
                        { $inc: { Amount: -Amount } },
                        { new: true } // tùy chọn này trả về tài liệu đã cập nhật
                    );
                    await NewMemberHistory.save().then((result: any) => {
                        res.status(201).json({ status: 'ok', message: 'success', result: result });
                        
                    })
                    //check credit member
                    await Member.findById(MemberID)
                        .then(async (result: any) => {
                            if (result) {
                                if (result.Amount - Amount >= 0) {
                                    //withdraw
                                    await Member.findOneAndUpdate(
                                        { _id: MemberID },
                                        { $inc: { Amount: -Amount } },
                                        { new: true } // tùy chọn này trả về tài liệu đã cập nhật
                                    );
                                    await NewMemberHistory.save();
                                    res.status(201).json({ status: 'ok', message: 'success' });
                                } else {
                                    res.status(200).json({ status: 'no', message: 'ເຄດີດບໍ່ພໍ' });
                                }
                            } else {
                                res.status(400).json({ status: 'no', message: "no data" });
                            }
                        })
                } catch (err) {
                    //console.log(err);
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else {
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}