"use client"
import React, { useState } from 'react'
import { GiOverInfinity } from "react-icons/gi";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Spinner from '../component/Spinner';
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handdleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
            Swal.fire({
                title: "<p>ຂໍ້ມູນບໍ່ຄົບ</p>",
                icon: "error",
                background: "#000"
            })
        } else {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "Username": username,
                "Password": password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            fetch("/api/user/login", requestOptions)
                .then((response) => response.json())
                .then(async (result) => {
                    //console.log(result)
                    if (result.status === 'ok') {
                        const data = {
                            id: result.result._id,
                            username: result.result.Username,
                            password: result.result.Password,
                            token: result.token
                        }
                        Cookies.set('userdata', JSON.stringify(data), { expires: 1 / 24 });
                        Swal.fire({
                            title: "Login success",
                            text: "ເຂົ້າລະບົບສຳເລັດ",
                            icon: "success",
                            background: '#000000',
                            color: '#ffffff',
                            showConfirmButton: false,
                            timer: 1000,
                        })
                        router.push("/");
                        setLoading(false);
                    } else {
                        Swal.fire({
                            title: "Login fail",
                            text: result.message,
                            icon: "error",
                            background: '#000000',
                            color: '#ffffff',
                            showConfirmButton: false,
                        });
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }
    return (
        <div className=' w-full h-screen pt-20 bg-slate-900 '>
            {loading &&
                <Spinner />
            }
            <div className='p-5  w-[80%] bg-blue-950 lg:w-[500px] mx-auto rounded-lg  shadow-lg shadow-blue-500/50'>
                <div>
                    <div className=' flex justify-center'>
                        <GiOverInfinity color='gold' size={40} />
                    </div>
                    <p className='text-yellow-300 font-bold text-xl text-center'>INFINITY999</p>
                </div>
                <div className=' mt-10'>
                    <p className='my-2 text-center text-white'>LOGIN SYSYTEM</p>
                    <div>
                        <input
                            type='text'
                            placeholder='Username'
                            className=' w-full p-2 text-amber-400 rounded-lg bg-transparent outline outline-amber-400'
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='mt-5'>
                        <input
                            type='text'
                            placeholder='Password'
                            className=' w-full p-2 text-amber-400 rounded-lg bg-transparent outline outline-amber-400'
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='mt-5'>
                        <button onClick={handdleSubmit} className=' w-full p-2 rounded-lg bg-amber-400'>LOGIN</button>
                    </div>
                    <p className=' mt-5 text-white text-sm'>ຫາກບໍ່ມີບັນຊີ ຕິດຕໍ່ແອັດມິນໄດ້ທີ່: <a className=' italic text-green-500' href='https://api.whatsapp.com/send?phone=8562056388013'>whatsapp</a></p>
                </div>
            </div>
        </div>
    )
}

export default page