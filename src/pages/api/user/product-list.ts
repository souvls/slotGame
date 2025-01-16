import type { NextApiRequest, NextApiResponse } from 'next'
import { getGameList } from '@/Middleware/operator';
import { productList } from '@/Service/game';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const gamelist = await productList();
        res.status(200).json(gamelist);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}