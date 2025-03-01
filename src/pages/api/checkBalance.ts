import checkMaintenance from '@/Middleware/checkMaintenance';
import User from '@/Models/User';
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    checkMaintenance(req, res, async () => {
        if (req.method === 'GET') {
            console.log(req.body)
            res.status(200).json({})
        }
        else if (req.method === 'POST') {
            console.log(req.body)
            const { id, currency, productId, timestampMillis, username, gameCode, sessionToken } = req.body
            if (sessionToken !== "") {
                try {
                    const user = await User.findOne({ Username: username });
                    if (user) {
                        if (user.Amount > 0) {
                            const data = {
                                "id": id,
                                "statusCode": 0,
                                "timestampMillis": timestampMillis,
                                "productId": productId,
                                "currency": currency,
                                "balance": parseFloat(parseFloat(user.Amount).toFixed(2)),
                                "username": user.Username
                            }
                            console.log(data);
                            res.status(200).json(data);
                        } else {
                            console.log("10002:User has insufficient balance to proceed with")
                            res.status(200).json(
                                {
                                    "id": id,
                                    "statusCode": 10002,
                                    "timestampMillis": timestampMillis,
                                    "productId": productId
                                }
                            )
                        }
                    } else {
                        console.log("10001:User not found")
                        res.status(200).json(
                            {
                                "id": id,
                                "statusCode": 10001,
                                "timestampMillis": timestampMillis,
                                "productId": productId
                            }
                        )
                    }
                } catch (error) {
                    console.log(error);
                    res.status(200).json(
                        {
                            "id": id,
                            "statusCode": 50001,
                            "timestampMillis": timestampMillis,
                            "productId": productId
                        }
                    )
                }
            } else {
                console.log("30001:Invalid token")
                res.status(200).json(
                    {
                        "id": id,
                        "statusCode": 30001,
                        "timestampMillis": timestampMillis,
                        "productId": productId
                    }
                )
            }
        }
        else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    })
}