"use client"
import React, { useEffect, useState } from 'react'
import md5 from "md5";
import Cookies from 'js-cookie';
import axios from 'axios';

const page = () => {
    const [game, setGame] = useState<any[]>([]);

    useEffect(() => {
        fetchdata();
    }, [])
    const fetchdata = async () => {
        try {
            const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');

            axios.get(`https://test.ambsuperapi.com/seamless/games?productId=PGSOFT2`,
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`,
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {
                    //console.log(result.data)
                    setGame(result.data.data.games)
                })
            //res.status(200).json(result.data);
        } catch (error) {
            //console.log(error)
            //res.status(200).json(error);
        }
        // try {
        //     const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');

        //     const result = await axios.get(`https://test.ambsuperapi.com/seamless/games?productId=PGSOFT2`,
        //         {
        //             headers: {
        //                 'Authorization': `Basic ${basicAuth}`,
        //                 'Content-Type': 'application/json',
        //             },
        //         })
        //     console.log(result.data)
        //     //res.status(200).json(result.data);
        // } catch (error) {
        //     console.log(error)
        //     //res.status(200).json(error);

        // }
    }
    const handlePay = (game: any) => {
        console.log(game)
        try {
            const basicAuth = Buffer.from(`INFINITY999THB:ffa959af-503f-4bcc-8ba8-578bf32fba8f`).toString('base64');
            axios.post(`https://test.ambsuperapi.com/seamless/logIn`,
                {
                    "username": "sou0002",
                    "productId": "PGSOFT2",
                    "gameCode": game.code,
                    "isMobileLogin": false,
                    "limit": 1,
                    "sessionToken": "d4be70d1sss-349f-4fc1-a955-35d2a4bff244",
                    "betLimit": []
                },
                {
                    headers: {
                        'Authorization': `Basic ${basicAuth}`,
                        'Content-Type': 'application/json',
                    },
                }).then((result) => {
                    console.log(result.data.data.url)
                    window.location.href = result.data.data.url
                })
            //res.status(200).json(result.data);
        } catch (error) {
            console.log(error)
            //res.status(200).json(error);
        }
    }
    return (
        <div className='w-full p-5 grid grid-cols-6'>
            {game && game.map((item, index) => {
                return (
                    <div key={index} onClick={() => handlePay(item)} className=' border'>
                        {item.name}
                        <img alt='' src={item.img} />
                        {item.providerCode}
                    </div>
                )
            })}
        </div>
    )
}

export default page