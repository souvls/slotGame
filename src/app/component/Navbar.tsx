"use client"
import React, { useState } from 'react'
import Image from "next/image";
import AlertMessage from './AlertMessage';
// import logo1 from "../../../public/assets/logo/logo.png"
import logo1 from "../../../public/assets/logo/Designer.jpeg"

const Navbar = () => {
    const [showMessage, setShowMessage] = useState(false)
    return (
        <>
            {showMessage && <AlertMessage message={"ຕິດຕໍ່ເອເຢັນທີ່ເປີດເຊີໃຫ້ເຈົ້າ"} status={true} />}
            <nav className=" w-full py-3 fixed top-0 border-b border-white shadow-lg   bg-black bg-opacity-25 backdrop-blur-sm z-40">
                <div className="px-5 md:px-0 lg:px-0 container lg:w-[960px] m-auto">
                    <div className="flex justify-between items-center">
                        <div className="logo">
                            <div>
                                <Image alt="logo" src={logo1} className='w-[100px] lg:w-[150px]' />
                            </div>
                        </div>
                        <div className="Login grid lg:flex lg:justify-between lg:items-center gap-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="p-2 rounded-lg bg-inherit border border-white text-white"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Password"
                                    className="p-2 rounded-lg bg-inherit border border-white text-white"
                                />
                                <button onClick={() => { setShowMessage(!showMessage)}} className="px-2 h-full absolute right-0 text-white">?</button >
                            </div>
                            <div>
                                <button className='w-full p-2 bg-white text-red-500 rounded-lg font-medium'>LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </>

    )
}

export default Navbar