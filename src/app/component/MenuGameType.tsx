"use client"
import React, { useEffect, useState } from 'react'
import Slot_icon from '../../../public/assets/icon/game_type/slot_hover.png';
import Casino_icon from '../../../public/assets/icon/game_type/chip_hover.png';
import Poker_icon from '../../../public/assets/icon/game_type/cart_hover.png';
import Fish_icon from '../../../public/assets/icon/game_type/fish.png';
// import Promotion_icon from '../../../public/assets/icon/game_type/promotion.png';
import Football_icon from '../../../public/assets/icon/game_type/football.png';
import Image from 'next/image';
import GameSlot from './GameSlot';
import LiveCasino from './LiveCasino';
import Poker from './Poker';
import Fishing from './Fishing';
import Fooball from './Football';
import ShowGameItem from './ShowGameItem';
const menu = [
    { title: "slot", icon: Slot_icon, label: "สล็อต" },
    { title: "casino", icon: Casino_icon, label: "คาสิโน" },
    { title: "poker", icon: Poker_icon, label: "โป๊กเกอร์" },
    { title: "fishing", icon: Fish_icon, label: "ยิงปลา" },
    { title: "football", icon: Football_icon, label: "ฟุตบอล" },
];
interface Game {
    game_code: string,
    game_name: string,
    game_type: string,
    image_url: string,
    product_code: number,
    product_id: number,
    status: string,
    support_currency: string,
}
const MenuGameType = () => {
    const [selectGame, setSelectGame] = useState("slot");
    const [gameHistory, setgGmeHistory] = useState<Game[]>();
    useEffect(() => {
        const x = localStorage.getItem("game_type_active");
        const y = localStorage.getItem("game_history");
        const gameHistory: Game[] = y ? JSON.parse(y) : [];
        setgGmeHistory(gameHistory);
        if (x) {
            setSelectGame(x);
        }
    }, [])
    const handleSelect = (title: string) => {
        setSelectGame(title);
        localStorage.setItem("game_type_active", title);
    }
    return (
        <>
            <div className='w-full lg:w-[50%] px-3 py-3 mx-auto flex justify-center items-center gap-8 '>
                {menu.map((item, index) => {
                    return (
                        <div key={index} onClick={() => handleSelect(item.title)} className={`flex flex-col items-center duration-500 transform hover:scale-125 hover:text-yellow-300 font-bold `}>
                            <Image className={`${item.title === selectGame ? 'w-[50px] lg:w-[70px]' : 'w-[20px] lg:w-[40px]'}   `} alt="icon" src={item.icon} />
                            <h1 className={` text-[8px] lg:text-lg ${item.title === selectGame ? 'text-yellow-400' : 'text-yellow-200'}`}>{item.label}</h1>
                        </div>
                    )
                })}
            </div>
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex justify-center items-center gap-2 lg:gap-5 mb-2 px-2'>
                    {gameHistory && gameHistory.map((item, index) => {
                        if (item?.game_code) {
                            return (
                                <div key={index} className='p-2 w-20 h-24 bg-red-500 rounded-lg hover:bg-yellow-300'>
                                    <ShowGameItem product_name={""} game={item} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            {selectGame === "slot" && <GameSlot />}
            {selectGame === "casino" && <LiveCasino />}
            {selectGame === "poker" && <Poker />}
            {selectGame === "fishing" && <Fishing />}
            {selectGame === "football" && <Fooball />}

        </>
    )
}

export default MenuGameType