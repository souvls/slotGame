'use server'
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