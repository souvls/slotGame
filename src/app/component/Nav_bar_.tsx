"use client"
import React, { useEffect, useState } from 'react'
import Logout from './Logout';
import Image from 'next/image';
import logo from "../../../public/assets/logo/logo.svg";
import { PiUserCircleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import Cookies from 'js-cookie';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSWR from 'swr';


// const fetcher = (url: string) => fetch(url, {
//     headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem("token"),
//         'Content-Type': 'application/json'
//     }
// }).then(res => res.json());

interface User {
    Amount: Number
    Username: String
}
const Nav_bar_ = () => {
    const [user, setUser] = useState<User>();
    const [ip, setIP] = useState<String>();



    const cookie = Cookies.get("userdata");
    if (cookie) {
        const fetcher = (url: string) => fetch(url).then(res => res.json());
        const fetcher2 = (url: string) => fetch(url,
            {
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(cookie).token,
                }
            }
        ).then(res => res.json());
        const { data: data1, error: error1 } = useSWR("https://api.ipify.org/?format=json", fetcher, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            onSuccess: (fetchedData) => {
                setIP(fetchedData.ip); // อัปเดตสถานะเมื่อดึงข้อมูลสำเร็จ
            },
        });
        const { data: data2, error: error2 } = useSWR("/api/user/my-info?ip=" + ip, fetcher2, {
            refreshInterval: 1000,
            onSuccess: (fetchedData) => {
                if (fetchedData.status === 'ok') {
                    setUser(fetchedData.result)
                }
                if (fetchedData.status === 'no' && fetchedData.meassage === 'logout') {
                    Cookies.remove("userdata");
                    window.location.reload()
                }
            },
        });
        if (error2 || error1) {
            console.log(error1, error2);
        }
    }

    return (
        <nav className='w-full fixed top-0 z-50'>
            <div className=' bg-gradient-to-br from-black to-black border-b-1 via-purple-700'>
                <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto py-4 px-2 lg:px-0 md:px-0'>
                    <div className=' flex justify-between items-center'>
                        <div>
                            <Image src={logo} alt='logo' width={50} />
                        </div>
                        {user ?
                            <div className=' flex justify-end items-center gap-3'>
                                <div className=''>
                                    <div className='flex justify-end items-center gap-2'>
                                        <span className=' text-yellow-300 text-sm'>{user?.Username}</span>
                                        <PiUserCircleBold size={20} color={'gold'} />
                                    </div>
                                    <div className='flex justify-end items-center gap-2'>
                                        <span className=' text-yellow-300 text-sm'>{user?.Amount?.toLocaleString()}</span>
                                        <LiaCoinsSolid size={20} color={'gold'} />
                                    </div>
                                </div>
                                <Logout />
                            </div>
                            :
                            <div className=' flex gap-2'>
                                <Link href={"/user"} className="px-3 flex items-center text-sm  rounded-full duration-500 hover:bg-yellow-400 hover:text-gray-950 bg-gray-950 text-white">
                                    <span>เข้าสู่ละบบ</span>
                                </Link>
                                <Link href={"https://api.whatsapp.com/send?phone=8562098399064"} className="flex items-center px-3 text-sm rounded-full bg-yellow-400">
                                    สมัครสมาชิก
                                </Link>
                                <div className=' flex items-center '>
                                    <img
                                        src="https://cdn-icons-png.freepik.com/512/3973/3973555.png"
                                        alt=""
                                        width={40}
                                    />
                                    <span className=" text-white ">TH</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav_bar_