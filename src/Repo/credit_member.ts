import Member from '../Models/Member';
import MemberHistoryCredit from '../Models/Member_history_credit'

import { format } from 'date-fns'
const getDate = () => {
    const now = new Date();
    const data = format(now, 'dd/MM/yy HH:mm:ss');
    return data;
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
export async function _saveHistoryCreditMember(memberid: string, username: string, credit: number, beforeCredit: number, afterCredit: number, title: string) {
    try {
        const NewMemberHistory = new MemberHistoryCredit({
            Member: {
                id: memberid,
                Username: username
            },
            Amount: credit,
            BeforeAmount: beforeCredit,
            AfterAmount: afterCredit,
            Transaction: title,
            Date: getDate()
        });
        return await NewMemberHistory.save();
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