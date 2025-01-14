"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Transaction {
    Member: {
        id: string
        Username: string
    },
    User: {
        id: string
        Username: string
    },
    Amount: number
    BeforeAmount: number
    AfterAmount: number
    Transaction: string
    Date: string
    status: boolean
}

const MyHistoryCredit = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [numOfPage, setNumOfPage] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        fetchdata();
    }, []);
    const fetchdata = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/my-history-credit?page=${currentPage}&numOfPage=${numOfPage}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            setTransactions(res.data.transactions)
            console.log(res);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            throw error
        }
    }
    const onChangePage = async (page: number) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/my-history-credit?page=${page}&numOfPage=${numOfPage}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            setLoading(false);
            setTransactions(res.data.transactions);
            setCurrentPage(page);
        } catch (error) {
            throw error;
        }
    }
    return (
        <div className=' w-[1200px] text-sm'>
            <div>
                <table className=' w-full mt-2'>
                    <thead>
                        <tr className='bg-gray-200 w-full'>
                            <th className=' py-2'>ເວລາ</th>
                            <th>--</th>
                            <th>ຊື່ຢູເຊີ</th>
                            <th>ຍອດເງິນ</th>
                            <th>ເງິນກ່ອນໜ້າ</th>
                            <th>ເງິນປັດຈຸບັນ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr
                                key={index}
                                className={`hover:bg-blue-200 ${index % 2 !== 0 && 'bg-slate-100'}`}
                            >
                                <td className='py-2 border text-center'>{transaction.Date}</td>
                                <td className='py-2 border text-center'>{transaction.Transaction}</td>
                                <td className='py-2 border text-center'>{transaction.User.Username}</td>
                                <td className='py-2 border text-end pe-2'>{transaction.Amount.toLocaleString()}</td>
                                <td className='py-2 border text-end pe-2'>{transaction.BeforeAmount.toLocaleString()}</td>
                                <td className='py-2 border text-end pe-2'>{transaction.AfterAmount.toLocaleString()}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=' p-5 mt-3 flex justify-between text-sm'>
                <div className='w-full'>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button disabled={loading} onClick={() => onChangePage(i + 1)} key={i} className={`p-2 me-2 ${currentPage === i + 1 && 'bg-blue-500  text-white'} border rounded-lg`}>{i + 1}</button>
                    ))}
                </div>
            </div>
            {loading && 'Loading...'}
            
        </div>
    )
}

export default MyHistoryCredit