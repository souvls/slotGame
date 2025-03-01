import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import md5 from "md5";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import Spinner from "./Spinner";
import axios from "axios";
interface Game {
    productId: string
    name: string,
    category: string,
    type: string,
    code: string,
    providerCode: string,
    img: string,
    rank: number
}

const ShowGameItem: React.FC<Game> = ({ productId, name, category, type, code, providerCode, img, rank }) => {
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
        try {
            const cookie = Cookies.get("userdata");
            if (cookie) {
                const user = JSON.parse(cookie);
                setLoading(true);
                const ip = await fetch("https://api.ipify.org/?format=json").then((response) => response.json());
                const raw = {
                    productId: productId,
                    name: name,
                    category: category,
                    type: type,
                    code: code,
                    providerCode: providerCode,
                    ip: ip.ip
                }
                const res = await axios.post("/api/user/playgameAMB", raw, {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        'Content-Type': 'application/json'
                    }
                })
                console.log(res)
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
                            // saveGameHistory();
                            url = res.data.url;
                        } else {
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
        finally {
            setLoading(false);
            if (url != "") {
                window.open(url, '_blank');
            }

        }
    }
    // const saveGameHistory = () => {
    //     const temp: Props[] = [];
    //     const gameHistory = localStorage.getItem("game_history");
    //     const Games: Props[] = gameHistory ? JSON.parse(gameHistory) : [];
    //     const x = { product_code: product_code, product_name: product_name, game: game }
    //     temp.push(x);
    //     for (var i = 0; i < 4; i++) {
    //         temp.push(Games[i]);
    //     }
    //     localStorage.setItem("game_history", JSON.stringify(temp));
    // }
    return (
        <div ref={imgRef} onClick={handdlePlay} className='w-full'>
            {isVisible &&
                <>
                    {loading && <Spinner />}
                    <img
                        src={img}
                        // onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        //     const img = e.target as HTMLImageElement;
                        //     img.src = "/assets/icon/product/"+product_name+".png"
                        //     img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi

                        // }
                        alt={name}
                        loading="lazy"
                        className='w-[100%] rounded-xl overflow-hidden flex justify-center items-center hover:border-2 border-yellow-300'
                    />
                    <h1 className=' text-center text-white text-[8px]'>{name}</h1>

                </>}
        </div>

    );
};

export default ShowGameItem;
