import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isMember from '@/Middleware/isMember';
import { getWagerByMemberID } from '@/Middleware/operator';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    const wager =  await getWagerByMemberID(member.id)
                    console.log(wager);
                    res.status(400).json({ status: 'ok', message: 'my history', result: wager });
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