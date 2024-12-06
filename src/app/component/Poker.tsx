import React, { useEffect, useState } from 'react'
import ShowGameItem from './ShowGameItem';
import products from '@/gamedata/poker/products.json'
import spribe from '@/gamedata/poker/spribe.json'

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
    const [games, setGames] = useState<Game[]>();

    useEffect(() => {

    }, [])
    useEffect(() => {
        switch (products[productActive].product_name) {
            case "spribe": {
                setGames(spribe); break;
            }
            default: {
                setGames([]);
            }
        }
    }, [productActive])


    return (
        <div>
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex border rounded-lg overflow-hidden'>
                    <div className='w-[20%] lg:w-[10%] flex flex-col gap-2 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => setProductActive(index)} className={` bg-white w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
                                        <img
                                            src={`/assets/icon/product/${item.product_name}.png`}
                                            alt={item.product_name} width={100} height={100}
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const img = e.target as HTMLImageElement;
                                                img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                                            }}
                                        />
                                        {/* <p>{item.product_name}</p> */}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-[80%] lg:w-[90%] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5 '>
                        {games && games.length > 0 && games.map((item: any, index) => {
                            return (
                                <>
                                    <ShowGameItem key={index} product_name={products[productActive].product_name} game={item} />
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Poker