"use client"
import React, { use, useEffect, useState } from 'react'
import { GiOverInfinity } from "react-icons/gi";
import { PiUserCircleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import '../component/Nav_bar.css'
const Nav_bar = () => {
    const [isLogin, setIsLogin] = useState(false)
    // useEffect(()=>{
    //     const 

    // },[])
    const LoginArea = () => {
        return (
            <div>
                <button className=' bg-yellow-300 text-white p-2 rounded-xl'>Login</button>
            </div>
        )
    }
    const UserInfoArea = () => {
        return (
            <div className='px-5'>
                <div className='flex justify-start items-center gap-2'>
                    <PiUserCircleBold size={20} color={'gold'} />
                    <span className=' text-yellow-300 text-sm'>{process.env.NEXT_PUBLIC_API_NAME}</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <LiaCoinsSolid size={20} color={'gold'} />
                    <span className=' text-yellow-300 text-sm'>1,000,345.34</span>
                </div>
            </div>
        )
    }
    return (
        <nav className=' w-full fixed top-0 z-40'>
            <div className='bg-[#151515] py-2 lg:py-4'>
                <div className=' container mx-auto px-2' style={{maxWidth:"960px"}}>
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