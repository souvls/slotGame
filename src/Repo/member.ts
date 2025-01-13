import Member from "@/Models/Member";

export async function _memberInfo(memberid: string) {
    try {
        const member = await Member.findById(memberid)
            .select("Name")
            .select("Username")
            .select("Amount");
        return member

    } catch (error) {
        console.error('Error _update credit Users', error);
        return false;
    }

}