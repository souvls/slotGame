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
  const [credit, setcredit] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handdleSubmit = async () => {
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
    } else {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = JSON.stringify({
        UserID: parms.slug[0],
        Amount: credit
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
      await fetch("/api/member/add-credit", requestOptions)
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
  }
  return (
    <div className=''>
      {loading && <Spinner />}
      <div className='w-full p-2 border-b-2'>
        <div className=' flex justify-start gap-3'>
          <button onClick={() => router.back()}><IoArrowBackSharp size={25} /></button>
          <p>ເຕີມເງິນໃຫ້ {parms.slug[1]}</p>
        </div>
      </div>
      <div className='m-4 '>
        <p className=' text-rose-500 italic text-lg my-2'>ຈຳນວນເງິນຈະຖືກບວກໃສ່ກັບຈຳນວນເງິນຍັງເຫຼືອ</p>
        <div className='flex justify-start gap-3'>
          <input
            type='number'
            placeholder='...THB'
            className=' p-2 rounded-lg'
            value={credit}
            onChange={(e) => setcredit(e.target.value)}
            ref={inputRef} />
          <button onClick={handdleSubmit} className=' bg-green-500 text-white p-2 rounded-lg'><p>ເຕີມ</p></button>
        </div>
      </div>
    </div>
  )
}

export default page