"use client"
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchdata();
  }, [])
  const fetchdata = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      },
      redirect: "follow"
    };
    fetch("/api/member/my-history-credit-user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
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
        <p>ປະຫວັດ ເຕີມ-ຖອນ</p>
      </div>
      <div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-blue-600">
            <tr>
              <th scope="col" class=" py-3">
                <p>ວັນທີ</p>
              </th>
              <th scope="col" class="py-3">
                <p>ຈຳນວນເງິນ</p>
              </th>
              <th scope="col" class="py-3">
                Transaction
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
              data.length > 0 && data.map((item, index) => {
                return (
                  <tr key={index} class="bg-white border-b hover:bg-slate-200">
                    <td class="py-3 ">
                      <p>{item.Date}</p>
                    </td>
                    <td class="">
                      {item.Transaction === 'withdraw' ?
                        <span className=' text-red-600'>- {item.Amount.toLocaleString() + " THB"}</span> :
                        item.Transaction === 'toback' ?
                          <span className=' text-yellow-600'>{item.Amount.toLocaleString() + "  THB"}</span> :
                          <span className=' text-green-500'>{item.Amount.toLocaleString() + "  THB"}</span>

                      }
                    </td>
                    <td class="">
                      {item.Transaction}
                    </td>

                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page