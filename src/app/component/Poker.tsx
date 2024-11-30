import md5 from 'md5';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const products = [
    {
        "provider": "Spribe",
        "currency": "THB",
        "status": "ACTIVATED",
        "provider_id": 92,
        "product_id": 1,
        "product_code": 1138,
        "product_name": "spribe",
        "game_type": "POKER"
    }
]
const Poker = () => {
    const router = useRouter();
    const [productActive, setProductActive] = useState(0);
    const [games, setGames] = useState([]);
    const [loadingGame, setLoadingGame] = useState(false);

    useEffect(() => {
        setLoadingGame(false);
        fetchGames(1138);
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
                    if (item.game_type === "POKER" && item.currency === "THB" && item.status === 'ACTIVATED') {
                        x.push(item)
                    }
                });
                //console.log(x);
                //setProductList(result);
            })
            .catch(err => {
                throw err
            })
    }
    const fetchGames = async (product_code: any) => {
        for (const i of products) {
            const request_time = new Date().getTime();
            const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}gamelist${process.env.NEXT_PUBLIC_OP_CODE}`);
            fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/provider-games" +
                "?product_code=" + product_code +
                "&operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
                "&game_type=" + "POKER" +
                "&sign=" + hash +
                "&request_time=" + request_time)
                .then((response) => response.json())
                .then(result => {
                    //console.log(result)
                    const game = result.provider_games.reduce((acc: any, current: any) => {
                        if (current.status === "ACTIVATED" && !acc.find((item: any) => (item.game_name === current.game_name))) {
                            acc.push(current);
                        }
                        return acc;
                    }, []);
                    // console.log(game);
                    setGames(game);
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
                //const token = JSON.parse(cookie).token;
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const request_time = new Date().getTime();
                console.log(process.env.NEXT_PUBLIC_SECRET_KEY);
                console.log(process.env.NEXT_PUBLIC_OP_CODE);

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
                fetch(`${process.env.NEXT_PUBLIC_API_NAME}/api/operators/launch-game`, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(raw),
                    redirect: "follow"
                })
                    .then((response) => response.json())
                    .then((result) => {
                        //console.log(result)

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
                    }).catch(() => {
                        Cookies.remove("userdata");
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

    return (
        <div>
            {loadingGame && <Spinner />}
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
                                    <div key={index} onClick={() => handdlePlay(item)} className=' flex flex-col items-center'>
                                        <img
                                            src={item.image_url}
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const img = e.target as HTMLImageElement;
                                                img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                                                img.src = `/assets/icon/game/${item?.product_code + item?.game_code}.png`
                                            }}
                                            className='w-full rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
                                        />
                                        <h1 className=' text-center text-white text-[8px]'>{item.game_name}</h1>
                                        {/* <p className=' text-center text-white'>{item.product_code}{item.game_code}</p>  */}
                                    </div>
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