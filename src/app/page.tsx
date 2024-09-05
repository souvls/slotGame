import md5 from 'md5';
import useSWR from 'swr'
import Image from 'next/image';
import logo from "../../public/assets/logo/logo.svg";
import superjackpot from "../../public/assets/icon/supper-jackport.png"
import banner1 from "../../public/assets/banner/banner1.jpg";
import banner2 from "../../public/assets/banner/banner2.webp";
import banner3 from "../../public/assets/banner/bsnner3.webp";
import banner4 from "../../public/assets/banner/banner4.webp";
import { GiOverInfinity } from "react-icons/gi";
import { PiUserCircleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { MdCasino } from "react-icons/md";
import { GiSloth } from "react-icons/gi";
import { RiVipCrownLine } from "react-icons/ri";
import { IoFishOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import Link from 'next/link';
import { cookies } from 'next/headers';
import { json } from 'stream/consumers';
import User from "../Models/User"
import Logout from './component/Logout';
import Game from './component/Game';

const menu = [
  // { path: "#", icon: <AiOutlineHome />, label: "หน้าแลก" },
  // { path: "#", icon: <CiMobile3 />, label: "มือถือ" },
  // { path: "#", icon: <MdOutlineSportsSoccer />, label: "กีฬา", },
  // { path: "#", icon: <IoGameController />, label: "อีสปอร์ต", },
  // { path: "#", icon: <MdCasino />, label: "คาสิโน" },
  { path: "#", icon: <GiSloth />, label: "สล็อต" },
  // { path: "#", icon: <IoFishOutline />, label: "ปลา" },
  { path: "#", icon: <RiVipCrownLine />, label: "วีไอพี" },
  { path: "#", icon: <CiGift />, label: "โปรโมชั่น" },
];
async function getUser() {
  const cookieStore = cookies();
  const token = await cookieStore.get('userdata')?.value;
  return token;
}
async function getAmount() {
  try {
    const data = await getUser();
    if (data) {
      const token = JSON.parse(data);
      const user = await User.findById(token.id);
      return user;
    }
  } catch (err) {
    return null
    throw err;
  }
}
export default async function Home() {
  const user = await getAmount();
  return (
    <>
      {/* Header */}
      <div className=' bg-gradient-to-br from-black to-black border-b-1 via-purple-700'>
        <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto py-4 px-2 lg:px-0 md:px-0'>
          <div className=' flex justify-between items-center'>
            <div>
              <Image src={logo} alt='logo' width={50} />
            </div>
            {user?
              <div className=' flex justify-end items-center gap-3'>
                <div className=''>
                  <div className='flex justify-end items-center gap-2'>
                    <span className=' text-yellow-300 text-sm'>{user?.Username}</span>
                    <PiUserCircleBold size={20} color={'gold'} />
                  </div>
                  <div className='flex justify-end items-center gap-2'>
                    <span className=' text-yellow-300 text-sm'>{user?.Amount.toLocaleString()}</span>
                    <LiaCoinsSolid size={20} color={'gold'} />
                  </div>
                </div>
                <Logout />
              </div>
              :
              <div className=' flex gap-2'>
                <Link href={"/user"} className="px-3 flex items-center text-sm  rounded-full duration-500 hover:bg-yellow-400 hover:text-gray-950 bg-gray-950 text-white">
                  <span>LOGIN</span>
                </Link>
                <Link href={"https://api.whatsapp.com/send?phone=8562056388013"} className="flex items-center px-3 text-sm rounded-full bg-yellow-400">
                  JOIN NOW
                </Link>
                <div className=' flex items-center '>
                  <img
                    src="https://cdn-icons-png.freepik.com/512/3973/3973555.png"
                    alt=""
                    width={40}
                  />
                  <span className=" text-white ">TH</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {/* content */}
      <section className=' bg-gradient-to-bl from-black to-black via-purple-700'>
        <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
          <div className='w-[90%] p-3 mx-auto border-2 border-purple-600 bg-gradient-to-r from-black to-black via-purple-700'>
            {/* jackport */}
            <div className=' flex justify-center items-center gap-8'>
              <div className='w-[50px] h-[50px] lg:w-[80px] lg:h-[80px]  relative'>
                <div className=" absolute bg-yellow-500 inset-1 blur  "></div>
                <Image
                  src={superjackpot} alt=''
                  className='w-full border border-purple-400 rounded-full relative'
                />
              </div>
              <div className=' flex justify-start gap-1'>
                <div className=' relative'>
                  <p className=" absolute bg-purple-500 inset-0 blur "></p>
                  <p className=' text-xl  text-white py-3 px-2 border-2 border-purple-400 bg-gray-900  rounded-lg relative'>9</p>
                </div>
                <div className=' relative'>
                  <p className=" absolute bg-purple-500 inset-0 blur "></p>
                  <p className=' text-xl  text-white py-3 px-2 border-2 border-purple-400 bg-gray-900  rounded-lg relative'>9</p>
                </div>
                <div className=' relative'>
                  <p className=" absolute bg-purple-500 inset-0 blur "></p>
                  <p className=' text-xl  text-white py-3 px-2 border-2 border-purple-400 bg-gray-900  rounded-lg relative'>9</p>
                </div>
                <div className=' relative'>
                  <p className=" absolute bg-purple-500 inset-0 blur "></p>
                  <p className=' text-xl  text-white py-3 px-2 border-2 border-purple-400 bg-gray-900  rounded-lg relative'>9</p>
                </div>
                <div className=' relative'>
                  <p className=" absolute bg-purple-500 inset-0 blur "></p>
                  <p className=' text-xl  text-white py-3 px-2 border-2 border-purple-400 bg-gray-900  rounded-lg relative'>9</p>
                </div>
              </div>
            </div>
          </div>
          <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
            <div className='w-[90%] mx-auto border-2 border-purple-600'>
              <Image src={banner1} alt='' className='w-full' />
            </div>
          </div>
          <div className='w-[90%] p-3 mx-auto border-2 border-purple-600 bg-gradient-to-r from-black to-black via-purple-700'>
            <p className=' text-yellow-300 font-bold text-3xl text-center'>WELCOME TO INFINITY999</p>
          </div>
          <div className='w-[90%] mx-auto border-2 border-purple-600 bg-gradient-to-r from-black to-black via-purple-700'>
            <div className=' flex justify-between gap-2'>
              <div>
                <Image src={banner2} alt='..' className='w-full' />
              </div>
              <div>
                <Image src={banner3} alt='..' className='w-full' />
              </div>
              <div>
                <Image src={banner4} alt='..' className='w-full' />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* menu */}
      <section className=' bg-gradient-to-bl from-black to-black via-purple-700 '>
        <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto border-b '>
          <div className=' w-[90%] py-3 mx-auto flex justify-center items-center gap-8 '>
            {menu.map((item, index) => {
              return (
                <Link key={index} href={item.path} className={"flex flex-col items-center text-yellow-200 duration-500 transform hover:scale-125  hover:text-yellow-300 font-bold "}>
                  <span className='text-[40px] lg:text-[50px]'>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <Game/>
      </section>

    </>
  )
}