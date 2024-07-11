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
                        Transaction: "deposit",
                        Date: getDate()
                    })
                    //find member
                    await Member.findOneAndUpdate(
                        { _id: MemberID },
                        { $inc: { Amount: Amount } },
                        { new: true } // tùy chọn này trả về tài liệu đã cập nhật
                    );
                    await NewMemberHistory.save().then((result: any) => {
                        res.status(201).json({ status: 'ok', message: 'success', result: result });
                    })
                } catch (err) {
                    //console.log(err);
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}