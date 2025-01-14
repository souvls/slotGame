import { _memberInfo, _myCreditMember, _saveHistoryCreditMember, _updateCreditMember } from "@/Repo/credit_member";
import { _getAlldHistorCreditUser, _saveHistoryCreditUser, _updateCreditUser, _updateCreditUsers } from "@/Repo/credit_user";
import { findUserIdMemBerID } from "./user";


export async function getHistoryCredit(memberid: string, userid: string, numberOfPage: number, page: number) {
   return await _getAlldHistorCreditUser(memberid, userid, numberOfPage, page);
}
export async function depositCreditUser(memberid: string, userid: string, credit: number) {
   const title = 'deposit';
   const member = await _memberInfo(memberid);
   if (member.Amount >= credit) {
      const user = await findUserIdMemBerID(memberid, userid);
      if (user) {
         //deposit
         const newBalance = await _updateCreditUser(memberid, userid, credit);
         if (newBalance) {
            //update credit member
            await _updateCreditMember(memberid, -credit);
            await _saveHistoryCreditMember(memberid, member.Username, user._id, user.Username, credit, member.Amount, member.Amount - credit, 'deposit user');
            await _saveHistoryCreditUser(memberid, userid, user.Username, credit, user.Amount, newBalance.Amount, title);
            return { code: 0, message: "ເຕີມເງິນສຳເລັດ" }
         }
      } else {
         return { code: 333, message: "ບໍ່ມີຢູເຊີນີ້!" }
      }
   } else {
      return { code: 222, message: "ເຄດິດບໍ່ພໍ" }
   }
}
export async function withdrawCreditUser(memberid: string, userid: string, credit: number) {
   //check crdit member
   const title = 'withdraw';

   const user = await findUserIdMemBerID(memberid, userid);
   const member = await _memberInfo(memberid);
   if (user) {
      if (user.Amount >= credit) {
         //deposit
         const newBalance = await _updateCreditUser(memberid, userid, -credit);
         if (newBalance) {
            //update credit member
            await _updateCreditMember(memberid, credit);
            await _saveHistoryCreditMember(memberid, member.Username, user._id, user.Username, credit, member.Amount, Number(member.Amount) + Number(credit), 'withdraw user');
            await _saveHistoryCreditUser(memberid, userid, user.Username, credit, user.Amount, newBalance.Amount, title);
            return { code: 0, message: "ຖອນເງິນສຳເລັດ" }
         }
      } else {
         return { code: 222, message: "ເຄດິດບໍ່ພໍ" }
      }

   } else {
      return { code: 333, message: "ບໍ່ມີຢູເຊີນີ້!" }
   }
}