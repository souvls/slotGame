import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';

const History_play = require("../../../Models/User_history_played")
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isAdmin(req, res, async () => {
            //const admin: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    await History_play.deleteMany()
                    res.status(200).json({ status: 'ok', message: 'success' });
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}