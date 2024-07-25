import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';

const User = require('../../../Models/User');
const Member = require('../../../Models/Member');


// import { format } from 'date-fns'
// const getDate = () => {
//     const now = new Date();
//     const data = format(now, 'dd/MM/yy HH:mm:ss');
//     return data;
// }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isAdmin(req, res, async () => {
            const admin: any = req.headers.data
            if (req.method === 'GET') {
                await Member.find().sort({ createdAt: -1 })
                    .then((result: any) => {
                        //console.log(Member);
                        res.status(200).json({ status: 'ok', message: 'success', result: result });
                    })
            } else if (req.method === 'POST') {
                try {
                    const { Username, Password, PartnersPercent } = req.body;
                    const NewMember = new Member({
                        Username: Username,
                        Password: Password,
                        PartnersPercent: PartnersPercent,
                    })
                    await NewMember.save().then((result: any) => {
                        res.status(201).json({ status: 'ok', message: 'success', result: result });
                    })
                } catch (err) {
                    console.log(err);
                    res.status(400).json({ status: 'no', message: 'error' });
                }

            } else if (req.method === 'PATCH') {
                try {
                    const { MemberID, Username, Password, PartnersPercent } = req.body;
                    //console.log(req.body)
                    await Member.findByIdAndUpdate(MemberID, {
                        Username: Username,
                        Password: Password,
                        PartnersPercent: PartnersPercent
                    }).then(() => {
                        res.status(200).json({ status: 'ok', message: 'success', });
                    }).catch(() => {
                        res.status(400).json({ status: 'no', message: 'error' });
                    });

                } catch (err) {
                    console.log(err);
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else if (req.method === 'DELETE') {
                try {
                    const { MemberID } = req.body;
                    //console.log(req.body)
                    await Member.findByIdAndDelete(MemberID).then(() => {
                        res.status(200).json({ status: 'ok', message: 'success', });
                    }).catch(() => {
                        res.status(400).json({ status: 'no', message: 'error' });
                    });
                } catch (err) {
                    console.log(err);
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else {
                res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}