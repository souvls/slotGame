import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

const User = require('../../../Models/User');
const Member = require('../../../Models/Member');
const User_history_credit = require("../../../Models/User_history_credit")

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
                const { UserID, Amount } = req.body
                console.log(req.body)
                const newHistory = new User_history_credit({
                    UserID: UserID,
                    Amount: Amount,
                    Transaction: "desposit",
                    Date: getDate()
                })
                //check credit member
                await Member.findById(member.id)
                    .then(async (result: any) => {
                        if (result) {
                            if (result.Amount - Amount >= 0) {
                                //reduce credit member
                                await Member.findOneAndUpdate(
                                    { _id: member.id },
                                    { $inc: { Amount: -Amount } },
                                    { new: true } // tùy chọn này trả về tài liệu đã cập nhật
                                );
                                //update credit
                                await User.findOneAndUpdate(
                                    { _id: UserID },
                                    { $inc: { Amount: Amount } },
                                    { new: true } // tùy chọn này trả về tài liệu đã cập nhật
                                );
                                await newHistory.save().then(() => {
                                    res.status(201).json({ status: 'ok', message: 'success' });
                                }).catch((err:any)=>{
                                    console.log(err)
                                    res.status(201).json({ status: 'no', message: 'err' });
                                })

                            } else {
                                res.status(201).json({ status: 'no', message: 'ເຄດີດບໍ່ພໍ' });
                            }
                        } else {
                            res.status(400).json({ status: 'no', message: "error" });
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