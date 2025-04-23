import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import { launhGSCgame } from '@/Service/game';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                const { game_code, product_code, ip, game_type, product_currency } = req.body;
                console.log(req.body);
                const playgame = await launhGSCgame(user.id, game_code, product_code, ip, game_type, product_currency);
                res.status(200).json(playgame);
            }
        });
    })
}

