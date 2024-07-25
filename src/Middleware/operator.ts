
import md5 from "md5";
const Maintenance = require("../Models/Maintenance");

function TimeStampGMT8(dateString: any) {
    let date = new Date(dateString);

    // Get the time in milliseconds
    let timestampInMilliseconds = date.getTime();
    // Adjust for GMT+8 (8 hours ahead of GMT)
    let offset = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    let timestampInMillisecondsGMT8 = timestampInMilliseconds + offset;
    return timestampInMillisecondsGMT8
}
export const getAllWager = async () => {
    const maintenance = await Maintenance.findById("668a22755b202996ef18608e");
    const start = new Date(maintenance.DateStart).getTime();
    const end = new Date(maintenance.DateEnd).getTime();
    const now = new Date();
    const request_time = now.getTime();
    const hash = md5(request_time + "" + process.env.SECRET_KEY + "getwagers" + process.env.OP_CODE);
    try {
        const wagers = await fetch(process.env.API_NAME + "/api/operators/wagers" +
            "?operator_code=" + process.env.OP_CODE +
            "&sign=" + hash +
            "&request_time=" + request_time +
            "&start=" + start +
            "&end=" + end
        ).then((response) => response.json())
        return wagers.wagers;
    } catch (err) {
        return false
    }
}
export const getWagerByMemberID = async (memberID: string) => {
    const id = memberID.slice(-4);
    const allWager = await getAllWager();
    console.log(id)
    const wagerMember = await allWager.filter((i: any) => i.member_account.slice(0, 4) === id);
    return wagerMember
}
export const getGameList = async () => {
    const request_time = new Date().getTime();
    const hash = md5(request_time + "" + process.env.SECRET_KEY + "gamelist" + process.env.OP_CODE);
    try {
        const result = await fetch(process.env.API_NAME + "/api/operators/provider-games" +
            "?product_code=" + process.env.PRODUCT_CODE +
            "&operator_code=" + process.env.OP_CODE +
            "&game_type=" + process.env.GAME_TYPE +
            "&sign=" + hash +
            "&request_time=" + request_time)
            .then((response) => response.json());
        return result;
    } catch (err) {
        return err
    }
}
export const playGame = async (username: string, password: any, game_code: any, product_code: any, game_type: any, ip: any) => {
    try {
        const getGMT8TimestampInSeconds = () => {
            const now = new Date();
            const timeZoneOffset = 8 * 60;
            const gmt8Time = new Date(now.getTime() + timeZoneOffset * 60000);
            return Math.floor(gmt8Time.getTime() / 1000);
        };
        const request_time = getGMT8TimestampInSeconds()
        const hash = md5(request_time + "" + process.env.SECRET_KEY + "launchgame" + process.env.OP_CODE);
        const data = JSON.stringify({
            //operator_lobby_url: "http://infinity999.com",
            operator_code: process.env.OP_CODE,
            member_account: username,
            password: password,
            nickname: username,
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
        })
            .then((response) => response.json())
        console.log(result)
        return result;
    }
    catch (err) {
        throw err
    }
}