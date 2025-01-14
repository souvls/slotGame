import Member from '../Models/Member';
import MemberHistoryCredit from '../Models/Member_history_credit'

import { format } from 'date-fns'
const getDate = () => {
    const now = new Date();
    const data = format(now, 'dd/MM/yy HH:mm:ss');
    return data;
}
export async function _myHistoryCredit(memberid: string, page: number, numberOfPage: number) {
    try {
        const skip = (page - 1) * numberOfPage;
        const transactions = await MemberHistoryCredit.find({ 'Member.id': memberid })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(numberOfPage);

        const total = await MemberHistoryCredit.find({ 'Member.id': memberid }).countDocuments();
        const totalPages = Math.ceil(total / numberOfPage);

        return {
            transactions,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        throw error;
    }
}
export async function _myCreditMember(memberid: string) {
    try {
        const credit = await Member.findById(memberid).select('Amount'); // Chỉ lấy trường amount
        if (credit) {
            return credit.Amount
        }
        return null
    } catch (error) {
        console.error('Error finding member:', error);
    }

}
export async function _memberInfo(memberid: string) {
    try {
        const member = await Member.findById(memberid);
        if (member) {
            return member;
        }
        return null
    } catch (error) {
        console.error('Error finding member:', error);
    }

}
export function _saveHistoryCreditMember(memberid: string, membername: string, userid: string, username: string, credit: number, beforeCredit: number, afterCredit: number, title: string) {
    try {
        const NewMemberHistory = new MemberHistoryCredit({
            Member: {
                id: memberid,
                Username: membername
            },
            User: {
                id: userid,
                Username: username
            },
            Amount: credit,
            BeforeAmount: beforeCredit,
            AfterAmount: afterCredit,
            Transaction: title,
            Date: getDate()
        });
        return NewMemberHistory.save();
    } catch (error) {
        console.error('Error _saveHistoryCreditMember: ', error);
    }

}
export async function _updateCreditMember(memberid: string, credit: number) {
    try {
        const update = await Member.findOneAndUpdate(
            { _id: memberid },
            { $inc: { Amount: credit } },
            { new: true }
        );
        return update;
    } catch (error) {
        throw error;
    }

}