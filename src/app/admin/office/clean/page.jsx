"use client"
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Spinner from '@/app/component/Spinner'
import { GiTakeMyMoney } from "react-icons/gi";
const page = () => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem('token');
    const fetchdata = () => {
      setLoading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + data
        },
        redirect: "follow"
      };
      fetch("/api/admin/maintenance", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 'ok') {
            // console.log(result.result.DateEnd)
            // const dateStartString = result.result && result.result.DateStart && result.result.DateStart.toISOString().split('T')[0]
            // const dateEndString = result.result && result.result.DateEnd && result.result.End.toISOString().split('T')[0]
            setDateStart(new Date(result.result.DateStart).toISOString().split('T')[0]);
            setDateEnd(new Date(result.result.DateEnd).toISOString().split('T')[0]);
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
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        fetch("/api/admin/clean-history-play", requestOptions)
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
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        fetch("/api/admin/clean-history-credit-user", requestOptions)
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
  const handleClean3 = () => {
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
        fetch("/api/admin/clean-history-credit-user", requestOptions)
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
  const handleClean4 = () => {
    Swal.fire({
      title: "SWAP OFFLINE <==> ONLINE?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Swap it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        fetch("/api/admin/maintenance", requestOptions)
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
  const handdleSetDate = () => {
    Swal.fire({
      title: "<p>ປ່ຽນວັນທີ</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Swap it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const data = JSON.stringify({
          DateStart: new Date(dateStart).getTime(),
          DateEnd: new Date(dateEnd+'T23:59:59Z').getTime()
        })
        const requestOptions = {
          method: "PUT",
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: data,
          redirect: "follow"
        };
        fetch("/api/admin/maintenance", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === 'ok') {
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
  const handdleSumTotal = () => {
    Swal.fire({
      title: "<p>ໄລ່ເງິນໃຫ້ ເອເຢັ້ນ</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Swap it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const requestOptions = {
          method: "PATCH",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          redirect: "follow"
        };
        fetch("/api/admin/update-member-money", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            // console.log(result)
            // if (result.status === 'ok') {
            //   setIsOnline(result.result.Online)
            //   Swal.fire({
            //     title: "Sucess!",
            //     text: "",
            //     icon: "success"
            //   });
            // } else {
            //   if (result.message === 'notoken') {
            //     localStorage.clear();
            //     router.push("/admin");
            //   }
            // }
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
    <div className=' mt-10 grid grid-cols-1 gap-5'>
      {loading && <Spinner />}
      <div>
        <p>ວັນທີໄລ່ເງິນ</p>
        <div className=' flex justify-star items-center gap-3'>
          <input
            type='date'
            value={dateStart}
            onChange={(e => { setDateStart(e.target.value) })}
            max={dateEnd}
          />
          <p>-</p>
          <input
            type='date'
            value={dateEnd}
            onChange={(e => setDateEnd(e.target.value))}
          />
          <button onClick={handdleSetDate} className=' p-2 bg-green-500 text-white'><p>ບັນທຶກ</p></button>
          <button onClick={handdleSumTotal} className=' p-2 bg-green-500 text-white'><p>ໄລ່ເງິນ</p></button>
        </div>
      </div>
      <div>
        <div><button onClick={handleClean2} className='mb-3 bg-yellow-400 text-white p-2 rounded-lg'><p>ລົບ ປະຫວັດເຄດິດຢູເຊີ</p></button></div>
        <div><button onClick={handleClean3} className='bg-red-500 text-white p-2 rounded-lg'><p>ລົບ ປະຫວັດເຄດິດເອເຢັ້ນ</p></button></div>
      </div>
      <Swap />
    </div>
  )
}

export default page