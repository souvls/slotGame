import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import { playGame } from '@/Service/game';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                const { game_code, product_code, ip, game_type } = req.body;
                const playgame = await playGame(user.id,game_code,product_code,ip,game_type);
                console.log(playGame);
                res.status(200).json(playgame);
            }
        });
    })
}

