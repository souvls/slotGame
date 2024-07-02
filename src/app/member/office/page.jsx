"use client"
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { FaBahtSign } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
const Spinner = () => {
    return (
        <BeatLoader loading color='#fff' size={15} />
    )
}
const page = () => {
    const [data, setData] = useState([])
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
            await fetch("/api/member/dashboard", requestOptions)
                .then((response) => response.json())
                .then((result) => {

                    if (result.status === 'ok') {
                        setData(result)
                        console.log(result)
                        setLoading(false);
                    } else {
                        setLoading(false);
                        if (result.message === 'notoken') {
                            localStorage.clear();
                            router.push("/member");
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
                <div className=' flex justify-start gap-3'>
                    <p>Dashboard</p>
                </div>
            </div>
            <div className='mt-4'>
                <div className=' grid grid-cols-2  lg:grid-cols-5 gap-5'>
                    <div className='w-full flex justify-between items-center bg-yellow-500 text-white p-4 rounded-lg'>
                        <div>
                            <p className='text-lg'>ເຄດິດ</p>
                            {loading ?
                                <Spinner />
                                :
                                <h1 className='text-2xl font-bold'>{data && data.myInfo ? data.myInfo.Amount.toLocaleString() : 0}</h1>
                            }
                        </div>
                        <FaBahtSign size={50} color='#fff' opacity={0.5} />
                    </div>
                    <div className='w-full flex justify-between items-center bg-blue-500 text-white p-4 rounded-lg'>
                        <div>
                            <p className='text-lg'>ຢູເຊີ</p>
                            {loading ?
                                <Spinner />
                                :
                                <h1 className='text-2xl font-bold'>{data && data.myUsers ? data.myUsers.length : 0}</h1>
                            }
                        </div>
                        <FaPeopleGroup size={50} color='#fff' opacity={0.5} />
                    </div>
                    <div className='w-full flex justify-between items-center bg-green-500 text-white p-4 rounded-lg'>
                        <div>
                            <p className='text-lg'>ລາຍໄດ້</p>
                            {loading ?
                                <Spinner />
                                :
                                <h1 className='text-2xl font-bold'>{0}</h1>
                            }
                        </div>
                        <FaBahtSign size={50} color='#fff' opacity={0.5} />
                    </div>
                    <div className='w-full flex justify-between items-center bg-red-500 text-white p-4 rounded-lg'>
                        <div>
                            <p className='text-lg'>ລາຍຈ່າຍ</p>
                            {loading ?
                                <Spinner />
                                :
                                <h1 className='text-2xl font-bold'>{0}</h1>
                            }
                        </div>
                        <FaBahtSign size={50} color='#fff' opacity={0.5} />
                    </div>
                    <div className='w-full flex justify-between items-center bg-red-500 text-white p-4 rounded-lg'>
                        <div className='w-full'>
                            {/* <p className='text-lg'>ລວມ</p> */}
                            {loading ?
                                <Spinner />
                                :
                                <div>
                                    <p className='text-sm font-bold'>ລາຍໄດ້ລວມ:{0}</p>
                                    <p className='text-sm font-bold'>ຈ່າຍແມ່ {data.myInfo && data.myInfo.PartnersPercent + "%"}= {0}</p>
                                    <p className='text-sm font-bold'>ລາຍໄດ້ໂຕຈິງ= {0}</p>

                                </div>
                            }
                        </div>
                        {/* <FaBahtSign size={50} color='#fff' opacity={0.5} /> */}
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className=' grid grid-cols-2 gap-2'>
                    <div className='w-full border border-yellow-200 bg-white rounded-lg shadow-xl p-3'>
                        <p>ປະຫວັດເຄດິດ</p>
                        {loading ?
                            <Spinner />
                            :
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th><p>ວັນທີ</p></th>
                                        <th><p>ຊື່ຢູເຊີ</p></th>
                                        <th><p>ຈຳນວນ</p></th>
                                        <th><p>ລາຍການ</p></th>
                                    </tr>
                                </thead>
                            </table>
                        }
                    </div>
                    <div className='w-full bg-white rounded-lg shadow-xl p-3'>
                        <p>ປະຫວັດເຄດິດ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page