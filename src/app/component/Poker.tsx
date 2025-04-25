import React, { useEffect, useState } from 'react'

import products from '@/gamedata/poker/products.json'
import sbo from '@/gamedata/poker/sbo.json'
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
const Poker = () => {
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        const active = localStorage.getItem("poker_active");
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

export default Poker