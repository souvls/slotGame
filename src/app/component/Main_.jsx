"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import md5 from 'md5';
import gamingsoftIcon from "../../../public/assets/gameserviecLogo/GS-Logo-hori-min.png"
import covergame from "../../../public/assets/gameserviecLogo/coverGame.jpg"
import Spinner from './Spinner';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { FaGamepad } from "react-icons/fa6";
import { IoIosFootball } from "react-icons/io";

const Main = () => {
    const [gameList, setGameList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingGame, setLoadingGame] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetchGameList();
        setLoading(false)
    }, []);

    const fetchGameList = async () => {
        const request_time = new Date().getTime();
        const hash = md5(request_time + "pBXXGyr53ekS6CvjwgA5ES" + "gamelist" + "H801");
        await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
            "?product_code=" + 1091 +
            "&operator_code=" + "H801" +
            "&game_type=" + "SLOT" +
            "&sign=" + hash +
            "&request_time=" + request_time)
            .then((response) => response.json())
            .then(result => {
                console.log(result)
                setGameList(result.provider_games)
            })
            .catch(err => {

            })
    }
    const handdlePlay = async (game) => {
        try {
            setLoadingGame(true);
            const user = await JSON.parse(Cookies.get('userdata'));

            if (user) {
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                const getGMT8TimestampInSeconds = () => {
                    const now = new Date();
                    const timeZoneOffset = 8 * 60;
                    const gmt8Time = new Date(now.getTime() + timeZoneOffset * 60000);
                    return Math.floor(gmt8Time.getTime() / 1000);
                };
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const request_time = new Date().getTime();
                const hash = md5(request_time + "pBXXGyr53ekS6CvjwgA5ESlaunchgameH801");
                const raw = JSON.stringify({
                    "operator_code": "H801",
                    "member_account": user.username,
                    "password": user.password,
                    "currency": "IDR",
                    "game_code": game.game_code,
                    "product_code": game.product_code,
                    "game_type": "SLOT",
                    "language_code": 0,
                    "ip": ip.ip,
                    "platform": "web",
                    "sign": hash,
                    "request_time": request_time,
                    "operator_lobby_url": "http://infinity999.com",
                })
                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };
                fetch(process.env.NEXT_PUBLIC_API_NAME+"/api/operators/launch-game", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result)
                        window.location.href = result.url;
                    })
                    .catch((error) => console.error(error));
            }

        }
        catch (err) {
            console.log(err)
            setLoadingGame(false);
            Swal.fire({
                title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                text: "02011223344",
                icon: "error",
                background: '#000000',
                color: '#ffffff',
                showConfirmButton: false,
            });

        }
    }
    return (
        <>
            <div>
                {loadingGame &&
                    <div>
                        <Spinner />
                    </div>
                }
            </div>
            <div className=' bg-[#0f172a] py-3'>
                <div className=' flex justify-center items-center gap-10'>
                    <Image alt='' src={gamingsoftIcon} />
                </div>
            </div>
            <div className='bg-custom-bg1 bg-cover py-5 px-5 flex justify-start gap-3'>
                <div className='w-[15%] pr-2 border-r-2 border-white'>
                    <p className='py-2 border-2 border-yellow-300 text-white rounded-lg  text-center flex justify-center items-center gap-2'><FaGamepad size={20} /><span className=' hidden md:block lg:block'>SLOT</span></p>
                    <p className='mt-3 py-2 border-2 border-yellow-300 text-white rounded-lg  text-center flex justify-center items-center gap-2'><IoIosFootball size={20} /><span className=' hidden md:block lg:block'>FOOTBALL</span></p>
                </div>
                <div className='w-[85%] h-[800px] overflow-scroll'>
                    <div className='w-full grid grid-cols-2 lg:grid-cols-4 gap-4'>
                        {loading ? 'loading' :
                            gameList && gameList.length > 0 && gameList.map((item, index) => {
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
