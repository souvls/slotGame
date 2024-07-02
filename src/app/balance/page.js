"use client"
import React, { useEffect, useState } from 'react'
import md5 from "md5";
const page = () => {
    const [balance, setBalance] = useState([]);
    useEffect(() => {
        fetchdata();

    }, [])
    const fetchdata = async () => {
        //const currentTimestamp =  // Current timestamp in milliseconds
        const request_time = new Date().getTime();
        const hash = md5("H801" + request_time + "getbalance" + "pBXXGyr53ekS6CvjwgA5ES");
        //const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "getbalance" + process.env.NEXT_PUBLIC_OP_CODE);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/seamless/balance" +
            "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE +
            "&member_account=INFINTY999" +
            "&product_code=1153" +
            "&currency=IDR" +
            "&sign=" + hash.toString() +
            "&request_time=" + request_time.toString()
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