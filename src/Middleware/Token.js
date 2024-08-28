import { NextRequest, NextResponse, NextMiddleware } from 'next/server';
const jwt = require('jsonwebtoken');

class token {
    static async genToken1(id,name, username, role) {
        return await jwt.sign({ "id": id, "name":name, "username": username, "role": role }, process.env.SCRET_KEY_TOKEN, { expiresIn: "2h", algorithm: "HS256" })
    }
    static async genToken2(id, username, role) {
        return await jwt.sign({ "id": id, "username": username, "role": role }, process.env.SCRET_KEY_TOKEN, {expiresIn: "2h",algorithm: "HS256" })
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

}
module.exports = token;