import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);

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

    return (
        <div ref={imgRef} className='w-full'>
            <img
                // ref={imgRef}
                src={isVisible ? game.image_url : ""}
                // onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                //     const img = e.target as HTMLImageElement;
                //     img.src = "/assets/icon/product/"+product_name+".png"
                //     img.onerror = null; // Ngăn chặn vòng lặp vô hạn nếu hình ảnh thay thế cũng bị lỗi

                // }
                alt={game.game_name}
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
            <h1  className=' text-center text-white text-[8px]'>{game.game_name}</h1>
            {/* <p className=' text-center text-white'>{item.product_code}{item.game_code}</p>  */}
        </div>

    );
};

export default ShowGameItem;
