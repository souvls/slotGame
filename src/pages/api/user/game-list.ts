import type { NextApiRequest, NextApiResponse } from 'next'
import { getGameList } from '@/Middleware/operator';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const gamelist = await getGameList();
        res.status(200).json(gamelist);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}