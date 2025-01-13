import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

import isMember from '@/Middleware/isMember';
import { unblockUsers } from '@/Service/user';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data;
            if (req.method === 'POST') {
                const { idlist } = req.body;
                const block = await unblockUsers(member.id, idlist);
                if (block) {
                    res.status(200).json({ code: 0 });
                } else {
                    res.status(200).json({ code: 999, message: 'error' });
                }
            }
            else {
                //res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });
}