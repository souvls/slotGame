"use client"
import React, { use, useEffect, useState } from 'react'
import { GiOverInfinity } from "react-icons/gi";
import { PiUserCircleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
const Nav_bar = () => {
    const router = useRouter();
    const [user, setUser] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const role = localStorage.getItem("role");
            if (role === 'user') {
                setIsLogin(true);
                fetchdata();
            }
        }

    }, []);
    const fetchdata = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            redirect: "follow"
        };
        fetch("/api/user/my-info", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    setUser(result.result);
                    console.log(result)
                } else if (result.status === 'off') {
                    localStorage.clear();
                    router.push("/");
                }
                else {
                    if (result.message === 'notoken') {
                        localStorage.clear();
                        router.push("/");
                    }
                }
            })
            .catch((error) => console.error(error));
        setLoading(false);
    }
    const LoginArea = () => {
        return (
            <div>
                <button onClick={() => router.push("/user")} className=' bg-yellow-300 text-white p-2 rounded-xl'>Login</button>
            </div>
        )
    }
    const UserInfoArea = () => {
        return (
            <div className='px-5'>
                <div className='flex justify-start items-center gap-2'>
                    <PiUserCircleBold size={20} color={'gold'} />
                    <span className=' text-yellow-300 text-sm'>{loading ? <BeatLoader color='gold' size={10} /> : user && user.Username}</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <LiaCoinsSolid size={20} color={'gold'} />
                    <span className=' text-yellow-300 text-sm'>{loading ? <BeatLoader color='gold' size={10} /> : user && user.Amount&& user.Amount.toLocaleString() + " ฿"}</span>
                </div>
            </div>
        )
    }
    return (
        <nav className=' w-full fixed top-0 z-40'>
            <div className='bg-[#151515] py-2 lg:py-4'>
                <div className=' container mx-auto px-2' style={{ maxWidth: "960px" }}>
                    <div className=' flex justify-between items-center'>
                        <div className=' flex flex-col items-center px-2'>
                            <GiOverInfinity size={30} color={'gold'} />
                            <h1 className=' text-yellow-300 text-sm'> INFINITY SLOT 999</h1>
                        </div>
                        {isLogin ? <UserInfoArea /> : <LoginArea />}
                    </div>
                </div>
            </div>

        </nav>

    )
}


export default Nav_bar