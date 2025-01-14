import verifyJWTToken from '../../../Middleware/auth'
import isMember from '@/Middleware/isMember';
import { myHistoryCredit } from '@/Service/member';
import type { NextApiRequest, NextApiResponse } from 'next'


const Member = require('../../../Models/Member');
const Token = require('../../../Middleware/Token');


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    const { page, numOfPage } = req.query;
                    const data = await myHistoryCredit(member.id, Number(page), Number(numOfPage))
                    res.status(200).json(data);
                } catch (err) {
                    throw err
                }

            } else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });

}