import type { NextApiRequest, NextApiResponse } from 'next'

const User = require("../../../Models/User");
const Transaction = require("../../../Models/Transaction");
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //console.log(req.body)
    if (req.method === 'POST') {
        const transactionID = [];
        const wager_code = [];
        let total_amount = 0;

        try {
            const { member_account, transactions } = req.body;

            // Accumulate transaction IDs, wager codes, and total amount
            for (const i of transactions) {
                transactionID.push(i.id);
                wager_code.push(i.wager_code);
                total_amount += Number(i.amount);
            }

            // Check for duplicate transactions and wagers in one go
            const [duplicateTransactions, existingWagers] = await Promise.all([
                Transaction.find({ id: { $in: transactionID } }),
                Transaction.find({ wager_code: { $in: wager_code } }),
            ]);

            // Check if there are duplicate transactions
            if (duplicateTransactions.length !== 0 || hasDuplicates(transactionID)) {
                return res.status(200).json({
                    "code": 1003,
                    "message": "Duplicate Transaction",
                });
            }

            // Check if any wager exists
            if (existingWagers.length === 0) {
                return res.status(200).json({
                    "code": 1006,
                    "message": "Bet Not Exist",
                });
            }

            // Insert transactions
            await Transaction.insertMany(transactions);

            // Find user and update their balance
            const user = await User.findOne({ Username: member_account });

            if (!user) {
                return res.status(200).json({
                    "code": 1000,
                    "message": "Member Not Exists",
                });
            }

            // Update user's balance
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $inc: { Amount: total_amount } },
                { new: true }
            );

            // Respond with updated balance
            res.status(200).json({
                "code": 0,
                "message": "",
                "before_balance": user.Amount,
                "balance": updatedUser.Amount
            });

        } catch (err) {
            console.error(err);
            res.status(200).json({
                "code": 999,
                "message": err || "An error occurred",
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
function hasDuplicates(array: any) {
    const uniqueElements = new Set(array);
    return uniqueElements.size !== array.length;
}