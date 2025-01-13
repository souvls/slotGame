import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'


import { format } from 'date-fns'
import { getUsers, searchUser } from '@/Service/user';
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
        if (req.method === 'GET') {
            const { key } = req.query;
            const data = await searchUser(member.id, key as string);
            res.status(200).json(data);
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });


}