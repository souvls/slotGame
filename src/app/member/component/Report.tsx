"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Report = () => {
    const [showFrame, setShowFrame] = useState(false);
    const [frameUrl, setFrameUrl] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [numOfPage, setNumOfPage] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [transactions, setTransactions] = useState<any[]>([]);
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/api/member/report?page=1&numberOfPage=20',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.request(config)
            .then((response) => {
                console.log(response)
                setTransactions(response.data.transactions)
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    const onChangePage = async (page: number) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `/api/member/report?page=${page}&numberOfPage=20`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };
        axios.request(config)
            .then((response) => {
                setTransactions(response.data.transactions)
                setCurrentPage(response.data.currentPage)
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className=' w-[1200px] text-sm'>
            <table className=' w-full mt-2'>
                <thead>
                    <tr className='bg-gray-200 w-full'>
                        <th>ຊື່ຢູເຊີ້</th>
                        <th>ລວມເງິນເດີມພັນ</th>
                        <th>ໄດ້/ເສຍ</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.user_name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className=' p-5 mt-3 flex justify-between text-sm'>
                <div className='w-full'>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button disabled={loading} onClick={() => onChangePage(i + 1)} key={i} className={`p-2 me-2 ${currentPage === i + 1 && 'bg-blue-500  text-white'} border rounded-lg`}>{i + 1}</button>
                    ))}
                </div>
            </div>
            {loading && 'Loading...'}
        </div>
        // <div >
        //     <a
        //         href="#"

        //         onMouseEnter={handleMouseEnter}
        //         onMouseLeave={handleMouseLeave}
        //     >
        //         Hover over me
        //     </a>
        //     {showFrame && (
        //         <div >
        //             <iframe src={frameUrl} />
        //         </div>
        //     )}
        // </div>
    );
}

export default Report