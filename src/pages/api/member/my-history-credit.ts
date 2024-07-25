import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isMember from '@/Middleware/isMember';
import { update_money } from '@/Middleware/my-money';

const User = require('../../../Models/User');
const Member = require('../../../Models/Member');
const Member_history_credit = require("../../../Models/Member_history_credit")

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    const myCredit = await Member_history_credit.find({MemberID:member.id}).sort({ createdAt: -1 });
                    //console.log(myCredit)
                    res.status(400).json({ status: 'ok', message: 'my history', result: myCredit });
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