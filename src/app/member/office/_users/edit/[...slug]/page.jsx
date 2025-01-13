"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter, useParams } from 'next/navigation';
import Spinner from '@/app/component/Spinner';
import Swal from 'sweetalert2';

const page = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const parms = useParams();
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setUserName(parms.slug[1]);
    setPassword(parms.slug[2]);
  }, []);

  const handdleEdit = async () => {
    if ((username === parms.slug[1]) && (password === parms.slug[2])) {
    } else {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = JSON.stringify({
        UserID: parms.slug[0],
        Username: username,
        Password: password
      })
      const requestOptions = {
        method: "PATCH",
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
          //console.log(result)
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
  const handdleDelete = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const data = JSON.stringify({
      UserID: parms.slug[0],
    })
    const requestOptions = {
      method: "DELETE",
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
        //console.log(result)
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
      setLoading(false)
  }
  return (
    <div className=''>
      {loading && <Spinner />}
      <div className='w-full p-2 border-b-2'>
        <div className=' flex justify-start gap-3'>
          <button onClick={() => router.back()}><IoArrowBackSharp size={25} /></button>
          <p>ເເກ້ໄຂ {parms.slug[1]}</p>
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
            ref={inputRef} />
          <input
            type='text'
            placeholder='ລະຫັດໃໝ່'
            className=' p-2 rounded-lg'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handdleEdit} className=' bg-yellow-500 text-white p-2 rounded-lg'><p>ປ່ຽນ</p></button>
          <button onClick={handdleDelete} className=' lg:ms-5 bg-red-500 text-white px-4 py-2 rounded-lg'><p>ລົບ</p></button>
        </div>
      </div>
    </div>
  )
}

export default page