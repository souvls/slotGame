import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import checkMaintenance from '../../../Middleware/checkMaintenance';
import User from '@/Models/User';
import md5 from 'md5';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        verifyJWTToken(req, res, async () => {
            const user: any = req.headers.data
            if (req.method === "POST") {
                const { game_code, product_code, ip } = req.body;

                //checkIp 
                const _user = await User.findById(user.id);
                console.log(_user.ip)
                console.log(ip)
                if (_user.ip === ip) {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    const request_time = new Date().getTime();
                    const hash = md5(`${request_time}${process.env.SECRET_KEY}launchgame${process.env.OP_CODE}`);
                    const raw = JSON.stringify({
                        "operator_code": process.env.OP_CODE,
                        "member_account": user.username,
                        "password": generateRandomPassword(12),
                        "currency": "THB",
                        "game_code": game_code,
                        "product_code": product_code,
                        "game_type": "SLOT",
                        "language_code": 3,
                        "ip": ip,
                        "platform": "web",
                        "sign": hash,
                        "request_time": request_time,
                        "operator_lobby_url": "http://infinity999.com",
                    })
                    fetch(process.env.API_NAME + "/api/operators/launch-game", {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            //console.log(result)
                            res.status(200).json({ status: 'ok', message: "", result: result.url });
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