import md5 from 'md5';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import products from '@/gamedata/casino/products.json'
import sa_gaming from '@/gamedata/casino/sa_gaming.json'
import wm_casino from '@/gamedata/casino/wm_casino.json'
import sexy_gaming from '@/gamedata/casino/sexy_gaming.json'
import pragmatic_play from '@/gamedata/casino/pragmatic_play.json'
import ai_live_casino from '@/gamedata/casino/ai_live_casino.json'
import big_gaming from '@/gamedata/casino/big_gaming.json'
import ShowGameItem from './ShowGameItem';

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
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState<Game[]>();
    const [loadingGame, setLoadingGame] = useState(false);

    useEffect(() => {
        const active = localStorage.getItem("casino_active");
        if (active) {
            setProductActive(parseInt(active));
        }
    }, [])
    useEffect(() => {
        switch (products[productActive].product_name) {
            case "sa_gaming": {
                setGames(sa_gaming); break;
            }
            case "wm_casino": {
                setGames(wm_casino); break;
            }
            case "sexy_gaming": {
                setGames(sexy_gaming); break;
            }
            case "pragmatic_play": {
                setGames(pragmatic_play); break;
            }
            case "big_gaming": {
                setGames(big_gaming); break;
            }
            case "ai_live_casino": {
                setGames(ai_live_casino); break;
            }
            default: {
                setGames([]);
            }
        }

    }, [productActive])
    const handleSelectProduct = (index: number) => {
        localStorage.setItem("casino_active", index.toString());
        setProductActive(index);
    }
    return (
        <div>
            {loadingGame && <Spinner />}
            <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
                <div className='flex border rounded-lg overflow-hidden'>
                    <div className='w-[20%] lg:w-[10%] flex flex-col gap-2 bg-gray-800 px-2 py-4'>
                        {
                            products.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => handleSelectProduct(index)} className={` bg-white w-full h-[50px] flex items-center border-2  rounded-lg overflow-hidden ${index == productActive ? 'border-yellow-300' : 'border-purple-600'}`}>
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
                                <ShowGameItem
                                    key={index}
                                    product_currency={products[productActive]?.currency}
                                    product_code={products[productActive].product_code}
                                    product_name={products[productActive].product_name}
                                    game={item}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveCasino