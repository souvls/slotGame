"use client"
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Spinner from '@/app/component/Spinner'
import { GiTakeMyMoney } from "react-icons/gi";
const page = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem('token');
    const fetchdata = async () => {
      setLoading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + data
        },
        redirect: "follow"
      };
      await fetch("/api/admin/maintenance", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 'ok') {
            setIsOnline(result.result.Online)
          } else {
            if (result.message === 'notoken') {
              localStorage.clear();
              router.push("/admin");
            }
            if (result.message === 'noadmin') {
              localStorage.clear();
              router.push("/admin");
            }
          }
        })
        .catch((error) => console.error(error));
      setLoading(false);
    }
    fetchdata();
    setToken(data);
  }, [])
  const handleClean1 = async () => {
    Swal.fire({
      title: "Are you sure?",
      html: "<p>ລົບປະຫວັດຫຼິ້ນເກມ!</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        await fetch("/api/admin/clean-history-play", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            if (result.status === 'ok') {
              Swal.fire({
                title: "Deleted!",
                text: "",
                icon: "success"
              });
            } else {
              if (result.message === 'notoken') {
                localStorage.clear();
                router.push("/admin");
              }
            }
          })
          .catch((error) => console.error(error));
        setLoading(false);
      }
    });
  }
  const handleClean2 = async () => {
    Swal.fire({
      title: "Are you sure?",
      html: "<p>ລົບປະຫວັດເຄດິດຢູເຊີ!</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        await fetch("/api/admin/clean-history-credit-user", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            if (result.status === 'ok') {
              Swal.fire({
                title: "Deleted!",
                text: "",
                icon: "success"
              });
            } else {
              if (result.message === 'notoken') {
                localStorage.clear();
                router.push("/admin");
              }
            }
          })
          .catch((error) => console.error(error));
        setLoading(false);
      }
    });
  }
  const handleClean3 = async () => {
    Swal.fire({
      title: "Are you sure?",
      html: "<p>ລົບປະຫວັດເຄດິດເອເຢັ້ນ!</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        await fetch("/api/admin/clean-history-credit-user", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            //console.log(result)
            if (result.status === 'ok') {
              Swal.fire({
                title: "Deleted!",
                text: "",
                icon: "success"
              });
            } else {
              if (result.message === 'notoken') {
                localStorage.clear();
                router.push("/admin");
              }
            }
          })
          .catch((error) => console.error(error));
        setLoading(false);
      }
    });
  }
  const handleClean4 = async () => {
    Swal.fire({
      title: "SWAP OFFLINE <==> ONLINE?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Swap it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        await fetch("/api/admin/maintenance", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            if (result.status === 'ok') {
              setIsOnline(result.result.Online)
              Swal.fire({
                title: "Sucess!",
                text: "",
                icon: "success"
              });
            } else {
              if (result.message === 'notoken') {
                localStorage.clear();
                router.push("/admin");
              }
            }
          })
          .catch((error) => console.error(error));
        setLoading(false);
      }
    });
  }
  const Swap = () => {
    return (
      <div>
        {!loading ? isOnline ?
          <button onClick={handleClean4} className='bg-red-500 text-white p-2 rounded-lg'><p className=' flex flex-col items-center'><GiTakeMyMoney size={30} />ປິດ Login user</p></button>
          :
          <button onClick={handleClean4} className='bg-blue-500 text-white p-2 rounded-lg'><p className=' flex flex-col items-center'><GiTakeMyMoney size={30} />ເປິດ Login user</p></button>
          : <></>
        }
      </div>
    )
  }
  return (
    <div className=' mt-10 grid grid-cols-2 gap-5'>
      {loading && <Spinner />}
      <div>
        <div><button onClick={handleClean1} className='mb-3 bg-blue-500 text-white p-2 rounded-lg'><p>ລົບ ປະຫວັດຫຼິ້ນເກມ</p></button></div>
        <div><button onClick={handleClean2} className='mb-3 bg-yellow-400 text-white p-2 rounded-lg'><p>ລົບ ປະຫວັດເຄດິດຢູເຊີ</p></button></div>
        <div><button onClick={handleClean3} className='bg-red-500 text-white p-2 rounded-lg'><p>ລົບ ປະຫວັດເຄດິດເອເຢັ້ນ</p></button></div>
      </div>
      <Swap />
    </div>
  )
}

export default page