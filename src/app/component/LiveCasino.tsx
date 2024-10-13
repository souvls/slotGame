import md5 from 'md5';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const products = [
    {
        "provider": "AWC",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 23,
        "product_id": 29,
        "product_code": 1022,
        "product_name": "sexy_gaming",
        "game_type": "LIVE_CASINO"
    },
    {
        "provider": "PragmaticPlay",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 32,
        "product_id": 49,
        "product_code": 1006,
        "product_name": "pragmatic_play",
        "game_type": "LIVE_CASINO"
    },
    {
        "provider": "BigGaming",
        "currency": "IDR2",
        "status": "ACTIVATED",
        "provider_id": 34,
        "product_id": 68,
        "product_code": 1004,
        "product_name": "big_gaming",
        "game_type": "LIVE_CASINO"
    },
    {
        "provider": "AI Live Casino",
        "currency": "IDR",
        "status": "ACTIVATED",
        "provider_id": 102,
        "product_id": 41,
        "product_code": 1149,
        "product_name": "ai_live_casino",
        "game_type": "LIVE_CASINO"
    }
]
const LiveCasino = () => {
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState([]);
    const [loadingGame, setLoadingGame] = useState(false);

    useEffect(() => {
        fetchGames(1022);
    }, [])
    useEffect(() => {
        fetchGames(products[productActive].product_code);
    }, [productActive])
    const fetchGames = async (product_code: any) => {
        for (const i of products) {
            const request_time = new Date().getTime();
            const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}gamelist${process.env.NEXT_PUBLIC_OP_CODE}`);
            fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
                "?product_code=" + product_code +
                "&operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
                "&game_type=" + "LIVE_CASINO" +
                "&sign=" + hash +
                "&request_time=" + request_time)
                .then((response) => response.json())
                .then(result => {
                    //console.log(result)
                    setGames(result.provider_games);
                })
                .catch(err => {
                    throw err
                })
        }
    }
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
                        //console.log(result)
                        setLoadingGame(false);
                        if (result.status === 'no' && result.message === "logout") {
                            Cookies.remove("userdata");
                            setLoadingGame(false);
                            Swal.fire({
                                title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                                text: "02011223344",
                                icon: "error",
                                background: '#000000',
                                color: '#ffffff',
                                showConfirmButton: false,
                            }).then(() => {
                                window.location.reload();
                            });
                        } else {
                            setLoadingGame(false);
                            router.push(result.result);
                        }
                    }).catch(() => {
                        Cookies.remove("userdata");
                        setLoadingGame(false);
                        Swal.fire({
                            title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                            text: "02011223344",
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
                    text: "02011223344",
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
    return (
        <div>
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
                        {games && games.length > 0 && games.map((item: any, index) => {
                            return (
                                <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                    <img
                                        src={item.image_url}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const img = e.target as HTMLImageElement;
                                            img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                                            img.src = `/assets/icon/product/${products[productActive].product_name}.png`;
                                        }}
                                        className='hover:border-2 border-yellow-300'
                                    />
                                    {/* <img
                                        src={`/assets/icon/game/${item?.product_code + item?.game_code}.png`}
                                        alt={item.game_name}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            const img = e.target as HTMLImageElement;
                                            img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                                            //img.src = `/assets/icon/product/${products[productActive].product_name}.png`;
                                        }}
                                        className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
                                    /> */}
                                    <h1 className=' text-center text-white'>{item.game_name}</h1>
                                    {/* <p className=' text-center text-white'>{item.product_code}</p>
                                    <p className=' text-center text-white'>{item.game_code}</p> */}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveCasino