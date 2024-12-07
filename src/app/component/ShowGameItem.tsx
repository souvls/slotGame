import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import md5 from "md5";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import Spinner from "./Spinner";
import axios from "axios";
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
interface Props {
    product_name: String
    game: Game
}

const ShowGameItem: React.FC<Props> = ({ product_name, game }) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            // { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) observer.unobserve(imgRef.current);
        };
    }, []);
    const handdlePlay = async () => {
        if (game.game_type === "FISHING") {
            Swal.fire({
                icon: "warning",
                title: "<p>ຂໍອະໄພ</p>",
                html: "<p>ເກມກຳລັງປັບປຸງ</p>"
            })
            return
        }
        try {
            const cookie = Cookies.get("userdata");
            if (cookie) {
                setLoading(true);
                //const token = JSON.parse(cookie).token;
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                const request_time = new Date().getTime();

                const hash = md5(`${request_time}${process.env.NEXT_PUBLIC_SECRET_KEY}launchgame${process.env.NEXT_PUBLIC_OP_CODE}`);
                const raw = {
                    "operator_code": process.env.NEXT_PUBLIC_OP_CODE,
                    "member_account": JSON.parse(cookie).username,
                    "password": JSON.parse(cookie).password,
                    "currency": "THB",
                    "game_code": game.game_code,
                    "product_code": game.product_code,
                    "game_type": game.game_type,
                    "language_code": 3,
                    "ip": ip.ip,
                    "platform": "web",
                    "sign": hash,
                    "request_time": request_time,
                    "operator_lobby_url": "http://infinity999.com",
                }
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_NAME}/api/operators/launch-game`,
                    JSON.stringify(raw),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                )
                if (res.data) {
                    if (res.data.code === 200) {
                        saveGameHistory();
                        router.push(res.data.url)
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "<p>ຂໍອະໄພ</p>",
                            html: "<p>ເກມກຳລັງປັບປຸງ</p>"
                        })
                    }
                }
            } else {
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
            console.log(err);
            setLoading(false);
            Swal.fire({
                icon: "warning",
                title: "<p>ຂໍອະໄພ</p>",
                html: "<p>ເກມກຳລັງປັບປຸງ</p>"
            })
        }
    }
    const saveGameHistory = () => {
        const temp: Game[] = [];
        const gameHistory = localStorage.getItem("game_history");
        const Games: Game[] = gameHistory ? JSON.parse(gameHistory) : [];
        temp.push(game);
        for (var i = 0; i < 4; i++) {
            temp.push(Games[i]);
        }
        localStorage.setItem("game_history", JSON.stringify(temp));
    }
    return (
        <div ref={imgRef} onClick={handdlePlay} className='w-full'>
            {isVisible &&
                <>
                    {loading && <Spinner />}
                    <img
                        src={game?.image_url}
                        // onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        //     const img = e.target as HTMLImageElement;
                        //     img.src = "/assets/icon/product/"+product_name+".png"
                        //     img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi

                        // }
                        alt={game?.game_name}
                        loading="lazy"
                        className='w-[100%] rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
                    />
                    {/* <img
                src={item.image_url}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const img = e.target as HTMLImageElement;
                    img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi
                    //img.src = `/assets/icon/game/${item?.product_code + item?.game_code}.png`
                }}
                className='w-full rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
            /> */}
                    <h1 className=' text-center text-white text-[8px]'>{game?.game_name}</h1>
                    {/* <p className=' text-center text-white'>{item.product_code}{item.game_code}</p>  */}
                </>}
        </div>

    );
};

export default ShowGameItem;
