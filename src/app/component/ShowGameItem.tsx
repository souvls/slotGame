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
    product_code: number,
    product_name: string,
    product_currency: string,
    game: Game
}

const ShowGameItem: React.FC<Props> = ({ product_code, product_name, product_currency, game }) => {
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
        var url = "";
        var html = "";
        try {
            const cookie = Cookies.get("userdata");
            if (cookie) {
                const user = JSON.parse(cookie);
                if (game.game_type === "FISHING") {
                    Swal.fire({
                        icon: "warning",
                        title: "<p>ຂໍອະໄພ</p>",
                        html: "<p>ເກມກຳລັງປັບປຸງ</p>"
                    })
                    return
                }
                setLoading(true);
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                // const result = await playGame(user.username, game.game_code, product_code, game.game_type, ip.ip, product_currency);
                // console.log(result)
                const raw = {
                    game_code: game.game_code,
                    product_code: product_code,
                    game_type: game.game_type,
                    product_currency: product_currency,
                    ip: ip.ip
                }

                const res = await axios.post("/api/user/playgame", raw, {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        'Content-Type': 'application/json'
                    }
                })
                // console.log(res)
                if (res.data) {
                    if (res.data?.status === 'no' && res.data?.message === 'logout') {
                        Swal.fire({
                            icon: "warning",
                            title: "<p>IP ບໍ່ຕົງກັນ </p>",
                            html: "<p>ກະລຸນາເຂົ້າສູ່ລະບົບໃໝ່</p>"
                        }).then(() => {
                            Cookies.remove("userdata");
                            window.location.reload();
                        })
                    }
                    if (res.data?.status === 'no' && res.data?.message === 'game error') {
                        Swal.fire({
                            icon: "warning",
                            title: "<p>ຂໍອະໄພ</p>",
                            html: "<p>ເກມກຳລັງປັບປຸງ</p>"
                        })
                        return;
                    }
                    if (res.data.code === 200) {
                        setLoading(false);
                        if (res.data.url) {
                            saveGameHistory();
                            // url = res.data.url;
                            window.open(res.data.url, '_blank');
                        }
                        else if (res.data.content) {
                            saveGameHistory();
                            // html = res.data.content;
                            const blob = new Blob([res.data.content], { type: 'text/html' });
                            const blobUrl = URL.createObjectURL(blob);
                            window.open(blobUrl, '_blank');

                        }
                        else {
                            Swal.fire({
                                icon: "warning",
                                title: "<p>ຂໍອະໄພ</p>",
                                html: "<p>ເກມກຳລັງປັບປຸງ</p>"
                            })
                        }
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
                title: "<p>ຕິດຕໍ່ເອເຢັ້ນ</p>",
                text: "020 98 399 064",
                icon: "error",
                background: '#000000',
                color: '#ffffff',
                showConfirmButton: false,
            });
        }
        // finally {
        //     setLoading(false);
        //     if (url != "") {
        //         window.open(url, '_blank');
        //     }
        //     if (html != "") {
        //         const blob = new Blob([html], { type: 'text/html' });
        //         const blobUrl = URL.createObjectURL(blob);
        //         window.open(blobUrl, '_blank');

        //         // const htmlContent = html;
        //         // const base64Html = Buffer.from(htmlContent).toString('base64');
        //         console.log(blob);
        //         // const url = "/pg/"+base64Html
        //         window.open(blob, '_blank');
        //     }

        // }
    }
    const saveGameHistory = () => {
        const temp: Props[] = [];
        const gameHistory = localStorage.getItem("game_history");
        const Games: Props[] = gameHistory ? JSON.parse(gameHistory) : [];
        const x = { product_code: product_code, product_name: product_name, product_currency: product_currency, game: game }
        temp.push(x);
        for (var i = 0; i < 4; i++) {
            temp.push(Games[i]);
        }
        localStorage.setItem("game_history", JSON.stringify(temp));
    }
    return (
        <div ref={imgRef} onClick={handdlePlay} className=''>
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
                    {/* <p className=' text-center text-white'>{game.product_code}{","}{game.game_code}</p>  */}
                </>}
        </div>

    );
};

export default ShowGameItem;
