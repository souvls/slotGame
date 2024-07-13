"use client"
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import md5 from 'md5';
import { format } from 'date-fns'
const getDateString = (date) => {
    const data = format(date, 'dd/MM/yy HH:mm:ss');
    return data;
}
const page = () => {
    const router = useRouter();
    const [wagerList, setWagerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        setLoading(true);
        const now = new Date();
        const request_time = now.getTime();
        const yesterday = new Date(request_time - 86400000);
        setDateStart(yesterday.toISOString().substr(0, 10));
        setDateEnd(now.toISOString().substr(0, 10));
        console.log(request_time)
        const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "getwagers" + process.env.NEXT_PUBLIC_OP_CODE);

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/wagers" +
            "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&start=" + yesterday.getTime() +
            "&end=" + request_time +
            "&sign=" + hash +
            "&request_time=" + request_time

            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setWagerList(result.wagers.reverse());
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }
    const handdleSearchDate = () => {
        setLoading(true);
        const now = new Date();
        const request_time = now.getTime();
        const s = new Date(dateStart).getTime();
        const e = new Date(dateEnd).getTime();
        console.log(s)
        const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "getwagers" + process.env.NEXT_PUBLIC_OP_CODE);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/wagers" +
            "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&start=" + s +
            "&end=" + e +
            "&sign=" + hash +
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                //console.log(result);
                setWagerList(result.wagers.reverse());
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }
    const hanndleSearchToDay = () => {
        fetchdata();
    }
    const hanndleSearchAll = () => {
        setLoading(true);
        const now = new Date();
        const request_time = now.getTime();
        const s = new Date(dateStart).getTime();
        const e = new Date(dateEnd).getTime();
        console.log(s)
        const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "getwagers" + process.env.NEXT_PUBLIC_OP_CODE);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/wagers" +
            "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&sign=" + hash +
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setWagerList(result.wagers.reverse());
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
            <div className='w-full p-2 border-b-2'>
                <p>ປະຫວັດເຄດິດຢູເຊີ້</p>
            </div>
            <div>
                <div className='my-5 flex justify-between items-center'>
                    <div className=' flex justify-start gap-2 items-center'>
                        <input
                            type='date'
                            value={dateStart}
                            onChange={e => setDateStart(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type='date'
                            value={dateEnd}
                            onChange={e => setDateEnd(e.target.value)}
                        />
                        <button onClick={handdleSearchDate} className=' bg-blue-500 p-2 text-white rounded-lg'><p>ຄົ້ນຫາ</p></button>
                    </div>
                    <div>
                        <div className=' flex justify-start gap-3'>
                            <button onClick={hanndleSearchToDay} className=' bg-blue-500 p-2 text-white rounded-lg'><p>ມື້ນີ້</p></button>
                            <button onClick={hanndleSearchAll} className=' bg-blue-500 p-2 text-white rounded-lg'><p>ທັງໝົດ</p></button>
                        </div>
                    </div>
                </div>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="w-full sticky top-0 text-xs bg-slate-900 text-white">
                        <tr>
                            <th scope="col" class=" py-3">
                                ID
                            </th>
                            <th scope="col" class=" py-3">
                                Date
                            </th>
                            <th scope="col" class="py-3">
                                User_name
                            </th>
                            <th scope="col" class="py-3">
                                Game
                            </th>
                            <th scope="col" class="py-3">
                                bet_amount
                            </th>
                            <th scope="col" class="py-3">
                                prized_amount
                            </th>
                            <th scope="col" class="py-3">

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
                            wagerList && wagerList.length > 0 && wagerList.reverse().map((item, index) => {
                                return (
                                    <Wagger key={index} {...item}></Wagger>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
const Wagger = (item) => {
    const [isWin, setIsWin] = useState(false);
    useEffect(() => {
        if (item.bet_amount <= item.prized_amount) {
            setIsWin(true);
        }
    })
    return (
        <tr class={`border-b ${isWin ? 'bg-green-500 text-white hover:bg-green-800' : 'bg-red-500 text-white hover:bg-red-800'}`}>
            <td class="py-2 ">
                {item.id}
            </td>
            <td class="py-2 ">
                {getDateString(item.created_at)}
            </td>
            <td class="py-2 ">
                {item.member_account}
            </td>
            <td class="py-2 ">
                {item.game_type + "_" + item.product_name + "_" + item.game_code}</td>
            <td class="py-2 ">
                {item.bet_amount.toLocaleString()}
            </td>
            <td class="py-2 ">
                {item.prized_amount.toLocaleString()}
            </td>
            <td class="py-2 ">
                {(item.prized_amount - item.bet_amount).toLocaleString()}
            </td>


        </tr>
    )
}

export default page