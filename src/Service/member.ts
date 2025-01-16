import { _myHistoryCredit } from "@/Repo/credit_member";
import { _memberInfo } from "@/Repo/member";
import { _getTransactionByMember } from "@/Repo/transaction";

export async function memberInfo(memberid: string) {
    return await _memberInfo(memberid);
}
export async function myHistoryCredit(memberid: string, page: number, numberOfPage: number) {
    return await _myHistoryCredit(memberid, page, numberOfPage);
}
export async function report(agentid: string, page: number, numberOfPage: number) {
    const transactions: any[] = await _getTransactionByMember(agentid);

    const Usertransactions: {
        user_id: string,
        user_name: string,
        totalBet: number,
        totalResult: number
        transactions: any[]
    }[] = [];

    transactions.forEach((item: any) => {
        const index = Usertransactions.findIndex(x => x.user_id === item.member_id);
        if (index !== -1) {
            if (item.transactions.length > 1) {
                Usertransactions[index].totalBet += item.transactions[1].bet_amount
                Usertransactions[index].totalResult += item.transactions[1].amount
                Usertransactions[index].transactions.push(item);
            } else {
                Usertransactions[index].totalBet += item.transactions[0].bet_amount
                Usertransactions[index].totalResult += item.transactions[0].amount
                Usertransactions[index].transactions.push(item);
            }

        } else {
            var bet = 0;
            var result = 0
            if (item.transactions.length > 1) {
                bet = item.transactions[1].bet_amount;
                result = item.transactions[1].amount
            } else {
                bet = item.transactions[0].bet_amount;
                result = item.transactions[0].amount
            }
            Usertransactions.push({
                user_id: item.member_id,
                user_name: item.member_account,
                totalBet: bet,
                totalResult: result,
                transactions: [item]
            });
        }
    });
    const startIndex = (page - 1) * numberOfPage;
    const data = Usertransactions.slice(startIndex, startIndex + page);
    return {
        transactions: data,
        totalPages: Usertransactions.length,
        currentPage: page,
    }
}