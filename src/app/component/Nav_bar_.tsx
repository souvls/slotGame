"use client"
// import React, { useEffect, useState } from 'react'
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
import { useEffect, useState } from 'react';


interface User {
    Amount: Number
    Username: String
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Nav_bar_ = () => {
    const [Username, setUsername] = useState("");
    const [Token, setToken] = useState("");
    useEffect(() => {
        const cookie = Cookies.get("userdata");
        if (cookie) {
            const username = JSON.parse(cookie).username;
            const token = JSON.parse(cookie).token;
            setUsername(username);
            setToken(token);
            console.log(username)
        }
    }, [])

    if (Username != "") {
        return (
            <nav className='w-full fixed top-0 z-50'>
                <div className=' bg-gradient-to-br from-black to-black border-b-1 via-purple-700'>
                    <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto py-4 px-2 lg:px-0 md:px-0'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <Image src={logo} alt='logo' width={50} />
                            </div>
                            <div className=' flex justify-end items-center gap-3'>
                                <div className=''>

                                    <div className='flex justify-end items-center gap-2'>
                                        <span className=' text-yellow-300 text-sm'>{Username}</span>
                                        <PiUserCircleBold size={20} color={'gold'} />
                                    </div>
                                    <div className='flex justify-end items-center gap-2'>
                                        <span className=' text-yellow-300 text-sm'><Balance Token={Token} /></span>
                                        <LiaCoinsSolid size={20} color={'gold'} />
                                    </div>
                                </div>
                                <Logout />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className='w-full fixed top-0 z-50'>
                <div className=' bg-gradient-to-br from-black to-black border-b-1 via-purple-700'>
                    <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto py-4 px-2 lg:px-0 md:px-0'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <Image src={logo} alt='logo' width={50} />
                            </div>
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
                        </div>
                    </div>
                </div>
            </nav>
        )

    }
}
interface Props {
    Token: string
}
const Balance: React.FC<Props> = (Token) => {

    const fetcher2 = (url: string) =>
        fetch(url, {
            headers: { Authorization: `Bearer ${Token.Token}` },
        }).then(res => res.json());

    const { data: ipData, error: ipError } = useSWR("https://api.ipify.org/?format=json", fetcher);

    const { data: balanceData, error: balanceError } = useSWR(ipData ? `/api/user/balance?ip=${ipData.ip}` : null, fetcher2,
        { refreshInterval: 1000 }
    );
    if (!balanceData) {
        return (
            <>
                {0}
            </>
        )
    }
    if (balanceData) {
        return (
            <>
                {balanceData?.balance.toLocaleString()}
            </>
        )
    }
}

export default Nav_bar_