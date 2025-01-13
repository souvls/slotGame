'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import CopyText from './CopyText';
import { timestampToDate } from '@/lib/dateFormat';
interface User {
    "_id": string
    "Username": string
    "Password": string
    "Amount": number,
    "Role": string
    "isOnline": boolean,
    "status": boolean,
    "createdAt": string
    "updatedAt": string
}
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';

const AddNewUser = dynamic(() => import('./AddNewUser'), {
    ssr: false,
});
const EditUser = dynamic(() => import('./EditUser'), {
    ssr: false,
});
const UserList = () => {
    const [useridList, setUserIdList] = useState<string[]>([]);
    const [updateUserList, setUpdateUserList] = useState<boolean>(false);
    const [btnAddNewUser, setBtnAddNewUser] = useState<boolean>(false);
    const [btnEditUser, setBtnEditUser] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [keySearch, setKeySearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [orderBy, setOrderBy] = useState<string>('Username');
    const [numOfPage, setNumOfPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [users, setUsers] = React.useState<User[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isCheckedInPage, setIsCheckedInPage] = useState<boolean>(false);
    useEffect(() => {
        fetchUsers();
    }, [])
    useEffect(() => {
        setKeySearch('');
    }, [orderBy, numOfPage])
    useEffect(() => {
        fetchUsers();
        setUpdateUserList(false);
    }, [updateUserList])
    const fetchUsers = async () => {
        const currentPage = localStorage.getItem('member_currentPage');
        const orderBy = localStorage.getItem('member_orderBy');
        const numOfPage = localStorage.getItem('member_numOfPage');

        if (orderBy) {
            setOrderBy(orderBy);
        }
        if (numOfPage) {
            setNumOfPage(Number(numOfPage));
        }
        if (currentPage) {
            setCurrentPage(Number(currentPage));
        }
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/users?page=${currentPage}&numOfPage=${numOfPage}&orderBy=${orderBy}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            if (res.data) {
                setUsers(res.data.users);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = "/member"
            throw error;

        }
    }
    const handleClearUserList = () =>{
        setUserIdList([]);
        setIsCheckedInPage(false);
    }
    const handleBlock = async (user: User) => {
        Swal.fire({
            title: "ບລ໋ອກ ຢູເຊີ ?",
            html: "=> " + user.Username + " ຈະຖືກປິດແລະເດ້ງອອກຈາກເກມທັນທີ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ບລ໋ອກ",
            confirmButtonColor: "red"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axios.post("/api/member/block-users", {
                        idlist: [user._id]
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                    setLoading(false);
                    if (res.data.code === 0) {
                        fetchUsers();
                        Swal.fire({
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                } catch (error) {
                    Swal.showValidationMessage(`
                      Request failed: ${error}
                    `);
                }
            }
        });
    }
    const handleUnBlock = async (user: User) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/member/unblock-users", {
                idlist: [user._id]
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            setLoading(false);
            if (res.data.code === 0) {
                fetchUsers();
            }
        } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
        }
    }
    const handleDelete = (user: User) => {
        Swal.fire({
            title: "ລົບຢູເຊີ ?",
            html: "ຢູເຊີ " + user.Username + " ຈະຖືກລົບ <br/> => ເຄດິດຖືກໂອນກັບໃຫ້ເອເຢັ້ນ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ລົບ",
            confirmButtonColor: "red"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axios.post("/api/member/delete-users", {
                        idlist: [user._id]
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                    setLoading(false);

                    if (res.data.code === 0) {
                        Swal.fire({
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000
                        })
                        fetchUsers();
                    }
                } catch (error) {
                    Swal.showValidationMessage(`
                      Request failed: ${error}
                    `);
                }
            }
        });
    }
    const handleDeposit = (user: User) => {
        Swal.fire({
            title: "ເຕີມເງິນ",
            html: `
                <p>ຊື່ເຊີ: ${user.Username}</p>
                <p>ເຄດິດ: ${user.Amount.toLocaleString()}</p>
                <p> => ເຄດິດ ເອເຢັ້ນ ຈະຖືກຫັກຕາມຈຳນວນເຕີມ</p>`,
            input: "number",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "ເຕີມເງິນ",
            showLoaderOnConfirm: true,
            preConfirm: async (credit) => {
                if (credit) {
                    try {
                        setLoading(true);
                        const res = await axios.post("/api/member/deposit-credit", {
                            id: user._id, credit: credit
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        });
                    setLoading(false);
                        return res.data;
                    } catch (error) {
                        Swal.showValidationMessage(`
                          Request failed: ${error}
                        `);
                    }
                } else {
                    Swal.showValidationMessage(`
                     ຈຳນວນເງິນບໍ່ຖືກຕ້ອງ
                    `);
                }

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value.code === 0) {
                    fetchUsers();
                    Swal.fire({
                        title: result.value.message,
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: result.value.message,
                        icon: "error"
                    });
                }

            }
        });
    }
    const handleWithdraw = (user: User) => {
        Swal.fire({
            title: "ຖອນເງິນ",
            html: `
                <p>ຊື່ເຊີ: ${user.Username}</p>
                <p>ເຄດິດ: ${user.Amount.toLocaleString()}</p>
                <p> => ເຄດິດ ເອເຢັ້ນ ຈະເພີ່ມຕາມຈຳນວນຖອນ</p>`,
            input: "number",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "ຖອນເງິນ",
            confirmButtonColor: "red",
            showLoaderOnConfirm: true,
            preConfirm: async (credit) => {
                if (credit) {
                    try {
                        setLoading(true);
                        const res = await axios.post("/api/member/withdraw-credit", {
                            id: user._id, credit: credit
                        }, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        });
                        setLoading(false);
                        return res.data;
                    } catch (error) {
                        Swal.showValidationMessage(`
                          Request failed: ${error}
                        `);
                    }
                } else {
                    Swal.showValidationMessage(`
                     ຈຳນວນເງິນບໍ່ຖືກຕ້ອງ
                    `);
                }

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result)
                if (result.value.code === 0) {
                    fetchUsers();
                    Swal.fire({
                        title: result.value.message,
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: result.value.message,
                        icon: "error"
                    });
                }

            }
        });
    }
    const onCancel = () => {
        setEditingUser(null);
        setBtnEditUser(false);
    }
    const handdleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            fetchUsers();
        }
        setKeySearch(e.target.value);
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/search-users?key=${e.target.value}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            if (res.data) {
                console.log(res.data);
                setUsers(res.data.users);
                setTotalPages(0);
            }
        } catch (error) {
            throw error;
        }
    }
    const onChangeNumOfPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumOfPage(Number(e.target.value));
    }
    const handdleSetNumOfPage = () => {
        localStorage.setItem('member_numOfPage', numOfPage.toString());
        localStorage.setItem('member_currentPage', '1');
        fetchUsers();
        setUserIdList([]);
        setIsCheckedInPage(false);
    }
    const selectOrderBy = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderBy(e.target.value);
        localStorage.setItem('member_orderBy', e.target.value);
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/users?page=${currentPage}&numOfPage=${numOfPage}&orderBy=${e.target.value}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            if (res.data) {
                setUsers(res.data.users);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
            }
        } catch (error) {
            throw error;
        }
    }
    const onChangePage = async (page: number) => {
        setCurrentPage(page);
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/users?page=${page}&numOfPage=${numOfPage}&orderBy=${orderBy}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            if (res.data) {
                setUsers(res.data.users);
                setTotalPages(res.data.totalPages);
                setCurrentPage(res.data.currentPage);
                localStorage.setItem('member_currentPage', res.data.currentPage);
            }
        } catch (error) {
            throw error;
        }
    }
    const handleCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserIdList([...useridList, e.target.value]);
    }
    const handleUnCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserIdList(useridList.filter(x => x !== e.target.value));
    }
    const isChecked = (id: string) => {
        const exits = useridList.find(x => x === id);
        return exits ? true : false;
    }
    const handleCheckedInPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedInPage(e.target.checked);
        if (e.target.checked) {
            users.forEach(x => {
                const index = useridList.find(c => c === x._id);
                if (!index) {
                    useridList.push(x._id);

                }
            })
        } else {
            setUserIdList([]);
        }
    }
    const handleDeleteMany = () => {
        Swal.fire({
            title: "ລົບຫຼາຍຢູເຊີ ?",
            html: "=> ເຄດິດທັງໝົດຖືກໂອນກັບໃຫ້ເອເຢັ້ນ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ລົບ",
            confirmButtonColor: "red"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axios.post("/api/member/delete-users", {
                        idlist: useridList
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                    setLoading(false);
                    if (res.data.code === 0) {
                        fetchUsers();
                        Swal.fire({
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                } catch (error) {
                    Swal.showValidationMessage(`
                      Request failed: ${error}
                    `);
                }
            }
        });
    }
    const handleBlockMany = () => {
        Swal.fire({
            title: "ບລ໋ອກ ຢູເຊີ ?",
            html: "=> ຢູເຊີທີ່ເລືອກ ຈະຖືກປິດແລະເດ້ງອອກຈາກເກມທັນທີ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "ບລ໋ອກ",
            confirmButtonColor: "red"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axios.post("/api/member/block-users", {
                        idlist: useridList
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    });
                    setLoading(false);
                    if (res.data.code === 0) {
                        fetchUsers();
                        Swal.fire({
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                } catch (error) {
                    Swal.showValidationMessage(`
                      Request failed: ${error}
                    `);
                }
            }
        });
    }
    return (
        <div className=' w-[1200px] text-sm'>
            <div className='w-full bg-blue-300 px-2 flex justify-start items-center gap-2'>
                <div className=' flex items-center gap-2'>
                    <span>ຄົນຫາຊື່ຢູເຊີ້</span>
                    <input type="text" value={keySearch} onChange={handdleSearch} className='text-sm p-2' />
                </div>
                ---
                <div className=' flex items-center gap-2'>
                    <span>ຈັດລຽງ</span>
                    <select
                        onChange={selectOrderBy}
                        value={orderBy}
                    >
                        <option value={'createdAt'}>ວັນທີເພີ່ມ</option>
                        <option value={'Username'}>ຊື່ຢູເຊີ້</option>
                        <option value={'Amount'}>ຈຳນວນເງິນ</option>
                        <option value={'IsOnline'}>online</option>
                        <option value={'status'}>status</option>
                    </select>
                </div>
                ---
                <div className=' flex items-center gap-2'>
                    <span>ຈຳນວນເຊີຕໍ່ໜ້າ</span>
                    <div>
                        <input
                            type="number"
                            value={numOfPage}
                            onChange={onChangeNumOfPage}
                            className='text-sm p-2 w-16'
                        />
                        <button onClick={handdleSetNumOfPage} className=' bg-white border border-black p-2'>set</button>
                    </div>

                </div>
                ---
                <div className=' flex items-center'>
                    <button
                        onClick={() => {
                            setBtnAddNewUser(!btnAddNewUser)
                            setBtnEditUser(false);
                        }}
                        className=' bg-green-600 text-white border border-black p-2'>ເພີ່ມໃໝ່</button>
                </div>
            </div>
            {btnAddNewUser && <AddNewUser setUpdateUserList={setUpdateUserList} />}
            {btnEditUser && editingUser &&
                <EditUser
                    key={editingUser._id}
                    setUpdateUserList={setUpdateUserList}
                    user={editingUser}
                    onCancel={onCancel}
                />
            }
            {users.length <= 0 && <p className=' mt-4 text-center'>ບໍ່ມີເຊີ</p>}
            <div className=' w-full text-sm'>
                <div className='mt-4 flex justify-end items-center gap-5'>
                    {
                        useridList.length > 0 &&
                        <span onClick={handleClearUserList} className=' cursor-pointer'>ເຄຍ {useridList.length} ຢູເຊີ ທີ່ເລືອກ</span>
                    }
                    {(isCheckedInPage || useridList.length > 0) &&
                        <div className=' flex gap-2'>
                            {/* <button className=' rounded-lg bg-green-500 text-white p-2'>ເຕີມ</button>
                            <button className=' rounded-lg bg-yellow-500 text-white p-2'>ຖອນ</button> */}
                            <button onClick={handleBlockMany} className=' rounded-lg bg-violet-500 text-white p-2'>ປິດ</button>
                            <button onClick={handleDeleteMany} className=' rounded-lg bg-red-500 text-white p-2'>ລົບ</button>
                        </div>
                    }
                    <div className='flex items-center gap-1'>
                        <span>ເລືອກໜ້ານີ້ {isCheckedInPage && useridList.length > 0 && useridList.length}</span>
                        <input
                            type='checkbox'
                            onChange={handleCheckedInPage}
                            checked={isCheckedInPage}
                        />
                    </div>

                    {/* <div className='flex items-center gap-1'>
                        <span>ເລືອກທັງໝົດ</span>
                        <input
                            type='checkbox'
                            onChange={handleCheckedAll}
                            checked={isCheckedAll}
                        />
                    </div> */}
                </div>
                <table className=' w-full mt-2'>
                    <thead>
                        <tr className='bg-gray-200 w-full'>
                            <th className=' py-2'>ຊື່ຢູເຊີ້</th>
                            <th>ລະຫັດ</th>
                            <th>ຍອດເງິນ</th>
                            <th>ວັນທີເພີ່ມ</th>
                            <th>ສະຖານະ</th>
                            <th>ຟັງຊັ່ນ</th>
                            <th>--</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    setSelectedUser(user._id)
                                }}
                                className={` hover:bg-blue-200 ${selectedUser === user._id ? 'bg-blue-300' : 'bg-gray-100'}`}>
                                <td className='border py-2 flex justify-center gap-3 items-center'>
                                    {user.isOnline ?
                                        <span className='bg-green-500 text-white px-2'>{user.Username}</span> :
                                        <span className='bg-gray-200 text-black px-2'>{user.Username}</span>
                                    }
                                    <CopyText Username={user.Username.toString()} Password={user.Password} />
                                </td>
                                <td className=' border text-center'>{user.Password}</td>
                                <td className=' border text-start p-2 '>
                                    <div className='flex justify-between items-center'>
                                        {user.Amount.toLocaleString()}
                                        <span className=' text-gray-500 text-[10px]'>THB</span>
                                    </div>
                                </td>
                                <td className=' border text-center'>{timestampToDate(user.createdAt)}</td>
                                <td className=' border text-center'>{user.status ? <span className=''>online</span> : <span className=' bg-red-600 text-white'>offline</span>}</td>
                                <td className=' border ps-2'>
                                    {user.status ?
                                        <button onClick={() => handleBlock(user)} className=' text-blue-700 mx-2'>ບ໋ອກ</button> :
                                        <button onClick={() => handleUnBlock(user)} className=' text-blue-700 mx-2'>ເປີດ</button>
                                    } /
                                    <button
                                        className=' text-blue-700 mx-2'
                                        onClick={
                                            () => {
                                                setEditingUser(user);
                                                setBtnEditUser(true)
                                                setBtnAddNewUser(false);
                                            }
                                        }
                                    >
                                        ແກ້ໄຂຂໍ້ມູນ
                                    </button>/
                                    <Link href={`/member/office/history/credit_user?id=${user._id}`} className=' text-blue-700 mx-2'>ປະຫວັດເຄດິດ</Link>/
                                    <Link href={`/member/office/history/game_user?id=${user._id}`} className=' text-blue-700 mx-2'>ປະຫວັດເກມ</Link>/
                                    <button onClick={() => handleDeposit(user)} className=' text-blue-700 mx-2'>ເຕີມເງິນ</button>/
                                    <button onClick={() => handleWithdraw(user)} className=' text-blue-700 mx-2'>ຖອນເງິນ</button>/
                                    <button onClick={() => handleDelete(user)} className=' text-red-300 mx-2'>ລົບ</button>
                                </td>
                                <td>
                                    {isChecked(user._id) ?
                                        <input
                                            type="checkbox"
                                            value={user._id}
                                            checked={true}
                                            onChange={handleUnCheckbox}
                                        /> :
                                        <input
                                            type="checkbox"
                                            value={user._id}
                                            checked={false}
                                            onChange={handleCheckbox}
                                        />
                                    }

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className=' p-5 mt-3 flex justify-between text-sm'>
                <div className=' w-[20%]'>
                    <span className=' bg-green-500 p-2'>ອອນລາຍ</span>
                    <span className=' bg-gray-200 p-2'>ອັອຟລາຍ</span>
                </div>
                <div className='w-full'>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button disabled={loading} onClick={() => onChangePage(i + 1)} key={i} className={`p-2 me-2 ${currentPage === i + 1 && 'bg-blue-500  text-white'} border rounded-lg`}>{i + 1}</button>
                    ))}
                </div>
            </div>
            {loading && <div className='text-center'>loading...</div>}
        </div>
    )
}

export default UserList