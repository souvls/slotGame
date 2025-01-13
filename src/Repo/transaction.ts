import Transaction from '../Models/Transaction'
export async function getTransactionByUserID(memberid: string, userid: string, page: number, numberOfPage: number) {
    try {
        const skip = (page - 1) * numberOfPage;

        const users = await Transaction.find({ MemberID: memberid })
            .sort({createdAt:-1})
            .skip(skip)
            .limit(numberOfPage);

        const totalUsers = await Transaction.find({ MemberID: memberid }).countDocuments();
        const totalPages = Math.ceil(totalUsers / numberOfPage);

        return {
            users,
            totalPages,
            currentPage: page,
        };

    } catch (error) {

    }
} 