"use client"
import React, { useState } from 'react'
import { GiSloth } from "react-icons/gi";
import { MdCasino } from "react-icons/md";

import GameSlot from './GameSlot';
import LiveCasino from './LiveCasino';
const menu = [
    // { path: "#", icon: <AiOutlineHome />, label: "หน้าแลก" },
    // { path: "#", icon: <CiMobile3 />, label: "มือถือ" },
    // { path: "#", icon: <MdOutlineSportsSoccer />, label: "กีฬา", },
    // { path: "#", icon: <IoGameController />, label: "อีสปอร์ต", },

    { title: "slot", icon: <GiSloth />, label: "สล็อต" },
    { title: "casino", icon: <MdCasino />, label: "คาสิโน" },
    // { path: "#", icon: <IoFishOutline />, label: "ปลา" },
    // { title: "#", icon: <RiVipCrownLine />, label: "วีไอพี" },
    // { title: "#", icon: <CiGift />, label: "โปรโมชั่น" },
];
const MenuGameType = () => {
    const [selectGame, setSelectGame] = useState("slot");
    const handleSelect = (title: string) => {
        setSelectGame(title);
    }
    return (
        <>
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto border-b '>
                <div className=' w-[90%] py-3 mx-auto flex justify-center items-center gap-8 '>
                    {menu.map((item, index) => {
                        return (
                            <button key={index} onClick={() => handleSelect(item.title)} className={`flex flex-col items-center ${item.title === selectGame ? 'text-yellow-400' : 'text-yellow-200'} duration-500 transform hover:scale-125  hover:text-yellow-300 font-bold `}>
                                <span className='text-[40px] lg:text-[50px]'>{item.icon}</span>
                                {item.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            {selectGame === "slot" && <GameSlot />}
            {selectGame === "casino" && <LiveCasino/>}


        </>
    )
}

export default MenuGameType