import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

import { createUser, getUsers, updatePasswordUser } from '@/Service/user';
import isMember from '@/Middleware/isMember';
import { memberInfo } from '@/Service/member';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member:any= req.headers.data
            if (req.method === 'GET') {
                const memberinfo = await memberInfo(member.id);
                res.status(200).json(memberinfo);
            }
            else {
                //res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });
}