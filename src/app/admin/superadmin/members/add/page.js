"use client"
import Spinner from '@/app/component/Spinner';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
const page = () => {
    const [Username, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const [Amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        setAmount(0);
    },[])
    const handdleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = JSON.parse(localStorage.getItem("userToken"))
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append("refreshtoken", "Bearer " + data.refreshtoken);
        myHeaders.append("authorization", "Bearer " + data.accesstoken);

        const new_user = JSON.stringify({
            "Username": Username,
            "Password": Password,
            "Amount": Amount
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: new_user
        };

        await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/superadmin/admin/add", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false);
                console.log(result)
                if (result.status === 'ok') {
                    Swal.fire({
                        icon: "success",
                        title: result.msg,
                    }).then(() => {
                        window.location.href = "/admin/superadmin/members"
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: result.msg,
                    })
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
            {isLoading &&
                <Spinner />}
            <div className='w-full p-2 border-b-2'>
                <p>ເພີ່ມເອເຢັ້ນ</p>
            </div>
            <form onSubmit={handdleSubmit}>
                <div className=' mt-5'>
                    <p>ຊື່</p>
                    <input
                        type='text'
                        className=' rounded-lg'
                        value={Username}
                        onChange={e => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className=' mt-2'>
                    <p>ລະຫັດ</p>
                    <input
                        type='text'
                        className=' rounded-lg'
                        min={0}
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className=' mt-2'>
                    <p>ເຄດິດເລີ່ມຕົ້ນ</p>
                    <input
                        type='Number'
                        className=' rounded-lg'
                        min={0}
                        value={Amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className=' mt-2'>
                    <button className=' text-white bg-green-500 p-2 rounded-lg'><p>ເພີ່ມ</p></button>
                </div>
            </form>
        </div>
    )
}

export default page