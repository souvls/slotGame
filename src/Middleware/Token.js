import { NextRequest, NextResponse, NextMiddleware } from 'next/server';
const jwt = require('jsonwebtoken');

class token {
    static async genToken1(id, username, role) {
        return await jwt.sign({ "id": id, "username": username, "role": role }, process.env.SCRET_KEY_TOKEN, { expiresIn: "2h", algorithm: "HS256" })
    }
    static async genToken2(id, username, role) {
        return await jwt.sign({ "id": id, "username": username, "role": role }, process.env.SCRET_KEY_TOKEN, {algorithm: "HS256" })
    }
    static jwtValidate = async(NextRequest,NextResponse,NextMiddleware)=>  {
        
        try {
            const tokenHeader = NextRequest.headers.authorization || NextRequest.headers['authorization'];
            const access_token = await tokenHeader.token.split(" ")[1];
            const decoded = await jwt.verify(access_token, process.env.SCRET_KEY_TOKEN );
            req.data = decoded;
            return NextMiddleware;
        } catch (err) {
            NextResponse.status(401).json({ message: 'no' });
        }

    }
    // static jwtVerifyRefeshToken = (req, res, next) => {
    //     const tokenHeader = req.headers.authorization
    //     //Check the header contains the token or not.
    //     if (tokenHeader) {
    //         try {
    //             const token = req.headers.authorization.split(" ")[1];

    //             jwt.verify(token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    //                 if (err) return res.status(401).json({ status: "no", msg: "Wrong token" });
    //                 req.token = token;
    //                 req.email = decoded.email;
    //                 return next();
    //             })

    //         } catch (err) {
    //             return res.status(401).json({ status: "no", msg: "Invalid token" });
    //         }
    //     } else {
    //         return res.status(401).json({ status: "no", msg: "A token is required for authentication" });
    //     }
    // }
}
module.exports = token;