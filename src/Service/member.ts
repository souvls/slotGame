import { _myHistoryCredit } from "@/Repo/credit_member";
import { _memberInfo } from "@/Repo/member";

export async function memberInfo(memberid: string) {
    return await _memberInfo(memberid);
}
export async function myHistoryCredit(memberid:string,page:number,numberOfPage:number) {
    return await _myHistoryCredit(memberid,page,numberOfPage); 
}