import User from '../Models/User';

export async function _findUserLogin(username: string, password: string) {
    try {
        const user = await User.findOne({ Username: username, Password: password });
        return user;
    } catch (error) {
        console.error('Error _findUserLogin', error);
        throw error;
    }
}
export async function _findUserByID(userid: string) {
    try {
        const user = await User.findById(userid);
        return user;
    } catch (error) {
        console.error('Error _findUserLogin', error);
        throw error;
    }
}
export async function _updateIP(userid: string, ip: string) {
    try {
        const update = await User.findByIdAndUpdate(userid, { ip: ip });
        return update;
    } catch (error) {
        console.error('Error _updateIP', error);
        throw error;
    }
}
export async function _updateIsOnline(userid: string) {
    try {
        const update = await User.findByIdAndUpdate(userid, { isOnline: true });
        return update;
    } catch (error) {
        console.error('Error _updateIsOnline', error);
        throw error;
    }
}
export async function _updateIsNotOnline(userid: string) {
    try {
        const update = await User.findByIdAndUpdate(userid, { isOnline: false });
        return update;
    } catch (error) {
        console.error('Error _updateIsNotOnline', error);
        throw error;
    }
}
export async function _findkUsers(memberid: string, idlist: [string]) {
    try {
        const users = await User.find({
            MemberID: memberid, _id: { $in: idlist }
        });
        return users;
    } catch (error) {
        console.error('Error _findkUsers', error);
        throw error;
    }
}
export async function _deletekUsers(memberid: string, idlist: [string]) {
    try {
        const deleted = await User.deleteMany(
            { _id: { $in: idlist }, MemberID: memberid },
            { isOnline: false, status: false },
        );
        return deleted;
    } catch (error) {
        console.error('Error_changeIsOnlineToTrue', error);
        throw error;
    }
}
export async function _blockUsers(memberid: string, idlist: [string]) {
    try {
        const update = await User.updateMany(
            { _id: { $in: idlist }, MemberID: memberid },
            { isOnline: false, status: false },
        );
        return update;
    } catch (error) {
        console.error('Error _blockUsers', error);
        throw error;
    }
}
export async function _unblockUsers(memberid: string, idlist: [string]) {
    try {
        const update = await User.updateMany(
            { _id: { $in: idlist }, MemberID: memberid },
            { isOnline: false, status: true },
        );
        return update;
    } catch (error) {
        console.error('Error _unblockUsers', error);
        throw error;
    }
}
export async function _findUserIdMemBerID(memberid: string, userid: string) {
    try {
        const user = User.findOne({ _id: userid, MemberID: memberid })
        return user;
    } catch (error) {
        console.error('Error findUser users:', error);
        throw error;
    }
}
export async function _updatePassword(memberid: string, userid: string, newpass: string) {
    try {
        const update = await User.findOneAndUpdate(
            { _id: userid, MemberID: memberid },
            { Password: newpass },
            { new: true }
        );
        if (update) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function _findUsers(memberid: string, page: number, numberOfPage: number, orderBy: string) {
    try {
        if (orderBy === "Username") {
            const skip = (page - 1) * numberOfPage;
            const sort: { [key: string]: 1 | -1 } = { [orderBy]: 1 }; // Ascending order by default

            const users = await User.find({ MemberID: memberid })
                .sort(sort)
                .skip(skip)
                .limit(numberOfPage);

            const totalUsers = await User.find({ MemberID: memberid }).countDocuments();
            const totalPages = Math.ceil(totalUsers / numberOfPage);

            return {
                users,
                totalPages,
                currentPage: page,
            };
        } else {
            const skip = (page - 1) * numberOfPage;
            const sort: { [key: string]: 1 | -1 } = { [orderBy]: -1 }; // Ascending order by default

            const users = await User.find({ MemberID: memberid })
                .sort(sort)
                .skip(skip)
                .limit(numberOfPage);

            const totalUsers = await User.find({ MemberID: memberid }).countDocuments();
            const totalPages = Math.ceil(totalUsers / numberOfPage);

            return {
                users,
                totalPages,
                currentPage: page,
            };
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
export async function _searchUsernames(memberID: string, key: string) {
    try {
        const regex = new RegExp(key, 'i'); // 'i' để không phân biệt hoa thường
        const users = await User.find({ MemberID: memberID, Username: regex });
        return { users };
    } catch (err) {
        console.error(err);
    }
}
export async function _checkUserExist(username: string) {
    try {
        const user = await User.findOne({ Username: username });
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
    }
}
export async function _createUser(memberid: string, membername: string, username: string, password: string) {
    try {
        //cretse member
        const user = new User({
            Username: membername + username,
            Password: password,
            Amount: 0,
            MemberID: memberid
        });
        const newUser = await user.save();
        return newUser;
    } catch (err) {
        console.error(err);
    }
}