'use server'
import { _findUserByID, _updateIsNotOnline } from "@/Repo/users";
import axios from "axios";
import md5 from "md5";

export const getGames = async (product_code: number, game_type: string, offset: number, size: number) => {
    try {
        const request_time = Math.floor(Date.now() / 1000);
        const hash = md5(`${request_time}${process.env.SECRET_KEY}gamelist${process.env.OP_CODE}`);
        const res = await axios.get(process.env.API_NAME + "/api/operators/provider-games" +
            "?product_code=" + product_code +
            "&operator_code=" + process.env.OP_CODE +
            "&game_type=" + game_type +
            "&sign=" + hash +
            "&request_time=" + request_time +
            "&offset=" + offset +
            "&size=" + size
        )
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const playGame = async (userid: string, game_code: string, product_code: number, game_type: string, ip: string, currency:string) => {
    const user = await _findUserByID(userid);
    console.log(userid);
    if (user) {
        // console.log(game_type, game_code, product_code);
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
                        "currency": currency,
                        "game_code": game_code,
                        "product_code": product_code,
                        "game_type": game_type,
                        "language_code": 0,
                        "ip": ip,
                        "platform": "web",
                        "sign": hash,
                        "request_time": request_time,
                        "operator_lobby_url": "https://infinity999.com",
                    }
                    // console.log(raw);
                    const callgame = await axios.post(`${process.env.API_NAME}/api/operators/launch-game`,
                        JSON.stringify(raw),
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }
                    )
                    // console.log(callgame);

                    console.log("==> " + user.Username + " play game " + game_type + "," + product_code + "," + game_code);
                    return callgame.data;
                } catch (error) {
                    console.log(error);
                    return { status: 'no', message: error }
                }
            } else {
                _updateIsNotOnline(userid)
                return { status: 'no', message: "logout1" }
            }
        } else {
            _updateIsNotOnline(userid)
            return { status: 'no', message: "logout2" }
        }
    } else {
        _updateIsNotOnline(userid)
        return { status: 'no', message: "logout3" }
    }
}