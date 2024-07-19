import type { NextApiRequest, NextApiResponse } from 'next'
import verifyJWTToken from '../../../Middleware/auth'
import isAdmin from '../../../Middleware/isAdmin';

const Maintenance = require("../../../Models/Maintenance");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    verifyJWTToken(req, res, async () => {
        isAdmin(req, res, async () => {
            //const admin: any = req.headers.data
            if (req.method === 'GET') {
                try {
                    await Maintenance.findById("668a22755b202996ef18608e")
                        .then((result: any) => {
                            res.status(200).json({ status: 'ok', message: 'success', result: result });
                        })
                } catch (err) {
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            }
            else if (req.method === 'POST') {
                try {
                    await Maintenance.findOneAndUpdate(
                        {_id:"668a22755b202996ef18608e"},
                        [{ $set: { Online: { $not: "$Online" } } }],
                        { new: true }
                    )
                        .then((result: any) => {
                            res.status(200).json({ status: 'ok', message: 'success', result: result });
                        })
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            }
            else if (req.method === 'PUT') {
                try {
                    const { DateStart, DateEnd } = req.body
                    console.log(req.body )
                    await Maintenance.findByIdAndUpdate(
                        {_id:"668a22755b202996ef18608e"},
                        {
                            $set: {
                                DateStart: DateStart,
                                DateEnd: DateEnd
                            }
                        },
                        { new: true }
                    )
                        .then((result: any) => {
                            console.log(result)
                            res.status(200).json({ status: 'ok', message: 'success', result: result });
                        })
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ status: 'no', message: 'error' });
                }
            } else {
                res.setHeader('Allow', ['POST', 'GET', 'PUT']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        });
    });


}