"use client"
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { format } from 'date-fns'
const getDateString = (timeStamp) => {
  const daysLao = [
    "ວັນອາທິດ",
    "ວັນຈັນ",
    "ວັນອັງຄານ",
    "ວັນພຸດ",
    "ວັນພະຫັດ",
    "ວັນ​ສຸກ",
    "ວັນເສົາ"
  ];
  const currentDate = new Date(timeStamp);
  const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const todayLao = daysLao[dayIndex];
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Adjust month index for Lao calendar (0-based vs. 1-based)
  const year = currentDate.getFullYear();
  const laoDate = `${todayLao},${day}/${month}/${year} ${currentDate.toLocaleTimeString()}`;


  // Định dạng lại ngày giờ nếu cần thiết
  return laoDate
  // const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  // const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  // return timeString;
  // const data = format(date, 'dd/MM/yy HH:mm:ss');
  // return data;
}

import { BeatLoader } from 'react-spinners';
const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchdata();
  }, [])
  const fetchdata = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      },
      redirect: "follow"
    };
    fetch("/api/member/my-history-play", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          // console.log(result)
          setData(result.result);
          setLoading(false);
        } else {
          if (result.message === 'notoken') {
            localStorage.clear();
            router.push("/member");
          }
        }
      })
      .catch((error) => console.error(error));

  }
  return (
    <div>
      <div className='w-full p-2 border-b-2'>
        <p>ປະຫວັດຫຼິ້ນເກມ</p>
      </div>
      <div>
        {/* <div className='my-5 flex justify-between items-center'>
          <div className=' flex justify-start gap-2 items-center'>
            <input
              type='date'
              value={dateStart}
              onChange={e => setDateStart(e.target.value)}
            />
            <span>-</span>
            <input
              type='date'
              value={dateEnd}
              onChange={e => setDateEnd(e.target.value)}
            />
            <button onClick={handdleSearchDate} className=' bg-blue-500 p-2 text-white rounded-lg'><p>ຄົ້ນຫາ</p></button>
          </div>
          <div>
            <div className=' flex justify-start gap-3'>
              <button onClick={hanndleSearchToDay} className=' bg-blue-500 p-2 text-white rounded-lg'><p>ມື້ນີ້</p></button>
              <button onClick={hanndleSearchAll} className=' bg-blue-500 p-2 text-white rounded-lg'><p>ທັງໝົດ</p></button>
            </div>
          </div>
        </div> */}
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="w-full sticky top-0 text-xs bg-slate-900 text-white">
            <tr>
              <th scope="col" class=" py-3">
                ID
              </th>
              <th scope="col" class=" py-3">
                Date
              </th>
              <th scope="col" class="py-3">
                User_name
              </th>
              <th scope="col" class="py-3">
                Game
              </th>
              <th scope="col" class="py-3">
                bet_amount
              </th>
              <th scope="col" class="py-3">
                prized_amount
              </th>
              <th scope="col" class="py-3">

              </th>
            </tr>
          </thead>
          <tbody>
            {loading ?
              <>
                <tr>
                  <td>
                    <BeatLoader size={13} loading />
                  </td>
                </tr>
              </>
              :
              data && data.length > 0 && data.reverse().map((item, index) => {
                return (
                  <Wagger key={index} {...item}></Wagger>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}
const Wagger = (item) => {
  const [isWin, setIsWin] = useState(false);
  useEffect(() => {
    if (item.bet_amount <= item.prized_amount) {
      setIsWin(true);
    }
  })
  return (
    <tr class={`border-b ${isWin ? 'bg-green-500 text-white hover:bg-green-800' : 'bg-red-500 text-white hover:bg-red-800'}`}>
      <td class="py-2 ">
        {item.id}
      </td>
      <td class="py-2 ">
        {getDateString(item.created_at)}
      </td>
      <td class="py-2 ">
        {item.member_account}
      </td>
      <td class="py-2 ">
        {item.game_type + "_" + item.product_name + "_" + item.game_code}</td>
      <td class="py-2 ">
        {item.bet_amount.toLocaleString()}
      </td>
      <td class="py-2 ">
        {item.prized_amount.toLocaleString()}
      </td>
      <td class="py-2 ">
        {(item.prized_amount - item.bet_amount).toLocaleString()}
      </td>


    </tr>
  )
}
export default page