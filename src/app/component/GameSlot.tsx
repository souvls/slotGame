"use client"
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import productList from '@/lib/ProductList'

// interface Product {
//     provider: string,
//     currency: string,
//     status: string,
//     provider_id: number,
//     product_id: number,
//     product_code: number,
//     product_name: string,
//     game_type: string
// }
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
const products = [
    {
        "provider": "PlayStar",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 42,
        "product_id": 1174,
        "product_code": 1050,
        "product_name": "playstar",
        "game_type": "SLOT"
    },
    {
        "provider": "PG Soft",
        "currency": "EUR",
        "status": "ACTIVATED",
        "provider_id": 31,
        "product_id": 1141,
        "product_code": 1007,
        "product_name": "pg_soft",
        "game_type": "SLOT"
    },
    {
        "provider": "PragmaticPlay",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 32,
        "product_id": 1185,
        "product_code": 1006,
        "product_name": "pragmatic_play",
        "game_type": "SLOT"
    },
    {
        "provider": "Fachai",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 113,
        "product_id": 1245,
        "product_code": 1079,
        "product_name": "fachai",
        "game_type": "SLOT"
    },
    {
        "provider": "Jili",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 48,
        "product_id": 1144,
        "product_code": 1091,
        "product_name": "jili_tcg",
        "game_type": "SLOT"
    },
    {
        "provider": "CQ9",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 47,
        "product_id": 1186,
        "product_code": 1009,
        "product_name": "cq9",
        "game_type": "SLOT"
    },
    {
        "provider": "Live22",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 11,
        "product_id": 1237,
        "product_code": 1018,
        "product_name": "live_22",
        "game_type": "SLOT"
    },
    {
        "provider": "Evolution",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 29,
        "product_id": 1252,
        "product_code": 1168,
        "product_name": "netent",
        "game_type": "SLOT"
    },
    {
        "provider": "Evolution",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 29,
        "product_id": 1250,
        "product_code": 1166,
        "product_name": "no_limit_city",
        "game_type": "SLOT"
    },
    {
        "provider": "Evolution",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 29,
        "product_id": 1253,
        "product_code": 1169,
        "product_name": "redtiger",
        "game_type": "SLOT"
    },

    {
        "provider": "EVOPLAY",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 38,
        "product_id": 1228,
        "product_code": 1049,
        "product_name": "evoplay",
        "game_type": "SLOT"
    },
    {
        "provider": "JDB",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 41,
        "product_id": 1194,
        "product_code": 1085,
        "product_name": "jdb",
        "game_type": "SLOT"
    },

 
    {
        "provider": "BoomingGames",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 68,
        "product_id": 1280,
        "product_code": 1115,
        "product_name": "booming_games",
        "game_type": "SLOT"
    },
    {
        "provider": "WOW GAMING",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 101,
        "product_id": 1177,
        "product_code": 1148,
        "product_name": "wow_gaming",
        "game_type": "SLOT"
    },
    {
        "provider": "HACKSAW",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 105,
        "product_id": 1230,
        "product_code": 1153,
        "product_name": "hacksaw",
        "game_type": "SLOT"
    },

    {
        "provider": "N2",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 115,
        "product_id": 1247,
        "product_code": 1162,
        "product_name": "octoplay",
        "game_type": "SLOT"
    },

    {
        "provider": "Rich88",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 124,
        "product_id": 1277,
        "product_code": 1184,
        "product_name": "rich88",
        "game_type": "SLOT"
    },
    {
        "provider": "SmartSoft",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 118,
        "product_id": 1256,
        "product_code": 1170,
        "product_name": "smartsoft",
        "game_type": "SLOT"
    },
];


