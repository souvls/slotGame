"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Spinner from '@/app/component/Spinner';
import Swal from 'sweetalert2';

const page = () => {
    const inputRef = useRef(null);
    const router = useRouter();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [perCent, setPerCent] = useState(0);
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
        } else if (!perCent) {
            Swal.fire({
                title: "<p>ໃສ່ເປີເຊັນ</p>",
                icon: "error"
            });
        } else if ((perCent && perCent < 0) || (perCent && perCent > 100)) {
            Swal.fire({
                title: "<p>ເປີເຊັນ >0, <100 </p>",
                icon: "error"
            });
        } else {
            setLoading(true);
            const token = localStorage.getItem('token');
            const data = JSON.stringify({
                Username: username,
                Password: password,
                PartnersPercent: perCent
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
            await fetch("/api/admin/my-member", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === 'ok') {
                        setLoading(false);
                        Swal.fire({
                            title: result.message,
                            icon: "success"
                        }).then(() => {
                            router.push("/admin/office/members");
                        });
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
            setLoading(false);

        }
    }
    return (
        <div className=''>
            {loading && <Spinner />}
            <div className='w-full p-2 border-b-2'>
                <div className=' flex justify-start gap-3'>
                    <p>ເພີ່ມ Agent ໃໝ່</p>
                </div>
            </div>
            <div className='w-full lg:m-4 '>
                <div className=' grid grid-cols-1 gap-3'>
                    <div>
                        <p>username</p>
                        <input
                            type='text'
                            placeholder='username'
                            className=' p-2 rounded-lg'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>password</p>
                        <input
                            type='text'
                            placeholder='ລະຫັດໃໝ່'
                            className=' p-2 rounded-lg'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>percent</p>
                        <input
                            type='number'
                            placeholder='ເປີເຊັນ'
                            className=' p-2 rounded-lg'
                            value={perCent}
                            onChange={(e) => setPerCent(e.target.value)}
                            min={0}
                            max={100}
                        />
                    </div>
                    <div>
                        <button onClick={handdleSubmit} className=' bg-blue-500 text-white p-2 rounded-lg'><p>ເພີ່ມຢູເຊີ້ໃໝ່</p></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page