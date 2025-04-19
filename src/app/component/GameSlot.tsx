"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';

import ShowGameItem from './ShowGameItem';
import products from '@/gamedata/slot/products.json'
// import playstar from '@/gamedata/slot/playstar.json'
// import pg_soft from '@/gamedata/slot/pg_soft.json'
// import pg_soft2 from '@/gamedata/slot/pg_soft2.json'
// import pragmatic_play from '@/gamedata/slot/pragmatic_play.json'
// import fachai from '@/gamedata/slot/fachai.json'
// import jili_tcg from '@/gamedata/slot/jili_tcg.json'
// import cq9 from '@/gamedata/slot/cq9.json';
// import live_22 from '@/gamedata/slot/live_22.json'
// import netent from '@/gamedata/slot/netent.json'
// import no_limit_city from '@/gamedata/slot/no_limit_city.json'
// import evoplay from '@/gamedata/slot/evoplay.json'
// import jdb from '@/gamedata/slot/jdb.json'
// import redtiger from '@/gamedata/slot/redtiger.json'
// import booming_games from '@/gamedata/slot/booming_games.json'
// import wow_gaming from '@/gamedata/slot/wow_gaming.json'
// import hacksaw from '@/gamedata/slot/hacksaw.json'
// import octoplay from '@/gamedata/slot/octoplay.json'
// import rich88 from '@/gamedata/slot/rich88.json'
// import smartsoft from '@/gamedata/slot/smartsoft.json'
// import ShowGameItemAMB from './ShowGameItemAMB';
import axios from 'axios';
import { getGames } from '@/action/GSC';


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
    const [games, setGames] = useState<Game[]>([]);
    const [loadingGame, setLoadingGame] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const active = localStorage.getItem("slot_active");
        if (active) {
            setProductActive(parseInt(active));
        }

        fetchGames();
        //setLoadingGame(false);
        //fetchGames(1050);
    }, []);
    const fetchGames = async () => {
        const data = await getGames(products[productActive].product_code, "SLOT", 0, 36);
        setPage(data?.pagination?.offset);
        setTotalPage(data?.pagination?.total);
        setGames(data?.provider_games);
        // console.log(data);
    }
    const handleSelectProduct = async (index: number) => {
        localStorage.setItem("slot_active", index.toString());
        setProductActive(index);
        const data = await getGames(products[index].product_code, "SLOT", 0, 36);
        setPage(data?.pagination?.offset);
        setTotalPage(data?.pagination?.total);
        setGames(data?.provider_games);
    }

    const handdleLoadMore = async () => {
        const data = await getGames(products[productActive].product_code, "SLOT", page + 1, 36);
        setPage(data?.pagination?.offset);
        setTotalPage(data?.pagination?.total);
        setGames(prev => [...prev, ...data?.provider_games]);
        console.log(data);
    }
    // const getGameItem = async (product_code: Number) => {
    //     try {
    //         setLoadingGame(true);
    //         const res = await axios.get("/api/gameItem?product_code=" + product_code)
    //         console.log(res.data);
    //         setGames(res.data?.provider_games);
    //         setLoadingGame(false);
    //     } catch (error) {
    //         setLoadingGame(false);
    //         throw error;
    //     }
    // }

    return (
        <>
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex border rounded-lg overflow-hidden'>
                    <div className='w-[20%] lg:w-[10%] flex flex-col gap-2 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => {
                                            handleSelectProduct(index);
                                        }}
                                        className={`bg-white w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden  ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
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
                    <div>
                        <div className=' w-full grid grid-cols-3 lg:grid-cols-4 gap-4 p-5 '>
                            {games && games?.map((item: Game, index) => {
                                return (
                                    <ShowGameItem
                                        key={index}
                                        product_code={products[productActive]?.product_code}
                                        product_name={products[productActive]?.product_name}
                                        game={item}
                                    />
                                )
                            })}
                        </div>
                        {page < totalPage &&
                            <div className='flex justify-center items-center mb-2'>
                                <button onClick={handdleLoadMore} className=' bg-blue-500 px-2 text-white rounded-lg'>ໂຫຼດເພີ່ມ</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
