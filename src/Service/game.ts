import { _findUserByID, _updateIsNotOnline } from "@/Repo/users";
import axios from "axios";
import md5 from "md5";

export async function playGame(userid: string, game_code: string, product_code: number, ip: string, game_type: string) {
    const user = await _findUserByID(userid);
    if (user) {
        if (user.status) {
            if (user.ip === ip) {
                try {
                    const request_time = Math.floor(Date.now() / 1000);
                    //const request_time = new Date().getTime();
                    const hash = md5(`${request_time}${process.env.SECRET_KEY}launchgame${process.env.OP_CODE}`);
                    const raw = {
                        "operator_code": process.env.OP_CODE,
                        "member_account": user.Username,
                        "password": user.Password,
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
                    // console.log(callgame);
                    console.log("==> " + user.username + " play game " + game_type + "," + product_code + "," + game_code);
                    return callgame.data;
                } catch (error) {
                    console.log(error);
                    return { status: 'no', message: "game error" }
                }
            } else {
                _updateIsNotOnline(userid)
                return { status: 'no', message: "logout" }
            }
        } else {
            _updateIsNotOnline(userid)
            return { status: 'no', message: "logout" }
        }
    } else {
        _updateIsNotOnline(userid)
        return { status: 'no', message: "logout" }
    }
}