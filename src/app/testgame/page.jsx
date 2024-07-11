"use client"
import React, { use, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { PacmanLoader } from 'react-spinners';
const page = () => {

    const [user, setUser] = useState([]);
    const [randomBoolean, setRandomBoolean] = useState(Boolean);
    const [numBet, setNumBet] = useState(10);
    const [resultMoney, setResultMoney] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadGame, setLoadGame] = useState(false);
    const [history, setHistory] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchdata();
        } else {
            Swal.fire({
                title: "Login fail",
                text: "pleas login",
                icon: "error",
                background: '#000000',
                color: '#ffffff',
            }).then(() => {
                window.location.replace("/")
            });
        }
    }, [])
    const fetchdata = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            redirect: "follow"
        };
        await fetch("/api/user/my-info", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    console.log(result)
                    setUser(result.result);
                }
            })
            .catch((error) => console.error(error));
        await await fetch("/api/user/playgame", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    console.log(result);
                    setHistory(result.result);
                }
            })
            .catch((error) => console.error(error));
        await
            setLoading(false);
    }
    const handdlePlay = async () => {
        if (user.Amount > numBet) {
            setLoadGame(true);
            const randomBoolean = Math.random() >= 0.5;

            const token = localStorage.getItem('token');
            const data = JSON.stringify({
                Amount: numBet,
                Result: randomBoolean ? "WIN" : "LOSS"
            })
            const requestOptions = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: data,
                redirect: "follow"
            };
            await fetch("/api/user/playgame", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    //console.log(result)
                    if (result.status === 'ok') {
                        //console.log(result.result)
                        const x = {
                            
                        }
                        setResultMoney(numBet);
                        setUser(result.result);
                        setRandomBoolean(randomBoolean);
                    } else {
                        if (result.message === 'notoken') {
                            localStorage.clear();
                            router.push("/admin");
                        } else {
                            setLoading(false);
                            Swal.fire({
                                title: `<p>${result.message}</p>`,
                                icon: "error"
                            });
                        }
                    }
                })
                .catch((error) => console.error(error));
            setLoadGame(false);
            //console.log(randomBoolean);
        } else {
            window.alert("ເງິນບໍ່ພໍ")
        }
    }
    return (
        <div className=' w-[960px] mx-auto p-10'>
            <p>{user.Username}</p>
            <p>{user.Amount && user.Amount.toLocaleString() + "THB"}</p>
            <div>
                <p>BET</p>
                <select onChange={e => setNumBet(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={60}>50</option>
                    <option value={1000}>1000</option>
                    <option value={2000}>2000</option>
                    <option value={3000}>3000</option>
                </select>
            </div>
            <div className=' mt-20'>
                <p> Result: {loadGame ? <PacmanLoader size={13} color='green' loading /> : randomBoolean === true ? <span className="text-green-500">WIN : ${resultMoney - (resultMoney * 0.02)}</span> : <span className="text-red-500">LOSS : ${resultMoney}</span>} </p>
                <button onClick={handdlePlay} className=' bg-orange-500 p-2 rounded-xl'>Random</button>
            </div>
            <div className='mt-10'>
                <p>History</p>
                {!loading && history.length>0 && history.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className=''>
                                <span>{index}</span>
                                <span>, {item.Date}</span>
                                <span>, {item.Result}</span>
                                <span>, {item.Amount.toLocaleString()}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default page