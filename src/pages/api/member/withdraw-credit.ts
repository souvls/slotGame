import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

import isMember from '@/Middleware/isMember';
import { withdrawCreditUser } from '@/Service/credit';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data;
            if (req.method === 'POST') {
                const { id, credit } = req.body;
                const withdraw = await withdrawCreditUser(member.id, id, credit);
                res.status(200).json(withdraw);
            }
            else {
                //res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });
}