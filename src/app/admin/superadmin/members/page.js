"use client"
import React, { useEffect, useState } from 'react'
import Spinner from '@/app/component/Spinner';
import { FaCirclePlus } from "react-icons/fa6";
import Swal from 'sweetalert2';
import Link from 'next/link';
export const page = () => {
    const [members, setMember] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchdata();
        setLoading(false);
    }, [])
    const fetchdata = async () => {
        const data = JSON.parse(localStorage.getItem("userToken"))
        const myHeaders = new Headers();
        myHeaders.append("refreshtoken", "Bearer " + data.refreshtoken);
        myHeaders.append("authorization", "Bearer " + data.accesstoken);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/superadmin/admins", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setMember(result.result);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    const handdleAdCredit = (id, Username) => {
        Swal.fire({
            title: "Add credit " + Username,
            text: "ຈຳນວນເງິນຈະຖືກບວກໃສ່ຈຳນວນເກົ່າ",
            input: "number",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "ເພີ່ມ",
            showLoaderOnConfirm: true,
            preConfirm: async (num) => {
                setLoading(true);
                const data = JSON.parse(localStorage.getItem("userToken"))
                const myHeaders = new Headers();
                myHeaders.append("refreshtoken", "Bearer " + data.refreshtoken);
                myHeaders.append("authorization", "Bearer " + data.accesstoken);

                const requestOptions = {
                    method: "PATCH",
                    headers: myHeaders,
                    redirect: "follow"
                };

                await fetch(process.env.NEXT_PUBLIC_API_NAME + "/api/superadmin/admin/add-credit/" + id + "/" + num, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        setLoading(false);
                        fetchdata();
                        Swal.fire({
                            title: "ເຕີມເຄດີດ",
                            text: result.msg,
                            icon: "sucess"
                        });
                    })
                    .catch((error) => {
                        setLoading(false);

                        Swal.fire({
                            title: "ເຕີມເຄດີດ",
                            text: error,
                            icon: "error"
                        });
                        console.error(error)
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }
    return (
        <div>
            {loading && <Spinner />}
            <div className='w-full p-2 border-b-2'>
                <p>ລາຍຊື່ເອເຢັ້ນ</p>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* <th scope="col" class="px-6 py-3">
                                ID
                            </th> */}
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            {/* <th scope="col" class="px-6 py-3">
                                Password
                            </th> */}
                            <th scope="col" class="px-6 py-3">
                                Credit
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>ເຕີມ</p>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>ຖອນ</p>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Edit
                            </th>
                            {/* <th scope="col" class="px-6 py-3">
                                Status
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && members && members.map((item, index) => {
                            return (
                                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {/* <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item._id}
                                    </th> */}
                                    <td class="px-6 py-4">
                                        {item.Username}
                                    </td>

                                    <td class="px-6 py-4">
                                        {item.Amount.toLocaleString()}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button className=' flex justify-start items-center bg-blue-500 text-white p-2 rounded-lg' onClick={() => handdleAdCredit(item._id, item.Username)}><p>ເຕີມ</p></button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button className=' flex justify-start items-center bg-yellow-500 text-white p-2 rounded-lg' onClick={() => handdleAdCredit(item._id, item.Username)}><p>ຖອນ</p></button>
                                    </td>
                                    <td class="px-6 py-4">
                                        <Link href={"/admin/superadmin/members/edit/"+item._id} className='text-blue-500'><p>ແກ້ໄຂ</p></Link>
                                    </td>
                                    {/* <td class="px-6 py-4">
                                        <label class="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value={item.status} class="sr-only peer"/>
                                                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                                        </label>
                                        {item.status}
                                    </td> */}
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
