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
        const hash = md5("H801" + request_time + "deposit" + "pBXXGyr53ekS6CvjwgA5ES");
        const data =
        {
            "member_account": "soudd",
            "operator_code": "H801",
            "product_code": 1153,
            "currency": "IDR",
            "transactions": [
                {
                    "id": "23746",
                    "action": "bet",
                    "wager_code": "tZDwLV3ayzBeP4Nvwxhcti",
                    "wager_status": "BET",
                    "amount": "- 10",
                    "bet_amount": "10",
                    "valid_bet_amount": "10",
                    "prize_amount": "0",
                    "tip_amount": "0",
                    "settle_at": "0",
                    "game_code": "1054"
                }
            ],
            "sign": hash,
            "request_time": request_time
        }

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            redirect: "follow"
        };
        await fetch("/api/seamless/deposit"
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