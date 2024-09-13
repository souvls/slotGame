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
const Nav_bar_ = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        const cookie = Cookies.get("userdata")
        if (cookie) {
            const user = JSON.parse(cookie);
            const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());

            const data = JSON.stringify({
                ip: ip.ip
            });
            fetch("/api/user/my-info", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Content-Type': 'application/json'
                },
                body: data,
                redirect: "follow"
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.status === 'no' && result.message === "logout") {
                        Cookies.remove("userdata");
                        Swal.fire({
                            title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                            text: "02011223344",
                            icon: "error",
                            background: '#000000',
                            color: '#ffffff',
                            showConfirmButton: false,
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        setUser(result.result);
                    }
                })
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
                                    <span>LOGIN</span>
                                </Link>
                                <Link href={"https://api.whatsapp.com/send?phone=8562056388013"} className="flex items-center px-3 text-sm rounded-full bg-yellow-400">
                                    JOIN NOW
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