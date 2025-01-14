import Transaction from '../Models/Transaction'
export async function _getTransactionByMember(userid: string, page: number, numberOfPage: number) {
    try {
        const skip = (page - 1) * numberOfPage;

        const transaction = await Transaction.find({ member_id: userid, 'transactions.action': 'SETTLED' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(numberOfPage);

        const total = await Transaction.find({ member_id: userid, 'transactions.action': 'SETTLED' }).countDocuments();
        const totalPages = Math.ceil(total / numberOfPage);

        return {
            transaction,
            totalPages,
            currentPage: page,
        };

    } catch (error) {

    }
} 
export async function _getTransactionByUserID(userid: string, page: number, numberOfPage: number) {
    try {
        const skip = (page - 1) * numberOfPage;

        const transaction = await Transaction.find({ member_id: userid, 'transactions.action': 'SETTLED' })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(numberOfPage);

        const total = await Transaction.find({ member_id: userid, 'transactions.action': 'SETTLED' }).countDocuments();
        const totalPages = Math.ceil(total / numberOfPage);

        return {
            transaction,
            totalPages,
            currentPage: page,
        };

    } catch (error) {

    }
} 