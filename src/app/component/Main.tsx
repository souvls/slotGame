"use client"
import React, { useEffect, useState } from 'react'
import { MdSportsSoccer } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";

import cover1 from "../../../public/assets/icon/iconGame/game_card_en-US.webp"
import cover2 from "../../../public/assets/icon/iconGame/game_card_en-US (1).webp"
import cover3 from "../../../public/assets/icon/iconGame/game_card_en-US (2).webp"
import cover4 from "../../../public/assets/icon/iconGame/game_card_en-US (3).webp"
import cover5 from "../../../public/assets/icon/iconGame/game_card_en-US (4).webp"
import cover6 from "../../../public/assets/icon/iconGame/game_card_en-US (5).webp"
import { title } from 'process';
import Link from 'next/link';
import Image from 'next/image';

const Games = [
    { title: "", cover: cover1, link: "https://www.rsg-games.com/TryGame?lang=th-TH&gameid=112", hot: true },
    { title: "", cover: cover2, link: "https://www.rsg-games.com/TryGame?lang=th-TH&gameid=114", hot: true },
    { title: "", cover: cover3, link: "https://www.rsg-games.com/TryGame?lang=th-TH&gameid=114", hot: false },
    { title: "", cover: cover4, link: "https://www.rsg-games.com/TryGame?lang=th-TH&gameid=111", hot: false },
    { title: "", cover: cover5, link: "https://www.rsg-games.com/TryGame?lang=th-TH&gameid=75", hot: false },
    { title: "", cover: cover6, link: "https://www.rsg-games.com/TryGame?lang=th-TH&gameid=27", hot: false },
]
const Main = () => {
    const [btn1, setBtn1] = useState(true);
    const [btn2, setBtn2] = useState(false);
    const [btn3, setBtn3] = useState(false);

    useEffect(() => {
    }, [])
    const handdleBtn1 = () => {
        setBtn1(true);
        setBtn2(false);
        setBtn3(false);
    }
    const handdleBtn2 = () => {
        setBtn1(false);
        setBtn2(true);
        setBtn3(false);
    }
    const handdleBtn3 = () => {
        setBtn1(false);
        setBtn2(false);
        setBtn3(true);
    }
    return (
        <>
            {/* Category */}
            <div className=' bg-[#0f172a] py-2'>
                <div className=' flex justify-center items-center gap-10'>
                    <div onClick={handdleBtn1} className={` flex flex-col items-center ${btn1 && 'bg-gradient-to-r from-cyan-500 to-blue-500 border border-cyan-400 px-10'}`}>
                        <FaGamepad size={30} color='gold' />
                        <h1 className=' text-white'>
                            SLOT
                        </h1>
                    </div>
                    <div onClick={handdleBtn2} className={` flex flex-col items-center ${btn2 && 'bg-gradient-to-r from-cyan-500 to-blue-500 border border-cyan-400 px-10'}`}>
                        <MdSportsSoccer size={30} color='gold' />
                        <h1 className=' text-white'>
                            SPORT
                        </h1>
                    </div>
                    <div onClick={handdleBtn3} className={` flex flex-col items-center ${btn3 && 'bg-gradient-to-r from-cyan-500 to-blue-500 border border-cyan-400 px-10'}`}>
                        <MdLiveTv size={30} color='gold' />
                        <h1 className=' text-white'>
                            LIVE
                        </h1>
                    </div>
                </div>
            </div>{/* Category */}
            {/* List Game */}
            <div className=' bg-custom-bg1 bg-cover py-5 px-5'>
                <div className=' grid grid-cols-2 gap-5'>
                    {Games.map((item, index) => {
                        return (
                            <Link className=' relative' key={index} href={item.link} target='bank'>
                                <div>
                                    <Image alt="coverGame" src={item.cover} />
                                </div>
                                {item.hot === true &&
                                    <div className=' absolute top-2 left-2'>
                                        <div className='px-4 py-1 bg-gradient-to-r from-red-500 to-pink-500 border border-red-600 rounded-full'>
                                            <span className='text-white'>HOT</span>
                                        </div>
                                    </div>
                                }
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Main