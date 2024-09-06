"use client"
import md5 from 'md5';
import useSWR from 'swr'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Spinner from './Spinner';
const products = [
    {
        "provider": "Jili",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 48,
        "product_id": 6,
        "product_code": 1091,
        "product_name": "jili_tcg",
        "game_type": "SLOT"
    },
    {
        "provider": "JDB",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 41,
        "product_id": 57,
        "product_code": 1085,
        "product_name": "jdb",
        "game_type": "SLOT"
    },
    {
        "provider": "PlayStar",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 42,
        "product_id": 37,
        "product_code": 1050,
        "product_name": "playstar",
        "game_type": "SLOT"
    },
    {
        "provider": "WOW GAMING",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 101,
        "product_id": 40,
        "product_code": 1148,
        "product_name": "wow_gaming",
        "game_type": "SLOT"
    },
    {
        "provider": "HACKSAW",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 105,
        "product_id": 65,
        "product_code": 1153,
        "product_name": "hacksaw",
        "game_type": "SLOT"
    },
    {
        "provider": "Live22",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 11,
        "product_id": 72,
        "product_code": 1018,
        "product_name": "live_22",
        "game_type": "SLOT",
    },
    {
        "provider": "PragmaticPlay",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 32,
        "product_id": 50,
        "product_code": 1006,
        "product_name": "pragmatic_play",
        "game_type": "SLOT"
    }
]
export default function Home() {
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState([]);
    const [loadingGame, setLoadingGame] = useState(false);
    useEffect(() => {
        fetchGames(1018);
    }, [])
    useEffect(() => {
        fetchGames(products[productActive].product_code)
    }, [productActive])
    // const fetchProductList = () => {
    //   const request_time = new Date().getTime();
    //   const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}productlist${process.env.NEXT_PUBLIC_OP_CODE}`);
    //   fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/available-products" +
    //     "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
    //     "&sign=" + hash +
    //     "&request_time=" + request_time)
    //     .then((response) => response.json())
    //     .then(result => {
    //       console.log(result)
    //       setProductList(result);
    //     })
    //     .catch(err => {
    //       throw err
    //     })
    // }
    const handdlePlay = async (game: any) => {
        try {
            setLoadingGame(true);
            const cookie = Cookies.get("userdata");
            console.log(cookie)
            if (cookie) {
                const user = await JSON.parse(cookie);
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const request_time = new Date().getTime();
                const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}launchgame${process.env.NEXT_PUBLIC_OP_CODE}`);
                const raw = JSON.stringify({
                    "operator_code": process.env.NEXT_PUBLIC_OP_CODE,
                    "member_account": user.username,
                    "password": user.password,
                    "currency": "IDR",
                    "game_code": game.game_code,
                    "product_code": game.product_code,
                    "game_type": "SLOT",
                    "language_code": 3,
                    "ip": ip.ip,
                    "platform": "web",
                    "sign": hash,
                    "request_time": request_time,
                    "operator_lobby_url": "http://infinity999.com",
                })
                fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/launch-game", {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                })
                    .then((response) => response.json())
                    .then((result) => {
                        // console.log(raw)
                        console.log(result)
                        //window.location.href = result.url;
                    })
                    .catch((error) => console.error(error));
            } else {
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
    const fetchGames = async (product_code: any) => {
        for (const i of products) {
            const request_time = new Date().getTime();
            const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}gamelist${process.env.NEXT_PUBLIC_OP_CODE}`);
            fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
                "?product_code=" + product_code +
                "&operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
                "&game_type=" + "SLOT" +
                "&sign=" + hash +
                "&request_time=" + request_time)
                .then((response) => response.json())
                .then(result => {
                    console.log(result)
                    setGames(result.provider_games);
                })
                .catch(err => {
                    throw err
                })
        }
    }
    return (
        <>
            {loadingGame && <Spinner />}
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex'>
                    <div className='w-[20%] lg:w-[10%] flex flex-col gap-2 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setProductActive(index)} className={`w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
                                        <img src={`/assets/icon/product/${item.product_name}.png`} alt='..' width={100} height={100} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-[80%] lg:w-[90%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 max-h-[600px] overflow-scroll'>
                        {games.map((item: any, index) => {
                            return (
                                <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                    <img
                                        src={`/assets/icon/game/${item?.product_code + item?.game_code}.png`}
                                        alt='..'
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const img = e.target as HTMLImageElement;
                                            img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                                            img.src = `/assets/icon/product/${products[productActive].product_name}.png`;
                                        }}
                                        className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
                                    />
                                    <h1 className=' text-center text-white'>{item.game_name}</h1>
                                    {/* <p className=' text-center text-white'>{item.product_code}</p>
                                    <p className=' text-center text-white'>{item.game_code}</p> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}