import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'

import { createUser, deletekUsers, getUsers, updatePasswordUser } from '@/Service/user';
import isMember from '@/Middleware/isMember';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isMember(req, res, async () => {
            const member: any = req.headers.data
            if (req.method === 'GET') {
                const { page, numOfPage, orderBy } = req.query;
                // Array.from({ length: 100 }, async (_, i) =>
                //     await createUser(member.name, member.id, (i + 1).toString().padStart(4, '0'), '1234', 0)

                // );
                if (orderBy && typeof orderBy === 'string') {
                    const data = await getUsers(member.id, Number(page), Number(numOfPage), orderBy);
                    res.status(200).json(data);
                }


            }
            else if (req.method === 'POST') {
                const { Username, Password, Amount } = req.body;
                const newUser = await createUser(member.name, member.id, Username, Password, Number(Amount));
                res.status(200).json(newUser);
            }
            else if (req.method === 'PUT') {
                const { id, Password } = req.body;
                const update = await updatePasswordUser(member.id, id, Password);
                if (update) {
                    res.status(200).json({ code: 0, message: "ອັບເດດສຳເລັດ" });
                } else {
                    res.status(200).json({ code: 999, message: "update error" });
                }
            }
            else {
                //res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        })
    });
}