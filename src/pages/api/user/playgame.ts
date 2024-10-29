import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import User from '@/Models/User';
import md5 from 'md5';
import { json } from 'stream/consumers';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                const { game_code, product_code, ip,game_type} = req.body;

                //checkIp 
                const _user = await User.findById(user.id);
                // console.log(_user.ip)
                // console.log(ip)
                if (_user.ip === ip) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    const request_time = new Date().getTime();
                    const hash = md5(`${request_time}${process.env.SECRET_KEY}launchgame${process.env.OP_CODE}`);
                    const raw = {
                        "operator_code": process.env.OP_CODE,
                        "member_account": user.username,
                        "password": "@ddfkj_reHG4982$Gxx#sSEW783",
                        "currency": "THB",
                        "game_code": game_code,
                        "product_code": product_code,
                        "game_type": game_type,
                        "language_code": 0,
                        "ip": "127.0.0.1",
                        "platform": "web",
                        "sign": hash,
                        "request_time": request_time,
                        "operator_lobby_url": "http://infinity999.com",
                    }
                    fetch( "https://production.gsimw.com/api/operators/launch-game", {
                        method: "POST",
                        headers: myHeaders,
                        body: JSON.stringify(raw),
                        redirect: "follow"
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            //console.log(raw);
                            console.log(result)
                            res.status(200).json({ status: 'ok', message: result.message, result: result.url,content:result.content });
                        })
                        .catch((error) => console.error(error));
                } else {
                    res.status(200).json({ status: 'no', message: "logout" });
                }
            }
            else {
                res.setHeader('Allow', ['POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    })
}
function generateRandomPassword(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}