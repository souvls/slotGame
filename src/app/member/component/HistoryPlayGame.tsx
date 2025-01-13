"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'

interface Transaction {
    User: {
        id: string
        Username: string
        MemberID: string
    }
    Amount: number
    BeforeAmount: number
    AfterAmount: number
    Transaction: string
    Date: string
    status: boolean
}
const HistoryPlayGame = () => {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');

    const [loading, setLoading] = useState<boolean>(false);
    const [numOfPage, setNumOfPage] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>();
    const onChangePage = async (page: number) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/history-credit-user?id=${id}&numberOfPage=${numOfPage}&page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            setLoading(false);
            setTransactions(res.data.transaction);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage)
        } catch (error) {
            throw error;
        }
    }
    return (
        <Suspense>
            <div className=' w-[1200px] text-sm'>
                <div className=' w-full text-sm'>
                    <table className=' w-full mt-2'>
                        <thead>
                            <tr className='bg-gray-200 w-full'>
                                <th>ວັນທີ</th>
                                <th className=' py-2'>ຊື່ຢູເຊີ້</th>
                                <th>ປະເພດ</th>
                                <th>ຈຳນວນເງິນ</th>
                                <th>ກ່ອນ</th>
                                <th>ຫຼັງ</th>
                                {/* <th>ສະຖານະ</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.length === 0 ?
                                <tr>
                                    <td colSpan={6} className=' text-center py-2'>ບໍ່ມີລາຍການເຕີມຖອນ</td>
                                </tr>
                                :
                                transactions?.map((transaction, index) => {
                                    return (
                                        <tr key={index} className={`hover:bg-blue-200 ${index % 2 !== 0 && 'bg-slate-100'}`}>
                                            <td className='border py-2 text-center'>
                                                {transaction.Date}
                                            </td>
                                            <td className='border py-2 text-center'>
                                                {transaction.User.Username}
                                            </td>
                                            <td className='border py-2 text-center'>
                                                {transaction.Transaction === 'deposit' ?
                                                    <span className=' text-green-500'>ຝາກ</span>
                                                    :
                                                    <span className=' text-red-500'>ຖອນ</span>


                                                }
                                            </td>
                                            <td className='border py-2 text-start ps-2'>
                                                {transaction.Amount.toLocaleString()}
                                            </td>
                                            <td className='border py-2 text-start ps-2'>
                                                {transaction.BeforeAmount.toLocaleString()}
                                            </td>
                                            <td className='border py-2 text-start ps-2'>
                                                {transaction.AfterAmount.toLocaleString()}
                                            </td>
                                            {/* <td className='border py-2 text-center'>
                                                    {transaction.status && <span>ສຳເລັດ</span>}
                                                </td> */}
                                        </tr>
                                    )
                                })
                            }
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
                {loading && <div className='text-center'>loading...</div>}
            </div>
        </Suspense>
    )
}

export default HistoryPlayGame