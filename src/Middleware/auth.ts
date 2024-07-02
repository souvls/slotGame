// // middlewares/auth.ts
// import { NextRequest, NextResponse, NextMiddleware } from 'next/server';

// export async function middlewareAuth(req: NextRequest) {
//     // Your middleware logic here
//     console.log('Middleware intercepted request:');
//     return NextResponse.next;
// }

import { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken'); // Replace with your actual JWT library

const verifyJWTToken = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
        //console.log(req)
        const tokenHeader =  req.headers.authorization || req.headers['authorization'];
        const access_token = tokenHeader?.split(" ")[1];
        const decoded = jwt.verify(access_token, process.env.SCRET_KEY_TOKEN);
        req.headers.data = decoded;
        next();
    } catch (err) {
        res.status(400).json({status:'no', message: 'notoken' });
    }
    
};

export default verifyJWTToken;