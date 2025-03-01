import checkMaintenance from '@/Middleware/checkMaintenance';
import User from '@/Models/User';
import Transaction from '@/Models/TransactionAMB';
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
            const { id, productId, username, currency, timestampMillis, txns } = req.body
            const txnsID: any[] = [];
            var total_amount = 0;
            {
                for (const i of txns) {
                    txnsID.push(i.id)
                    total_amount += (parseFloat(parseFloat(i.payoutAmount).toFixed(2)) - parseFloat(parseFloat(i.betAmount).toFixed(2)))
                }

                //check duplicate
                const duplicate = await Transaction.find({ 'txns.id': { $in: txnsID } })
                if (duplicate.length !== 0 || hasDuplicates(txnsID)) {
                    console.log("Duplicate Transaction")
                    res.status(200).json(
                        {
                            "id": id,
                            "statusCode": 0,
                            "timestampMillis": timestampMillis,
                            "productId": productId
                        }
                    )
                    return;
                }
                const user = await User.findOne({ Username: username });
                if (!user || !user.status) {
                    console.log("10001:User not found")
                    res.status(200).json(
                        {
                            "id": id,
                            "statusCode": 10001,
                            "timestampMillis": timestampMillis,
                            "productId": productId
                        }
                    )
                    return;
                } else {
                    const update_balance_user = await User.findOneAndUpdate(
                        { _id: user._id },
                        { $inc: { Amount: parseFloat(total_amount.toFixed(2)) } },
                        { new: true }
                    );
                    const TST = new Transaction(
                        {
                            "id": id,
                            "productId": productId,
                            "username": username,
                            "currency": currency,
                            "timestampMillis": timestampMillis,
                            "txns": txns
                        }
                    );
                    TST.save();
                    const data = {
                        "id": id,
                        "statusCode": 0,
                        "timestampMillis": timestampMillis,
                        "productId": productId,
                        "currency": currency,
                        "balanceBefore": parseFloat(parseFloat(user.Amount).toFixed(2)),
                        "balanceAfter": parseFloat(parseFloat(update_balance_user.Amount).toFixed(2)),
                        "username": username
                    }
                    console.log(data);
                    res.status(200).json(data);
                }

            }
            // if (sessionToken !== "") {
            //     try {
            //         const user = await User.findOne({ Username: username });
            //         if (user) {
            //             if (user.Amount > 0) {
            //                 const data = {
            //                     "id": id,
            //                     "statusCode": 0,
            //                     "timestampMillis": timestampMillis,
            //                     "productId": productId,
            //                     "currency": currency,
            //                     "balance": parseFloat(parseFloat(user.Amount).toFixed(2)),
            //                     "username": user.Username
            //                 }
            //                 console.log(data);
            //                 res.status(200).json(data);
            //             } else {
            //                 console.log("10002:User has insufficient balance to proceed with")
            //                 res.status(200).json(
            //                     {
            //                         "id": id,
            //                         "statusCode": 10002,
            //                         "timestampMillis": timestampMillis,
            //                         "productId": productId
            //                     }
            //                 )
            //             }
            //         } else {
            //             console.log("10001:User not found")

            //             res.status(200).json(
            //                 {
            //                     "id": id,
            //                     "statusCode": 10001,
            //                     "timestampMillis": timestampMillis,
            //                     "productId": productId
            //                 }
            //             )
            //         }
            //     } catch (error) {
            //         console.log(error);
            //         res.status(200).json(
            //             {
            //                 "id": id,
            //                 "statusCode": 50001,
            //                 "timestampMillis": timestampMillis,
            //                 "productId": productId
            //             }
            //         )
            //     }
            // } else {
            //     console.log("30001:Invalid token")
            //     res.status(200).json(
            //         {
            //             "id": id,
            //             "statusCode": 30001,
            //             "timestampMillis": timestampMillis,
            //             "productId": productId
            //         }
            //     )
            // }
        }
        else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    })
}
function hasDuplicates(array: any) {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
}