export default function Home() {
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState([]);
    const [loadingGame, setLoadingGame] = useState(false);
    useEffect(() => {
        setLoadingGame(false);
        fetchGames(1050);
    }, [])
    useEffect(() => {
        fetchGames(products[productActive].product_code);
        //fetchProductList();
    }, [productActive])
    const fetchProductList = () => {
        const request_time = new Date().getTime();
        const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}productlist${process.env.NEXT_PUBLIC_OP_CODE}`);
        fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/available-products" +
            "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&sign=" + hash +
            "&request_time=" + request_time)
            .then((response) => response.json())
            .then(result => {
                const x = [{}];
                result.forEach((item: any) => {
                    if (item.game_type === "SLOT" && item.currency === "THB" && item.status === 'ACTIVATED') {
                        x.push(item)
                    }
                });
                console.log(x);
                //setProductList(x);
            })
            .catch(err => {
                throw err
            })
    }
    const handdlePlay = async (game: any) => {
        try {
            setLoadingGame(true);
            const cookie = Cookies.get("userdata");
            if (cookie) {
                //const token = JSON.parse(cookie).token;
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const request_time = new Date().getTime();

                const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}launchgame${process.env.NEXT_PUBLIC_OP_CODE}`);
                const raw = {
                    "operator_code": process.env.NEXT_PUBLIC_OP_CODE,
                    "member_account": JSON.parse(cookie).username,
                    "password": process.env.NEXT_PUBLIC_PASS,
                    "currency": "THB",
                    "game_code": game.game_code,
                    "product_code": game.product_code,
                    "game_type": game.game_type,
                    "language_code": 0,
                    "ip": ip.ip,
                    "platform": "web",
                    "sign": hash,
                    "request_time": request_time,
                    "operator_lobby_url": "http://infinity999.com",
                }
                fetch("https://production.gsimw.com/api/operators/launch-game", {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(raw),
                    redirect: "follow"
                })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result)

                        if (result.code === 200) {
                            router.push(result.url)
                        } else {
                            setLoadingGame(false);
                            Swal.fire({
                                icon: "warning",
                                title: "<p>ຂໍອະໄພ</p>",
                                html: "<p>ເກມກຳລັງປັບປຸງ</p>"

                                // title: result.message
                            })
                        }
                        setLoadingGame(false);
                    }).catch((err) => {
                        //Cookies.remove("userdata");
                        console.log(err);
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
                "&game_type=" + "SLOT" +
                "&sign=" + hash +
                "&request_time=" + request_time)
                .then((response) => response.json())
                .then(result => {
                    // console.log(result)
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
                                    <div key={index} onClick={() => setProductActive(index)} className={`bg-white w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden  ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
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
                            // console.log(item)
                            if (item.status === "ACTIVATED") {
                                return (
                                    <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                        <GameItem {...item} />
                                    </div>
                                )
                                // if (
                                //     // CQ9
                                //     item.game_name != "FruitKing" && 
                                //     item.game_name != "Fly Out" && 
                                //     item.game_name != "Diamond Treasure" &&
                                //     item.game_name != "Zuma Wild" &&
                                //     item.game_name != "Disco Night M" &&
                                //     item.game_name != "Move n' Jump" &&
                                //     item.game_name != "Gu Gu Gu 2 M" &&
                                //     item.game_name != "Six Candy" &&
                                //     item.game_name != "TreasureHouse" &&
                                //     item.game_name != "Zeus M"

                                // ) {
                                //     return (
                                //         <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                //             <GameItem {...item} />
                                //         </div>
                                //     )
                                // }
                                // if (item.support_currency.includes("THB")) {
                                //     return (
                                //         <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                //             <GameItem {...item} />
                                //         </div>
                                //     )
                                // }
                            }

                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
const GameItem: React.FC<Game> = (item: Game) => {
    return (
        <>
            <img
                src={item.image_url}
                alt={item.game_name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const img = e.target as HTMLImageElement;
                    img.src = `/assets/icon/game/${item?.product_code + item?.game_code}.png`
                    //img.src = `/assets/icon/product/booming_games.png`

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
