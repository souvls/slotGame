import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
const User = require('../../../Models/User');
const Member = require('../../../Models/Member');
const User_history_credit = require("../../../Models/User_history_credit");
const Member_history_credit = require("../../../Models/Member_history_credit");
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
        if (req.method === 'POST') {
            try {
                //create history
                const { UserID, Amount } = req.body;
                const newHistory = new User_history_credit({
                    UserID: UserID,
                    Amount: Amount,
                    Transaction: 'withdraw',
                    Date: getDate()
                })
                //check credit user
                await User.findById(UserID)
                    .then(async (result: any) => {
                        if (result) {
                            if (result.Amount - Amount >= 0) {
                                //add credit member
                                await Member.findOneAndUpdate(
                                    { _id: member.id },
                                    { $inc: { Amount: Amount } },
                                    { new: true }
                                );
                                //withdraw
                                await User.findOneAndUpdate(
                                    { _id: UserID },
                                    { $inc: { Amount: -Amount } },
                                    { new: true }
                                );
                                const NewMemberHistory = new Member_history_credit({
                                    MemberID: member.id,
                                    Amount: Amount,
                                    Transaction: "credit_user",
                                    Date: getDate()
                                })
                                await NewMemberHistory.save();
                                await newHistory.save();
                                res.status(201).json({ status: 'ok', message: 'success' });
                            } else {
                                res.status(200).json({ status: 'no', message: 'ເຄດີດບໍ່ພໍ' });
                            }
                        } else {
                            res.status(400).json({ status: 'no', message: "no data" });
                        }
                    })

            } catch (err) {
                res.status(400).json({ status: 'no', message: err });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });


}