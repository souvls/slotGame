"use client"
import React, { useEffect, useState } from 'react'
import md5 from 'md5';
import gamingsoftIcon from "../../../public/assets/gameserviecLogo/GS-Logo-hori-min.png"
import covergame from "../../../public/assets/gameserviecLogo/coverGame.jpg"
import Image from 'next/image';

const Main = () => {
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
            "&sign=" + hash+
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setGameList(result)
            })
            .catch((error) => console.error(error));
    }
    const handdlePlay = async (game) => {
        console.log(game)
        const request_time = new Date().getTime();
        const hash = md5(request_time + "pBXXGyr53ekS6CvjwgA5ES" + "launchgame" + "H801");
        const requestOptions = {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            //redirect: "follow"
        };

        await fetch(process.env.NEXT_PUBLIC_API_NAME+"/api/operators/launch-game" +
            "?operator_code=H801" +
            "&member_account=INFINITY999" +
            "&agent_account=INFINITY999" +
            "&password=Qwer1234" +
            "&nickname=INFINITY999" +
            "&currency=IDR" +
            "&game_code=1054" +
            "&product_code=1153" +
            "&game_type=SLOT" +
            "&language_code=" + 0 +
            "&ip=10.0.109.190" +
            "&platform=web" +
            "&sign=" + hash+
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                //setGameList(result)
            })
            .catch((error) => console.error(error));
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
                            gameList.length>0&&gameList.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => handdlePlay(item)} className=''>
                                        <div className=' rounded-xl overflow-hidden flex justify-center items-center'>
                                            <Image alt='icon' src={covergame} />
                                        </div>
                                        <p className=' text-center text-white font-bold text-xl'>{item.game_name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Main