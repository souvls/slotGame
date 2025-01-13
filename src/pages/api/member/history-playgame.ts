import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

import isMember from '@/Middleware/isMember';
import { depositCreditUser, getHistoryCredit } from '@/Service/credit';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data;
            if (req.method === 'GET') {
                const { id, numberOfPage, page } = req.query;
                if (id && typeof id === 'string') {
                    const transaction = await getHistoryCredit(member.id, id, Number(numberOfPage), Number(page))
                    res.status(200).json(transaction);
                }
            }
            else {
                //res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });
}