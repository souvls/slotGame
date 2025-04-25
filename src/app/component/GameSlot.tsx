"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ShowGameItem = React.lazy(() => import('./ShowGameItem'));
import products from '@/gamedata/slot/products.json'
import pg_soft from '@/gamedata/slot/pg_soft.json'
import playstar from '@/gamedata/slot/playstar.json'
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
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState<Game[]>([]);
    const [currentGames, setCurrentGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
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
        setGames(pg_soft);
        // setCurrentGames(pg_soft.slice(0, 24));
        // setTotalPage(Math.ceil(pg_soft.length / 24));

    }
    const handleSelectProduct = async (index: number, product_code: number) => {
        localStorage.setItem("slot_active", index.toString());
        setProductActive(index);
        if (product_code === 1007) {
            setGames(pg_soft);
            // setCurrentGames(pg_soft.slice(0, 24));
            // setTotalPage(Math.ceil(pg_soft.length / 24));
        } else if (product_code === 1050) {
            setGames(playstar);
            // setCurrentGames(playstar.slice(0, 24));
            // setTotalPage(Math.ceil(playstar.length / 24));
        }
        else if (product_code === 1006) {
            setGames(pragmatic_play);
            // setCurrentGames(pragmatic_play.slice(0, 24));
            // setTotalPage(Math.ceil(pragmatic_play.length / 24));
        }
        else if (product_code === 1079) {
            setGames(fachai);
            // setCurrentGames(fachai.slice(0, 24));
            // setTotalPage(Math.ceil(fachai.length / 24));
        }
        else if (product_code === 1085) {
            setGames(jdb);
            // setCurrentGames(jdb.slice(0, 24));
            // setTotalPage(Math.ceil(jdb.length / 24));
        } else if (product_code === 1009) {
            setGames(cq9);
            // setCurrentGames(cq9.slice(0, 24));
            // setTotalPage(Math.ceil(cq9.length / 24));
        } else if (product_code === 1018) {
            setGames(live_22);
            // setCurrentGames(live_22.slice(0, 24));
            // setTotalPage(Math.ceil(live_22.length / 24));
        } else if (product_code === 1049) {
            setGames(evoplay);
            // setCurrentGames(evoplay.slice(0, 24));
            // setTotalPage(Math.ceil(evoplay.length / 24));
        } else if (product_code === 1166) {
            setGames(no_limit_city);
            // setCurrentGames(no_limit_city.slice(0, 24));
            // setTotalPage(Math.ceil(no_limit_city.length / 24));
        } else if (product_code === 1168) {
            setGames(netent);
            // setCurrentGames(netent.slice(0, 24));
            // setTotalPage(Math.ceil(netent.length / 24));
        } else if (product_code === 1169) {
            setGames(redtiger);
            // setCurrentGames(redtiger.slice(0, 24));
            // setTotalPage(Math.ceil(redtiger.length / 24));
        } else if (product_code === 1091) {
            setGames(jili_tcg);
            // setCurrentGames(jili_tcg.slice(0, 24));
            // setTotalPage(Math.ceil(jili_tcg.length / 24));
        } else if (product_code === 1115) {
            setGames(booming_games);
            // setCurrentGames(booming_games.slice(0, 24));
            // setTotalPage(Math.ceil(booming_games.length / 24));
        } else if (product_code === 1153) {
            setGames(hacksaw);
            // setCurrentGames(hacksaw.slice(0, 24));
            // setTotalPage(Math.ceil(hacksaw.length / 24));
        }
        else if (product_code === 1184) {
            setGames(rich88);
            // setCurrentGames(rich88.slice(0, 24));
            // setTotalPage(Math.ceil(rich88.length / 24));
        }
        else if (product_code === 1148) {
            setGames(wow_gaming);
            // setCurrentGames(smartsoft.slice(0, 24));
            // setTotalPage(Math.ceil(smartsoft.length / 24));
        } 
        else if( product_code === 1162){
            setGames(octoplay);
        }
        else if (product_code === 1170) {
            setGames(smartsoft);
        }

        else {
            setGames(pg_soft);
            // setCurrentGames(pg_soft.slice(0, 24));
            // setTotalPage(Math.ceil(pg_soft.length / 24));
        }
        // setPage(0);
    }

    //const handdleChangPage = async (page: number) => {
    //setCurrentGames(games.slice(24 * page, 24 * page + 24));
    //setPage(page);

    // const data = await getGames(products[productActive].product_code, "SLOT", page * 24, 24);
    // setPage(page);
    // setGames(data?.provider_games);
    //}

    return (
        <>
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex justify-start border rounded-lg '>
                    <div className=' w-[20%] md:w-[10%] lg:w-[10%] flex flex-col gap-1 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => {
                                            handleSelectProduct(index, item.product_code);
                                        }}
                                        className={` bg-white w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden  ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
                                        <Image
                                            loading='lazy'
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
                    <div className=' w-[80%] md:w-[90%] lg:w-[90%]'>
                        <div className=' w-full grid grid-cols-4  gap-4 p-5 '>
                            {games && games?.map((item: Game, index) => {
                                return (
                                    <ShowGameItem
                                        key={index}
                                        product_code={products[productActive]?.product_code}
                                        product_name={products[productActive]?.product_name}
                                        product_currency={products[productActive]?.currency}
                                        game={item}
                                    />
                                )
                            })}
                        </div>
                        {/* <div className='mb-2 px-2 flex justify-center flex-wrap gap-3'>
                            {
                                Array.from({ length: totalPage }, (_, i) => {
                                    return (
                                        <button onClick={() => handdleChangPage(i)} className={`${page === i && 'bg-sky-500'} border border-sky-500 text-white px-2 rounded-lg`}>{i + 1}</button>
                                    )
                                })
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
