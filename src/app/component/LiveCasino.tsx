import React, { useEffect, useState } from 'react'

import products from '@/gamedata/casino/products.json'
import sbo from '@/gamedata/casino/sbo.json'
import sa_gaming from '@/gamedata/casino/sa_gaming.json'
import wm_casino from '@/gamedata/casino/wm_casino.json'
import sexy_gaming from '@/gamedata/casino/sexy_gaming.json'
import pragmatic_play from '@/gamedata/casino/pragmatic_play.json'
import ai_live_casino from '@/gamedata/casino/ai_live_casino.json'
import big_gaming from '@/gamedata/casino/big_gaming.json'
const ShowGameItem = React.lazy(() => import('./ShowGameItem'));
import Image from 'next/image';

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
const LiveCasino = () => {
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        const active = localStorage.getItem("casino_active");
        if (active) {
            setProductActive(parseInt(active));
        }

        fetchGames();
    }, []);
    const fetchGames = async () => {
        setGames(sbo);
    }
    const handleSelectProduct = async (index: number, product_code: number) => {
        localStorage.setItem("slot_active", index.toString());
        setProductActive(index);
        if (product_code === 1012) {
            setGames(sbo);
        }
        else if (product_code === 1185) {
            setGames(sa_gaming);
        }
        else if (product_code === 1185) {
            setGames(sa_gaming);
        } else if (product_code === 1020) {
            setGames(wm_casino);
        }
        else if (product_code === 1022) {
            setGames(sexy_gaming);
        } else if (product_code === 1006) {
            setGames(pragmatic_play);
        } else if (product_code === 1004) {
            setGames(big_gaming);
        } else if (product_code === 1184) {
            setGames(ai_live_casino);
        }
        else {
            setGames(sbo);

        }

    }


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

export default LiveCasino