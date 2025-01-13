import { _memberInfo } from "@/Repo/member";

export async function memberInfo(memberid: string) {
    return _memberInfo(memberid);
}