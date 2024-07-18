"use client"
import React, { useEffect, useState } from 'react'
import md5 from 'md5';
import gamingsoftIcon from "../../../public/assets/gameserviecLogo/GS-Logo-hori-min.png"
import covergame from "../../../public/assets/gameserviecLogo/coverGame.jpg"
import Image from 'next/image';
import Swal from 'sweetalert2';
import Link from 'next/link';
const Main = () => {
    const [gameList, setGameList] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = () => {
        const request_time = new Date().getTime();
        const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "gamelist" + process.env.NEXT_PUBLIC_OP_CODE);
        const requestOptions = {
            method: "GET",
            accept: 'application/json',
            redirect: "follow"
        };
        fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
            "?product_code=1153" +
            "&operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&game_type=SLOT" +
            "&sign=" + hash +
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGameList(result.provider_games)
            })
            .catch((error) => console.error(error));
    }
    const handdlePlay = async (game) => {
        const token = localStorage.getItem("token");
        if (token) {
            const role = localStorage.getItem("role");
            if (role === 'user') {

                const user = JSON.parse(localStorage.getItem("data"));
                console.log(user)
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
                    member_account: user.Username,
                    password: user.Password,
                    nickname: user.Username,
                    currency: "IDR",
                    game_code: game.game_code,
                    product_code: game.product_code,
                    game_type: game.game_type,
                    language_code: 0,
                    ip: "10.0.170.40",
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
                        console.log(result);
                        window.open(result.url, '_blank');
                    })
                    .catch((error) => console.error(error));
            } else {
                Swal.fire({
                    title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                    text: "02011223344",
                    icon: "error",
                    background: '#000000',
                    color: '#ffffff',
                    showConfirmButton: false,
                });
            }
        } else {
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
    console.log(gameList)
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
                        {/* <Link href={"testgame"} className=' bg-green-500 b-2 rounded-lg'>
                            <p className=' text-center text-white'>GAME TEST</p>
                        </Link> */}
                        {loading ? 'loading' :
                            gameList.length > 0 && gameList.map((item, index) => {
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