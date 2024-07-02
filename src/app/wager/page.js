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
        const hash = md5(request_time + "pBXXGyr53ekS6CvjwgA5ES"+ "getwagers" +"H801" );
        //const hash = md5(request_time + process.env.NEXT_PUBLIC_SECRET_KEY + "getbalance" + process.env.NEXT_PUBLIC_OP_CODE);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/operators/wagers"+
            "?operator_code=" + process.env.NEXT_PUBLIC_OP_CODE+
            "&sign=" + hash +
            "&request_time=" + request_time+
            "&start=1"+
            "&end=10"
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