import { _myCreditUser, _saveHistoryCreditUser, _updateCreditUser } from "@/Repo/credit_user";
import { _findUsers, _searchUsernames, _checkUserExist, _createUser, _updatePassword, _findUserIdMemBerID, _blockUsers, _unblockUsers, _deletekUsers, _findkUsers, _findUserLogin, _updateIP, _updateIsOnline, _findUserByID, _updateIsNotOnline } from "@/Repo/users";
import { depositCreditUser } from "./credit";
import { _memberInfo, _myCreditMember, _saveHistoryCreditMember, _updateCreditMember } from "@/Repo/credit_member";
const Token = require('../Middleware/Token');

export async function Balance(userid: string, ip: string) {
    const user = await _findUserByID(userid);
    if (user) {
        if (user.status) {
            if (user.ip === ip) {
                return {
                    "code": 0,
                    "message": "",
                    "balance": parseFloat(parseFloat(user.Amount).toFixed(2)),
                }
            }
        }
    }
    _updateIsNotOnline(user._id);
    return {
        "code": 999,
        "message": "logout",
        "balance": 0,
    }

}
export async function Login(username: string, password: string, ip: string) {
    const user = await _findUserLogin(username, password);
    if (user) {
        if (user.status) {
            if (user.ip !== ip) {
                _updateIP(user._id, ip);
            }
            _updateIsOnline(user._id);
            const token = await Token.genToken2(user._id, user.Username, user.Role);
            return {
                status: 'ok',
                message: 'login succes',
                token: token,
                result: {
                    _id: user._id,
                    Username: user.Username,
                    // Password: user.Password,
                    Rold: user.Role
                }
            }
        } else {
            _updateIsNotOnline(user._id);
            return { status: 'no', message: 'ປິດປັບປຸງ' }
        }
    } else {
        return { status: 'no', message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ຜິດ! ກະລຸນາຕິດຕໍ່ ເອເຢັນ' }
    }
}
export async function deletekUsers(memberid: string, idlist: [string]) {
    var total = 0;
    const member = await _memberInfo(memberid);
    //find users
    const users: [] = await _findkUsers(memberid, idlist);
    users.forEach((user: any) => {
        if (user.Amount > 0) {
            total += user.Amount;
        }
    });
    // toback credit to member
    await _updateCreditMember(memberid, total);
    // save history
    await _saveHistoryCreditMember(member._id, member.Username, 'delete', 'delete', total, member.Amount, Number(member.Amount) + Number(total), 'to back');
    //delete user
    await _deletekUsers(memberid, idlist);

    return true
}
export async function blockUsers(memberid: string, idlist: [string]) {
    return await _blockUsers(memberid, idlist);
}
export async function unblockUsers(memberid: string, idlist: [string]) {
    return await _unblockUsers(memberid, idlist);
}
export async function myCreditUser(userid: string) {
    return await _myCreditUser(userid);
}
export async function findUserIdMemBerID(memberid: string, userid: string) {
    return await _findUserIdMemBerID(memberid, userid);
}
export async function updatePasswordUser(memberid: string, userid: string, newpass: string) {
    return await _updatePassword(memberid, userid, newpass);
}
export async function getUsers(memberid: string, page: number, numberOfPage: number, orderBy: string) {
    return await _findUsers(memberid, page, numberOfPage, orderBy);
}
export async function searchUser(memberID: string, key: string) {
    return await _searchUsernames(memberID, key);
}
export async function checkUserExist(username: string) {
    return await _checkUserExist(username);
}
export async function createUser(membername: string, memberid: string, username: string, password: string, credit: number) {
    const isExist = await checkUserExist(membername + username);
    if (!isExist) {
        const newUser = await _createUser(memberid, membername, username, password);
        if (newUser) {
            if (credit > 0) {
                const deopsit = await depositCreditUser(newUser.MemberID, newUser._id, credit);
                if (deopsit) {
                    return deopsit;
                }
            }
            return { code: 0, message: "ເພີ່ມສຳເລັດ" }
        }
        else {
            return { code: 111, message: "ຜິດພາດ" }
        }
    } else {
        return { code: 999, message: "ຊື່ຊ້ຳ" }
    }
}
