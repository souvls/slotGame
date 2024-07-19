import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';
import md5 from 'md5';

const Maintenance = require('../../../Models/Maintenance');
const User = require('../../../Models/User');
const Member = require('../../../Models/Member');


// import { format } from 'date-fns'
// const getDate = () => {
//     const now = new Date();
//     const data = format(now, 'dd/MM/yy HH:mm:ss');
//     return data;
// }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isAdmin(req, res, async () => {
            const admin: any = req.headers.data;
            const now = new Date();
            const request_time = now.getTime();
            if (req.method === 'PATCH') {

                try {
                    const maintenance = await Maintenance.findById("668a22755b202996ef18608e");
                    //console.log(maintenance)
                    //setDateStart(yesterday.toISOString().substr(0, 10));
                    //setDateEnd(now.toISOString().substr(0, 10));
                    const hash = md5(request_time + '' + process.env.NEXT_PUBLIC_SECRET_KEY + "getwagers" + process.env.NEXT_PUBLIC_OP_CODE);
                    fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/wagers" +
                        "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
                        "&sign=" + hash +
                        "&request_time=" + request_time)
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(maintenance.DateStart)
                            for (const i of result.wagers) {
                                if (new Date(i.created_at) >= maintenance.DateStart && new Date(i.created_at) <= maintenance.DateEnd) {
                                    console.log(new Date(i.created_at));
                                }
                            }

                        })
                        .catch((error) => console.error(error));
                } catch (err) {

                }
            } else {
                res.setHeader('Allow', ['PATCH']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}