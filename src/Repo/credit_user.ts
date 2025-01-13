import User from "@/Models/User";
import User_credit from "@/Models/User_history_credit";

import { _myCreditMember, _updateCreditMember } from "./credit_member";
import { format } from 'date-fns'
const getDate = () => {
    const now = new Date();
    const data = format(now, 'dd/MM/yy HH:mm:ss');
    return data;
}

export async function _getAlldHistorCreditUser(memberid: string, userid: string, numberOfPage: number, page: number) {
    try {
        const skip = (page - 1) * numberOfPage;

        const transaction = await User_credit.find({ 'User.MemberID': memberid, 'User.id': userid })
            .sort({createdAt:-1})
            .skip(skip)
            .limit(numberOfPage);
        const total = await User_credit.find({ 'User.MemberID': memberid, 'User.id': userid }).countDocuments();
        const totalPages = Math.ceil(total / numberOfPage);

        return {
            transaction,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error('Error get all history:', error);
    }

}

export async function _myCreditUser(userid: string) {
    try {
        const credit = await User.findById(userid).select('Amount'); // Chỉ lấy trường amount
        if (credit) {
            return credit.Amount
        }
        return null
    } catch (error) {
        console.error('Error finding member:', error);
    }

}
export async function _updateCreditUsers(memberid: string, idList: string[], credit: number) {
    try {
        const update = await User.updateMany(
            { MemberID: memberid, _id: { $in: idList } },
            { $inc: { Amount: credit } },
            { new: true }
        );
        return update;
    } catch (error) {
        console.error('Error _update credit Users', error);
        return false;
    }

}
export async function _saveHistoryCreditUser(memberID: string, userid: string, username: string, credit: number, beforeCredit: number, afterCredit: number, title: string) {
    try {
        const newHistory = new User_credit({
            User: {
                id: userid,
                Username: username,
                MemberID: memberID
            },
            Amount: credit,
            BeforeAmount: beforeCredit,
            AfterAmount: afterCredit,
            Transaction: title,
            Date: getDate()
        })
        return await newHistory.save();
    } catch (error) {
        console.error('Error finding member:', error);
    }
}

export async function _updateCreditUser(memberID: string, userid: string, credit: number) {
    try {
        const user = await User.find({ _id: userid, MemberID: memberID });
        if (user) {
            //update credit user
            const update = await User.findOneAndUpdate(
                { _id: userid },
                { $inc: { Amount: credit } },
                { new: true }
            );
            if (update) {
                return update;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}