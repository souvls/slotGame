"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter, useParams } from 'next/navigation';
import Spinner from '@/app/component/Spinner';
import Swal from 'sweetalert2';
import axios from 'axios';

const page = () => {
    const inputRef = useRef(null);
    const router = useRouter();
    const parms = useParams();
    const [credit, setcredit] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handdleSubmit = async () => {
        if (loading) return; // ป้องกันการยิงซ้ำ
        setLoading(true);
        if (credit < 1) {
            Swal.fire({
                title: "<p>ໃສ່ຈຳນວນຜິດ</p>",
                icon: "error"
            });
        } else if (!credit) {
            Swal.fire({
                title: "<p>ໃສ່ຈຳນວນ</p>",
                icon: "error"
            });
        } else if (parseFloat(parms.slug[2]) - credit < 0) {
            Swal.fire({
                title: "<p>ເງິນບໍ່ພໍ</p>",
                icon: "error"
            });
        }
        else {
            const token = localStorage.getItem('token');
            const data = JSON.stringify({
                UserID: parms.slug[0],
                Amount: parseFloat(credit)
            })
            const res = await axios.post("/api/member/withdraw-credit", data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            if (res.data.status === 'ok') {
                Swal.fire({
                    title: res.data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 100
                }).then(() => {
                    router.push("/member/office/users");
                });
            } else {
                if (res.data.message === 'notoken') {
                    localStorage.clear();
                    router.push("/member");
                } else {
                    Swal.fire({
                        title: `<p>${res.data.message}</p>`,
                        icon: "error"
                    });
                }
            }
            setLoading(false)
        }
    }
    return (
        <div className=''>
            {loading && <Spinner />}
            <div className='w-full p-2 border-b-2'>
                <div className=' flex justify-start gap-3'>
                    <button onClick={() => router.back()}><IoArrowBackSharp size={25} /></button>
                    <p>ຖອນເງິນ: {parms.slug[1]}</p>
                </div>
            </div>
            <div className='m-4 '>
                <p className=' text-rose-500 italic text-lg my-2'>ເງິນໃນບັນຊີ: {parseInt(parms.slug[2]).toLocaleString() + " THB"}</p>
                <div className='flex justify-start gap-3'>
                    <input
                        type='number'
                        placeholder='...THB'
                        className=' p-2 rounded-lg'
                        value={credit}
                        onChange={(e) => setcredit(e.target.value)}
                        ref={inputRef} />
                    <button onClick={handdleSubmit} className=' bg-blue-500 text-white p-2 rounded-lg'><p>ຖອນ</p></button>
                </div>
            </div>
        </div>
    )
}

export default page