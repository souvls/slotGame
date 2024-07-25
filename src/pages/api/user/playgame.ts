import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import { playGame } from '@/Middleware/operator';
import md5 from 'md5';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                try {
                    const { username, password, game_code, product_code, game_type, ip } = await req.body
                    console.log(req.body)
                    const getGMT8TimestampInSeconds = () => {
                        const now = new Date();
                        const timeZoneOffset = 8 * 60;
                        const gmt8Time = new Date(now.getTime() + timeZoneOffset * 60000);
                        return Math.floor(gmt8Time.getTime() / 1000);
                    };

                    const request_time = await getGMT8TimestampInSeconds()
                    const hash = await md5(request_time + "" + process.env.SECRET_KEY + "launchgame" + process.env.OP_CODE);
                    const data = JSON.stringify({
                        operator_lobby_url: "http://infinity999.com",
                        operator_code: process.env.OP_CODE,
                        member_account: username,
                        password: password,
                        nickname: "",
                        currency: "IDR",
                        game_code: game_code,
                        product_code: product_code,
                        game_type: game_type,
                        language_code: 0,
                        ip: ip,
                        platform: "web",
                        sign: hash,
                        request_time: request_time
                    })
                    console.log(data)
                    const result = await fetch(process.env.API_NAME + "/api/operators/launch-game", {
                        method: "POST",
                        headers: { accept: 'application/json' },
                        body: data,
                        redirect: "follow"
                    }).then((response) => response.json())
                    console.log(result)
                    res.status(200).json({ status: 'ok', message: 'playgame', result: result });
                } catch (err) {
                    res.status(200).json({ status: 'no', message: 'err' });
                }
            }
            else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    })
}