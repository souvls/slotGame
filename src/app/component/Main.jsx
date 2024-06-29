"use client"
import React, { useEffect, useState } from 'react'
import md5 from 'md5';
import { MdSportsSoccer } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { FaGamepad } from "react-icons/fa6";

import cover1 from "../../../public/assets/icon/iconGame/game_card_en-US.webp"
import cover2 from "../../../public/assets/icon/iconGame/game_card_en-US (1).webp"
import cover3 from "../../../public/assets/icon/iconGame/game_card_en-US (2).webp"
import cover4 from "../../../public/assets/icon/iconGame/game_card_en-US (3).webp"
import cover5 from "../../../public/assets/icon/iconGame/game_card_en-US (4).webp"
import cover6 from "../../../public/assets/icon/iconGame/game_card_en-US (5).webp"

import gamingsoftIcon from "../../../public/assets/gameserviecLogo/GS-Logo-hori-min.png"
import covergame from "../../../public/assets/gameserviecLogo/coverGame.jpg"

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
    const [gameList, setGameList] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        //const currentTimestamp =  // Current timestamp in milliseconds
        const request_time = new Date().getTime();
        const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "gamelist" + process.env.NEXT_PUBLIC_OP_CODE);

        const requestOptions = {
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            redirect: "follow"
        };

        await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
            "?product_code=1153" +
            "&operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&game_type=SLOT" +
            "&sign=" + hash +
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setGameList(result)
            })
            .catch((error) => console.error(error));
    }
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
            <div className=' bg-[#0f172a] py-3'>
                <div className=' flex justify-center items-center gap-10'>
                    <Image alt='' src={gamingsoftIcon} />
                </div>
            </div>
            <div className='bg-custom-bg1 bg-cover py-5 px-5 flex justify-start gap-3'>
                <div className='w-[15%] pr-2 border-r-2 border-white'>
                    <p className='py-2 border-2 border-yellow-300 text-white rounded-lg  text-center'>Slot</p>
                </div>
                <div className='w-[85%] h-[800px] overflow-scroll'>
                    <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-4'>
                        {loading ? 'loading' :
                            gameList.map((item) => {
                                return (
                                    <div className=''>
                                        <div className=' rounded-xl overflow-hidden flex justify-center items-center'>
                                            <Image alt='icon' src={covergame} />
                                        </div>
                                        <p className=' text-center text-white font-bold text-xl'>{item.game_name}</p>
                                    </div>
                                )
                            })
                        // category
                        // :
                        // ""
                        // game_code
                        // :
                        // "1054"
                        // game_name
                        // :
                        // "Bomb"
                        // game_type
                        // :
                        // "SLOT"
                        // image_url
                        // :
                        // ""
                        // product_code
                        // :
                        // 1153
                        // product_id
                        // :
                        // 65
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Main