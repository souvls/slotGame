"use client"
import md5 from 'md5';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';

import ShowGameItem from './ShowGameItem';
import products from '@/gamedata/slot/products.json'
import playstar from '@/gamedata/slot/playstar.json'
import pg_soft from '@/gamedata/slot/pg_soft.json'
import pragmatic_play from '@/gamedata/slot/pragmatic_play.json'
import fachai from '@/gamedata/slot/fachai.json'
import jili_tcg from '@/gamedata/slot/jili_tcg.json'
import cq9 from '@/gamedata/slot/cq9.json';
import live_22 from '@/gamedata/slot/live_22.json'
import netent from '@/gamedata/slot/netent.json'
import no_limit_city from '@/gamedata/slot/no_limit_city.json'
import evoplay from '@/gamedata/slot/evoplay.json'
import jdb from '@/gamedata/slot/jdb.json'
import redtiger from '@/gamedata/slot/redtiger.json'
import booming_games from '@/gamedata/slot/booming_games.json'
import wow_gaming from '@/gamedata/slot/wow_gaming.json'
import hacksaw from '@/gamedata/slot/hacksaw.json'
import octoplay from '@/gamedata/slot/octoplay.json'
import rich88 from '@/gamedata/slot/rich88.json'
import smartsoft from '@/gamedata/slot/smartsoft.json'

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


