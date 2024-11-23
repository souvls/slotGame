"use client"
import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiRadioButtonLine } from "react-icons/ri";
const page = () => {
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  const [currentUserList, setCurrentUserList] = useState([]);
  const [pageLength, setPageLength] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(0);
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
            setUserList(result.result);
            // console.log(result)
            setPageLength(Math.ceil(result.result.length / 20));
            setCurrentUserList(result.result.slice(0, 20))
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

  }, []);
  const handlePage = (index) => {
    setPageCurrent(index);
    if (index === 0) {
      setCurrentUserList(userList.slice(0, 20))
    } else {
      setCurrentUserList(userList.slice(index * 20, (index * 20 ) + 20))
    }
  }
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
              currentUserList.map((item, index) => {
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
                      <Link href={"/member/office/users/edit/" + item._id + "/" + item.Username + "/" + item.Password} className=' inline-block p-2 bg-red-500 text-white rounded-lg'><p>ແກ້ໄຂ</p></Link>
                    </td>
                    <td>
                      {item.status && <RiRadioButtonLine color='green' />}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <div className=' flex justify-center items-center gap-3 mt-5'>
          {Array(pageLength).fill().map((item, index) => {
            return (
              <>
                <button onClick={() => handlePage(index)} className={`${index === pageCurrent ? 'bg-sky-500 text-white' : ' bg-white border border-sky-500'} p-2 rounded-lg`}>{index + 1}</button>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default page