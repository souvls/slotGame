import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import User from '@/Models/User';
import md5 from 'md5';
import axios from 'axios';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                const { game_code, product_code, ip, game_type } = req.body;
                var checkIP = false;
                const _user = await User.findById(user.id);
                try {
                    if (_user.ip === ip) {
                        checkIP = true;
                    } else {
                        res.status(200).json({ status: 'no', message: "logout" });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(200).json({ status: 'no', message: "logout" });
                }
                if (checkIP) {
                    try {
                        const request_time = Math.floor(Date.now() / 1000);
                        //const request_time = new Date().getTime();
                        const hash = md5(`${request_time}${process.env.SECRET_KEY}launchgame${process.env.OP_CODE}`);
                        const raw = {
                            "operator_code": process.env.OP_CODE,
                            "member_account": _user.Username,
                            "password": _user.Password,
                            "currency": "THB",
                            "game_code": game_code,
                            "product_code": product_code,
                            "game_type": game_type,
                            "language_code": 3,
                            "ip": ip,
                            "platform": "web",
                            "sign": hash,
                            "request_time": request_time,
                            "operator_lobby_url": "https://infinity999.com",
                        }
                        const callgame = await axios.post(`${process.env.API_NAME}/api/operators/launch-game`,
                            JSON.stringify(raw),
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }

                        )
                        console.log(callgame);
                        console.log("==> " + user.username + " play game " + game_type + "," + product_code + "," + game_code);
                        res.status(200).json(callgame.data);
                    } catch (error) {
                        console.log(error);
                        res.status(200).json({ status: 'no', message: "game error" });
                    }
                }
            }
        });
    })
}

