"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Spinner from '@/app/component/Spinner';
import Swal from 'sweetalert2';

const page = () => {
    const inputRef = useRef(null);
    const router = useRouter();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handdleSubmit = async () => {
        if (!username) {
            Swal.fire({
                title: "<p>ໃສ່ຊື່ຢູເຊີ້</p>",
                icon: "error"
            });
        } else if (!password) {
            Swal.fire({
                title: "<p>ໃສ່ລະຫັດ</p>",
                icon: "error"
            });
        } else {
            setLoading(true);
            const token = localStorage.getItem('token');
            const data = JSON.stringify({
                Username: username,
                Password: password
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
            await fetch("/api/member/my-user", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === 'ok') {
                        setLoading(false);
                        Swal.fire({
                            title: result.message,
                            icon: "success"
                        }).then(() => {
                            router.push("/member/office/users");
                        });
                    } else {
                        if (result.message === 'notoken') {
                            localStorage.clear();
                            router.push("/member");
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
            setLoading(false);

        }
    }
    return (
        <div className=''>
            {loading && <Spinner />}
            <div className='w-full p-2 border-b-2'>
                <div className=' flex justify-start gap-3'>
                    <p>ເພີ່ມຢູເຊີ້ໃໝ່</p>
                </div>
            </div>
            <div className='m-4 '>
                <div className='flex flex-col lg:justify-start gap-3'>
                    <input
                        type='text'
                        placeholder='username'
                        className=' p-2 rounded-lg'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        ref={inputRef}
                    />
                    <input
                        type='text'
                        placeholder='ລະຫັດໃໝ່'
                        className=' p-2 rounded-lg'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handdleSubmit} className=' bg-blue-500 text-white p-2 rounded-lg'><p>ເພີ່ມຢູເຊີ້ໃໝ່</p></button>
                </div>
            </div>
        </div>
    )
}

export default page