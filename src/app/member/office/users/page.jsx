"use client"
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
      await fetch("/api/member/my-user", requestOptions)
        .then((response) => response.json())
        .then((result) => {

          if (result.status === 'ok') {
            setUserList(result.result)
            setLoading(false);
          } else {
            setLoading(false);
            if (result.message === 'notoken') {
              localStorage.clear();
              router.push("/member");
            }
          }
        })
        .catch((error) => console.error(error));
    }

    fetchdata();

  }, [])
  return (
    <div>
      <div className='w-full p-2 border-b-2'>
        <p>ລາຍຊື່ User</p>
      </div>
      <div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-white uppercase bg-green-600">
            <tr>
              <th scope="col" class=" py-3">
                Username
              </th>
              <th scope="col" class="py-3">
                Password
              </th>
              <th scope="col" class="py-3">
                Credit
              </th>
              <th scope="col" class="py-3">
                Desposit
              </th>
              <th scope="col" class="py-3">
                Withdraw
              </th>
              <th scope="col" class="py-3">
                Edit
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
              userList.map((item, index) => {
                return (
                  <tr key={index} class="bg-white border-b hover:bg-slate-200">
                    <td class="py-3 ">
                      <p>{item.Username}</p>
                    </td>
                    <td class="">
                      {item.Password}
                    </td>
                    <td class="">
                      {item.Amount.toLocaleString() + " THB"}
                    </td>
                    <td class="">
                      <Link href={"/member/office/users/addcredit/" + item._id + "/" + item.Username} className=' inline-block p-2 bg-green-500 text-white rounded-lg'><p>ເຕີມເງິນ</p></Link>
                    </td>
                    <td class="">
                      <Link href={"/member/office/users/withdrawcredit/" + item._id + "/" + item.Username + "/" + item.Amount} className=' inline-block p-2 bg-blue-500 text-white rounded-lg'><p> ຖອນເງິນ</p></Link>
                    </td>
                    <td class="">
                      <Link href={"/member/office/users/edit/" + item._id+"/"+item.Username+"/"+item.Password} className=' inline-block p-2 bg-red-500 text-white rounded-lg'><p>ແກ້ໄຂ</p></Link>
                    </td>
                  </tr>
                )
              })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page