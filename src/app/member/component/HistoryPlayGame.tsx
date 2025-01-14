"use client"
import { parseTimestamp, timestampToDate } from '@/lib/dateFormat';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

interface Wagger {
    "id": string
    "amount": number
    "bet_amount": number
    "valid_bet_amount": number
    "prize_amount": number
    "tip_amount": number
    "action": string
    "wager_code": string
    "wager_status": string
    "payload": [],
    "settled_at": number
    "game_code": string
}
interface Transaction {
    member_account: string
    operator_code: string
    before_balance: number
    balance: number
    product_code: number
    game_type: string
    request_time: string
    sign: string
    currency: string
    createdAt: string
    transactions: Wagger[]
}
const HistoryPlayGame = () => {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const realtime = searchParams?.get('realtime');
    const [loading, setLoading] = useState<boolean>(false);
    const [numOfPage, setNumOfPage] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>();
    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/history-playgame?id=${id}&numberOfPage=${numOfPage}&page=${currentPage}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            setLoading(false)
            // console.log(res)
            setTransactions(res.data.transaction);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage)
        } catch (error) {
            throw error;
        }
    }
    const onChangePage = async (page: number) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/member/history-playgame?id=${id}&numberOfPage=${numOfPage}&page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            setLoading(false);
            console.log(res)
            setTransactions(res.data.transaction);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage)
        } catch (error) {
            throw error;
        }
    }
    const resultTotal = () => {
        var total = 0;
        transactions?.forEach(x => {
            if (x.transactions.length > 1) {
                total += x.transactions[1].amount
            } else {
                total += x.transactions[0].amount
            }
        })
        return total;
    }
    const betTotal = () => {
        var total = 0;
        transactions?.forEach(x => {
            if (x.transactions.length > 1) {
                total += x.transactions[1].bet_amount
            } else {
                total += x.transactions[0].bet_amount
            }
        })
        return total;
    }
    return (
        <Suspense>
            <div className=' w-[1200px] text-sm'>
                {loading && 'Loading...'}
                <div className=' mt-3 ps-3'>
                    <span>ຈຳນວນເດີມພັນ: <span className=' font-bold'>{betTotal().toLocaleString()}{" THB"}</span> </span>
                    <span>, ຜົນໄດ້ເສຍ: <span className=' font-bold'>{resultTotal().toLocaleString()}{" THB"}</span> </span>
                </div>
                <div className=' w-full text-sm'>
                    <table className=' w-full mt-2'>
                        <thead>
                            <tr className='bg-gray-200 w-full'>
                                <th className=' py-2'>ເວລາ</th>
                                <th>ຊື່ຢູເຊີ້</th>
                                <th>game_type</th>
                                <th>product_code</th>
                                <th>game_code</th>
                                <th>ເງິນເດີມພັນ</th>
                                <th>ໄດ້/ເສຍ</th>
                                <th>ເງິນກ່ອນໜ້າ</th>
                                <th>ເງິນປັດຈຸບັນ</th>
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
                                            <td className=' text-center boder border-2'>{timestampToDate(transaction.createdAt)}</td>
                                            <td className=' text-center boder border-2'>{transaction.member_account}</td>
                                            <td className=' text-center boder border-2'>{transaction.game_type}</td>
                                            <td className=' text-center boder border-2'>{transaction.product_code}</td>
                                            {
                                                transaction.transactions.length > 1 ?
                                                    <td className=' text-center boder border-2'>{transaction.transactions[1].game_code}</td>
                                                    :
                                                    <td className=' text-center boder border-2'>{transaction.transactions[0].game_code}</td>
                                            }
                                            {
                                                transaction.transactions.length > 1 ?
                                                    <td className=' text-right pe-2 boder border-2'>{transaction.transactions[1].bet_amount.toLocaleString()}</td>
                                                    :
                                                    <td className=' text-right pe-2 boder border-2'>{transaction.transactions[0].bet_amount.toLocaleString()}</td>
                                            }
                                            {
                                                transaction.transactions.length > 1 ?
                                                    <td
                                                        className={`text-end pe-2 boder border-2 
                                                            ${transaction.transactions[1].bet_amount < transaction.transactions[1].amount ? 'text-red-500' : 'text-green-500'}`}
                                                    >
                                                        {transaction.transactions[1].amount}
                                                    </td>
                                                    :
                                                    <td className={`text-end pe-2 boder border-2 
                                                        ${transaction.transactions[0].bet_amount < transaction.transactions[0].amount ? 'text-red-500' : 'text-green-500'}`}
                                                    >
                                                        {transaction.transactions[0].amount}
                                                    </td>
                                            }
                                            {
                                                transaction.transactions.length > 1 ?
                                                    <td className=' text-right pe-2 boder border-2'>{(transaction.before_balance).toLocaleString()}</td>

                                                    :
                                                    <td className=' text-right pe-2 boder border-2'>{(transaction.before_balance + transaction.transactions[0].bet_amount).toLocaleString()}</td>

                                            }

                                            <td className=' text-right pe-2 boder border-2'>{transaction.balance.toLocaleString()}</td>
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