"use client"
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react'
import Spinner from '../component/Spinner'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { stringify } from 'querystring';
import Link from 'next/link';
const page = () => {
    const router = useRouter();
    const [Username, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(()=>{
        const role = localStorage.getItem("role");
        if(role === "member"){
            router.push("/member/office")
        }
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = {}
        if (!Username) {
            error.Username = "Input usernaem!";
        }
        if (!Password) {
            error.Password = "Input password!";
        }
        setErrors(error);
        if (Object.keys(error).length <= 0) {
            setIsLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "Username": Username,
                "Password": Password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("/api/member/login", requestOptions)
                .then((response) => response.json())
                .then(async (result) => {
                    //console.log(result)
                    if (result.status === 'ok') {
                        localStorage.setItem("token", result.token);
                        localStorage.setItem("role", "member");
                        
                        Swal.fire({
                            title: "Login success",
                            text: "ເຂົ້າລະບົບສຳເລັດ",
                            icon: "success",
                            background: '#000000',
                            color: '#ffffff',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            router.push("/member/office");
                        });
                    } else {
                        Swal.fire({
                            title: "Login fail",
                            text: result.msg,
                            icon: "error",
                            background: '#000000',
                            color: '#ffffff',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
                
        }

    }
    return (
        <div className='w-full h-screen pt-[80px] bg-[#121212]'>
            {isLoading &&
                <Spinner />
            }
            <div className='w-[80%] lg:w-[500px] bg-[#ffffff34] mx-auto py-10 px-5 rounded-lg border-2 border-yellow-300 text-white'>
                <h1 className='text-center text-2xl font-bold'>Member Login</h1>
                <div className=' mt-5'>
                    <div>
                        <p>USERNAME</p>
                        <div>
                            <input
                                type='text'
                                className=' w-full bg-transparent rounded-lg'
                                value={Username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <span className=' text-red-500'>{errors && errors.Username}</span>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p>PASSWORD</p>
                        <div>
                            <input
                                type='password'
                                className=' w-full bg-transparent rounded-lg'
                                value={Password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span className=' text-red-500'>{errors && errors.Username}</span>
                        </div>
                    </div>
                    <div className='mt-5 '>
                        <button onClick={handleSubmit} className='bg-[#38d39f] p-2 rounded-lg' >Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page