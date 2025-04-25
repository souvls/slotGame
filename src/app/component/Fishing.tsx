import md5 from 'md5';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import products from '@/gamedata/fishing/products.json';
import jdb from '@/gamedata/fishing/jdb.json';
import cq9 from '@/gamedata/fishing/cq9.json';
import jili_tcg from '@/gamedata/fishing/jili_tcg.json';
import fachai from '@/gamedata/fishing/fachai.json';
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
const Fishing = () => {
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState<Game[]>();
    const [loadingGame, setLoadingGame] = useState(false);

    useEffect(() => {
        const active = localStorage.getItem("fishing_active");
        if (active) {
            setProductActive(parseInt(active));
        }
    }, [])
    useEffect(() => {
        switch (products[productActive].product_name) {
            case "jdb": {
                setGames(jdb); break;
            }
            case "cq9": {
                setGames(cq9); break;
            }
            case "jili_tcg": {
                setGames(jili_tcg); break;
            }
            case "fachai": {
                setGames(fachai); break;
            }
            default: {
                setGames([]);
            }
        }

    }, [productActive])

    const handleSelectProduct = (index: number) => {
        localStorage.setItem("fishing_active", index.toString());
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
                                        <p>{item.product_name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <div className='w-[80%] lg:w-[90%] grid grid-cols-3 lg:grid-cols-4 gap-4 p-5 '>
                        {games && games.length > 0 && games.map((item: any, index) => {
                            // console.log(item)
                            return (
                                <>
                                    <ShowGameItem
                                        key={index}
                                        product_code={products[productActive].product_code}
                                        product_name={products[productActive].product_name}
                                        product_currency={products[productActive]?.currency}
                                        game={item}
                                    />
                                </>
                            )
                        })}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Fishing