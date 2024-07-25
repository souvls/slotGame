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
    }, [])

    const fetchGameList = async () => {
        const games = await fetch("/api/user/game-list").then((response) => response.json());
        setGameList(games.provider_games)
    }
    const handdlePlay = async (game) => {
        try {
            setLoadingGame(true);
            const user = await JSON.parse(Cookies.get('userdata'));
            const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
            if (user) {
                const getGMT8TimestampInSeconds = () => {
                    const now = new Date();
                    const timeZoneOffset = 8 * 60;
                    const gmt8Time = new Date(now.getTime() + timeZoneOffset * 60000);
                    return Math.floor(gmt8Time.getTime() / 1000);
                };
                const request_time = getGMT8TimestampInSeconds()
                const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "launchgame" + process.env.NEXT_PUBLIC_OP_CODE);
                const data = {
                    operator_lobby_url: "http://infinity999.com",
                    operator_code: process.env.NEXT_PUBLIC_OP_CODE,
                    member_account: user.username,
                    password: user.password,
                    nickname: user.username,
                    currency: "IDR",
                    game_code: game.game_code,
                    product_code: game.product_code,
                    game_type: game.game_type,
                    language_code: 3,
                    ip: ip.ip,
                    platform: "web",
                    sign: hash,
                    request_time: request_time
                }
                const requestOptions = {
                    method: "POST",
                    headers: { accept: 'application/json' },
                    body: JSON.stringify(data),
                    redirect: "follow"
                };

                fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/launch-game", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        //window.location.href = result.url;
                    })
                    .catch((error) => console.error(error));
            }
            setLoadingGame(false);
        }
        catch (err) {
            //console.log(err)
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

// "?operator_code=H801" +
// "&member_account=INFINITY999" +
// "&agent_account=INFINITY999" +
// "&password=Qwer1234" +
// "&nickname=INFINITY999" +
// "&currency=IDR" +
// "&game_code=1054" +
// "&product_code=1153" +
// "&game_type=SLOT" +
// "&language_code=" + 0 +
// "&ip=10.0.109.190" +
// "&platform=web" +
// "&sign=" + hash+
// "&request_time=" + request_time