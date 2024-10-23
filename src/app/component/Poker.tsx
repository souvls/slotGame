"use client"
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const products = [

    {
        "provider": "Spribe",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 92,
        "product_id": 1,
        "product_code": 1138,
        "product_name": "spribe",
        "game_type": "POKER",
        "product_title": "Spribe"
    },

]
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
export default function Home() {
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState([]);
    const [loadingGame, setLoadingGame] = useState(false);
    useEffect(() => {
        fetchGames(1138);
    }, [])
    useEffect(() => {
        fetchGames(products[productActive].product_code);
    }, [productActive])
    const handdlePlay = async (game: any) => {
        try {
            setLoadingGame(true);
            const cookie = Cookies.get("userdata");
            if (cookie) {
                const token = JSON.parse(cookie).token;
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());

                const data = JSON.stringify({
                    game_code: game.game_code,
                    product_code: game.product_code,
                    ip: ip.ip
                });
                fetch("/api/user/playgame", {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    body: data,
                    redirect: "follow"
                })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result)
                        if (result.status === 'no' && result.message === "logout") {
                            Cookies.remove("userdata");
                            setLoadingGame(false);
                            Swal.fire({
                                title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                                text: "020 98 399 064",
                                icon: "error",
                                background: '#000000',
                                color: '#ffffff',
                                showConfirmButton: false,
                            }).then(() => {
                                window.location.reload();
                            });
                        } else {
                            router.push(result.result)
                        }
                    }).catch(() => {
                        Cookies.remove("userdata");
                        setLoadingGame(false);
                        Swal.fire({
                            title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                            text: "020 98 399 064",
                            icon: "error",
                            background: '#000000',
                            color: '#ffffff',
                            showConfirmButton: false,
                        }).then(() => {
                            window.location.reload();
                        });
                    })
            } else {
                setLoadingGame(false);
                Swal.fire({
                    title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                    text: "020 98 399 064",
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
                "&game_type=" + "POKER" +
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
                <div className='flex border rounded-lg overflow-hidden'>
                    <div className='w-[20%] lg:w-[10%] flex flex-col gap-2 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setProductActive(index)} className={`w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
                                        <img
                                            src={`/assets/icon/product/${item.product_name}.png`}
                                            alt={item.product_name} width={100} height={100}
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const img = e.target as HTMLImageElement;
                                                img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                                            }}
                                        />
                                        <p>{item.product_name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-[80%] lg:w-[90%] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 '>
                        {games && games.map((item: Game, index) => {
                            return (
                                <>
                                    {item.status === "ACTIVATED" &&
                                        <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                            <GameItem {...item} />
                                        </div>
                                    }
                                </>

                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
const GameItem: React.FC<Game> = (item: Game) => {
    const [imgSrc, setImageSrc] = useState(item.image_url);
    return (
        <>
            <img
                src={item.image_url}
                alt={item.game_name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const img = e.target as HTMLImageElement;
                    img.src = `/assets/icon/game/${item?.product_code + item?.game_code}.png`
                    img.onerror = null;
                }}
                className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
            />
            <p className=' text-center text-white text-sm'>{item.game_name}</p>
            {/* <h1 className=' text-center text-white'>{item.product_id}</h1>
            <p className=' text-center text-white'>{item.product_code}{item.game_code}</p> */}
        </>
    )
}