export default function Home() {
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState<Game[]>();
    const [loadingGame, setLoadingGame] = useState(false);
    useEffect(() => {
        const active = localStorage.getItem("slot_active");
        if (active) {
            setProductActive(parseInt(active));
        }
        //setLoadingGame(false);
        //fetchGames(1050);
    }, []);
    useEffect(() => {
        switch (products[productActive].product_name) {
            case "playstar": {
                setGames(playstar); break;
            }
            case "pg_soft": {
                setGames(pg_soft); break;
            }
            case "pragmatic_play": {
                setGames(pragmatic_play); break;
            }
            case "fachai": {
                setGames(fachai); break;
            }
            case "jili_tcg": {
                setGames(jili_tcg); break;
            }
            case "cq9": {
                setGames(cq9); break;
            }
            case "live_22": {
                setGames(live_22); break;
            }
            case "netent": {
                setGames(netent); break;
            }
            case "no_limit_city": {
                setGames(no_limit_city); break;
            }
            case "redtiger": {
                setGames(redtiger); break;
            }
            case "evoplay": {
                setGames(evoplay); break;
            }
            case "jdb": {
                setGames(jdb); break;
            }
            case "booming_games": {
                setGames(booming_games); break;
            }
            case "wow_gaming": {
                setGames(wow_gaming); break;
            }
            case "hacksaw": {
                setGames(hacksaw); break;
            }
            case "octoplay": {
                setGames(octoplay); break;
            }
            case "rich88": {
                setGames(rich88); break;
            }
            case "smartsoft": {
                setGames(smartsoft); break;
            }
            default: {
                setGames([]);
            }
        }
    }, [productActive])
    // const fetchProductList = () => {
    //     const request_time = new Date().getTime();
    //     const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}productlist${process.env.NEXT_PUBLIC_OP_CODE}`);
    //     fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/available-products" +
    //         "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
    //         "&sign=" + hash +
    //         "&request_time=" + request_time)
    //         .then((response) => response.json())
    //         .then(result => {
    //             console.log(result)
    //             // const x = [{}];
    //             // result.forEach((item: any) => {
    //             //     if (item.game_type === "SLOT" && item.status === 'ACTIVATED') {
    //             //         x.push(item)
    //             //     }
    //             // });
    //             // console.log(x);
    //             //setProductList(x);
    //         })
    //         .catch(err => {
    //             throw err
    //         })
    // }
    // const handdlePlay = async (game: any) => {
    //     try {
    //         setLoadingGame(true);
    //         const cookie = Cookies.get("userdata");
    //         if (cookie) {
    //             //const token = JSON.parse(cookie).token;
    //             const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
    //             const myHeaders = new Headers();
    //             myHeaders.append("Content-Type", "application/json");
    //             const request_time = new Date().getTime();

    //             const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}launchgame${process.env.NEXT_PUBLIC_OP_CODE}`);
    //             const raw = {
    //                 "operator_code": process.env.NEXT_PUBLIC_OP_CODE,
    //                 "member_account": JSON.parse(cookie).username,
    //                 "password": JSON.parse(cookie).password,
    //                 "currency": "THB",
    //                 "game_code": game.game_code,
    //                 "product_code": game.product_code,
    //                 "game_type": game.game_type,
    //                 "language_code": 0,
    //                 "ip": ip.ip,
    //                 "platform": "web",
    //                 "sign": hash,
    //                 "request_time": request_time,
    //                 "operator_lobby_url": "http://infinity999.com",
    //             }
    //             fetch(`${process.env.NEXT_PUBLIC_API_NAME}/api/operators/launch-game`, {
    //                 method: "POST",
    //                 headers: myHeaders,
    //                 body: JSON.stringify(raw),
    //                 redirect: "follow"
    //             })
    //                 .then((response) => response.json())
    //                 .then((result) => {
    //                     console.log(result)
    //                     if (result.code === 200) {
    //                         router.push(result.url)
    //                     } else {
    //                         setLoadingGame(false);
    //                         Swal.fire({
    //                             icon: "warning",
    //                             title: "<p>ຂໍອະໄພ</p>",
    //                             html: "<p>ເກມກຳລັງປັບປຸງ</p>"
    //                         })
    //                     }
    //                     setLoadingGame(false);
    //                 }).catch((err) => {
    //                     //Cookies.remove("userdata");
    //                     console.log(err);
    //                     setLoadingGame(false);
    //                     Swal.fire({
    //                         title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
    //                         text: "020 98 399 064",
    //                         icon: "error",
    //                         background: '#000000',
    //                         color: '#ffffff',
    //                         showConfirmButton: false,
    //                     }).then(() => {
    //                         window.location.reload();
    //                     });
    //                 })
    //         } else {
    //             setLoadingGame(false);
    //             Swal.fire({
    //                 title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
    //                 text: "020 98 399 064",
    //                 icon: "error",
    //                 background: '#000000',
    //                 color: '#ffffff',
    //                 showConfirmButton: false,
    //             });
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //         setLoadingGame(false);
    //         Swal.fire({
    //             title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
    //             text: "02011223344",
    //             icon: "error",
    //             background: '#000000',
    //             color: '#ffffff',
    //             showConfirmButton: false,
    //         });
    //     }
    // }
    const handleSelectProduct = (index: number) => {
        localStorage.setItem("slot_active", index.toString());
        setProductActive(index);
    }
    // const fetchGames = async (product_code: any) => {
    //     const request_time = new Date().getTime();
    //     const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}gamelist${process.env.NEXT_PUBLIC_OP_CODE}`);
    //     fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
    //         "?product_code=" + product_code +
    //         "&operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
    //         "&game_type=" + "SLOT" +
    //         "&sign=" + hash +
    //         "&request_time=" + request_time
    //     )
    //         .then((response) => response.json())
    //         .then(result => {
    //             const game = result.provider_games.reduce((acc: any, current: any) => {
    //                 if (current.status === "ACTIVATED" && !acc.find((item: any) => (item.game_name === current.game_name))) {
    //                     acc.push(current);
    //                 }
    //                 return acc;
    //             }, []);

    //             //console.log(game);
    //             // setGames(game);
    //         })
    //         .catch(err => {
    //             throw err
    //         })
    // }
    return (
        <>
            {loadingGame && <Spinner />}
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex border rounded-lg overflow-hidden'>
                    <div className='w-[20%] lg:w-[10%] flex flex-col gap-2 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => handleSelectProduct(index)} className={`bg-white w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden  ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
                                        <Image
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
                    <div className='w-[80%] lg:w-[90%] grid grid-cols-3 lg:grid-cols-4 gap-4 p-5 '>
                        {games && games.map((item: Game, index) => {
                            return (
                                <ShowGameItem key={index} product_name={products[productActive].product_name} game={item} />
                            )

                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
