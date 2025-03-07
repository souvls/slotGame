import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import { launhAMBgame } from '@/Service/game';
import axios from 'axios';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                const { productId, name, category, type, code, providerCode, ip } = req.body;
                const playgame = await launhAMBgame(user.id, productId, name, category, type, code, providerCode, ip);
                    res.status(200).json(playgame);
            }
        });
    })
}

