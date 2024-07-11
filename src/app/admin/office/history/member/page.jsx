"use client"
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
    const router = useRouter();
    const [userList, setUserList] = useState([]);
    const [historyList, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const requestOptions = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                redirect: "follow"
            };
            await fetch("/api/admin/history-credit-member", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    if (result.status === 'ok') {
                        console.log(result)
                        setHistory(result.result)
                        setLoading(false);
                    } else {
                        setLoading(false);
                        if (result.message === 'notoken') {
                            localStorage.clear();
                            router.push("/admin");
                        }
                    }
                })
                .catch((error) => console.error(error));
        }

        fetchdata();

    }, [])
    return (
        <div>
            <div className='w-full p-2 border-b-2'>
                <p>ປະຫວັດເຄດິດເອເຢັ້ນ</p>
            </div>
            <div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" class=" py-3">
                                Date
                            </th>
                            <th scope="col" class="py-3">
                                Username
                            </th>
                            <th scope="col" class="py-3">
                                Credit
                            </th>
                            <th scope="col" class="py-3">
                                Transaction
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ?
                            <>
                                <tr>
                                    <td>
                                        <BeatLoader size={13} loading />
                                    </td>
                                </tr>
                            </>
                            :
                            historyList.length > 0 && historyList.map((item, index) => {
                                return (
                                    <tr key={index} class="bg-white border-b hover:bg-slate-200">
                                        <td class="py-3 ">
                                            <p>{item.Date}</p>
                                        </td>
                                        <td class="">
                                            {item.MemberID && item.MemberID.Username}
                                        </td>
                                        <td class="">
                                            {item.Transaction === 'withdraw' ?
                                                <span className=' text-red-600'>- {item.Amount.toLocaleString() + " THB"}</span> :
                                                <span className=' text-green-500'>{item.Amount.toLocaleString() + "  THB"}</span>
                                            }
                                        </td>
                                        <td class="">
                                            {item.Transaction}
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page