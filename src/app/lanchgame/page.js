"use client"
import React, { useEffect, useState } from 'react'
import md5 from "md5";
const page = () => {
    const [balance, setBalance] = useState([]);
    useEffect(() => {
        fetchdata();

    }, [])
    const fetchdata = async () => {
        const request_time = new Date().getTime();
        const hash = md5(request_time + "pBXXGyr53ekS6CvjwgA5ES" + "launchgame" + "H801");
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow"
        };

        await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/launch-game" +
            "?operator_code=H801" +
            "&member_account=INFINITY999" +
            "&agent_account=INFINITY999" +
            "&password=Qwer1234" +
            "&nickname=INFINITY999" +
            "&currency=IDR" +
            "&game_code=1054" +
            "&product_code=1153" +
            "&game_type=SLOT" +
            "&language_code=" + 0 +
            "&ip=10.0.109.190" +
            "&platform=web" +
            "&sign=" + hash +
            "&request_time=" + request_time
            , requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                //setGameList(result)
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>

        </div>
    )
}

export default page