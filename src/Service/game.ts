import { _getTransactionByUserID } from "@/Repo/transaction";
import { _findUserByID, _updateIsNotOnline } from "@/Repo/users";
import axios from "axios";
import md5 from "md5";

export async function productList() {
    const request_time = new Date().getTime();
    const hash = md5(request_time + "" + process.env.SECRET_KEY + "productlist" + process.env.OP_CODE);
    try {
        const result = await axios.get(process.env.API_NAME + "/api/operators/available-products" +
            "?operator_code=" + process.env.OP_CODE +
            "&sign=" + hash +
            "&request_time=" + request_time)
        const data: any[] = result.data;
        const product: any[] = [];
        data.forEach(x => {
            if (x.game_type === "SLOT") {
                product.push(x);
            }
        })

        return result.data

    } catch (err) {
        return err
    }
}
export async function historyPayGame(userid: string, page: number, numberOfPage: number) {
    return await _getTransactionByUserID(userid, page, numberOfPage);
}
//in server  component
export async function launhGSCgame(userid: string, game_code: string, product_code: number, ip: string, game_type: string,currency: string) {
    const user = await _findUserByID(userid);
    if (user) {
        console.log(game_type, game_code, product_code);
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
                    
                    console.log(callgame);

                    console.log("==> " + user.Username + " play game " + game_type + "," + product_code + "," + game_code);
                    return callgame.data;
                } catch (error) {
                    console.log(error);
                    return { status: 'no', message: error }
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
export async function launhAMBgame(userid: string, productId: string, name: string, category: string, type: string, code: string, providerCode: string, ip: string) {
    const user = await _findUserByID(userid);
    if (user) {
        // console.log(type, productId, name, code);
        if (user.status) {
            if (user.ip === ip) {
                try {
                    const res = await axios.post("https://fond-complete-skunk.ngrok-free.app/api/login-amb", {
                        username:user.Username,
                        code:code
                    })
                    console.log(res);
                    return res.data
                } catch (error) {
                    console.log(error);
                    return { status: 'no', message: "game error", error: error }
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

