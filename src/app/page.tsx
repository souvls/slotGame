import md5 from 'md5';
import useSWR from 'swr'
import Image from 'next/image';
import logo from "../../public/assets/logo/logo.svg";
import superjackpot from "../../public/assets/icon/supper-jackport.png"
import banner1 from "../../public/assets/banner/banner1.jpg";
import banner2 from "../../public/assets/banner/banner2.webp";
import banner3 from "../../public/assets/banner/bsnner3.webp";
import banner4 from "../../public/assets/banner/banner4.webp";
import provider1 from "../../public/assets/banner/provider-logo1.png";
import provider2 from "../../public/assets/banner/provider-logo2.png";
import provider3 from "../../public/assets/banner/provider-logo3.png";
import gamesoftLogo from "../../public/assets/logo/GSS (2).png"
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

const services = [
  {
    path: "#",
    src: "/assets/icon/register.png",
    step: "ขั้นตอนที่ 1",
    title: "ลงทะเบียน",
    label: "บัญชีฟรี",
  },
  {
    path: "#",
    src: "/assets/icon/wallet (1).png",
    step: "ขั้นตอนที่ 2",
    title: "ฝากเงิน",
    label: "บ้านที่อบอุ่น",
  },
  {
    path: "#",
    src: "/assets/icon/money-withdrawal.png",
    step: "ขั้นตอนที่ 3",
    title: "ถอนเงิน",
    label: "ชัยชนะของคุณ",
  },
];
const Banking = [
  {
    path: "#",
    src: "https://www.bcel.com.la/bcel/resources/imgs/logobcel.png",
    title: "BCEL",
    label: "ธนาคารการค้าต่างประเทศ",
  },
  {
    path: "#",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjWvP9Vuczo8OIW4dTPlb5lXdQGn7Bx8dUBA&s",
    title: "APB",
    label: "ธนาคารเพื่อการเกษตร",
  },
  {
    path: "#",
    src: "https://yt3.googleusercontent.com/YOUnaT9ulpK5Tay3Wvm68Oo-QM6v269cVD6IWOlQVo68W_OmLjw843jtNdL94SdgKRtQo89sqw=s900-c-k-c0x00ffffff-no-rj",
    title: "LDB",
    label: "ธนาคารพัฒนาแห่งลาว",
  },
  {
    path: "#",
    src: "https://www.jdbbank.com.la/wp-content/uploads/2019/05/jdb-ico.png",
    title: "JDB",
    label: "ธนาคารร่วมพัฒนา",
  },
];
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
      <nav className='w-full fixed top-0 z-50'>
        <div className=' bg-gradient-to-br from-black to-black border-b-1 via-purple-700'>
          <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto py-4 px-2 lg:px-0 md:px-0'>
            <div className=' flex justify-between items-center'>
              <div>
                <Image src={logo} alt='logo' width={50} />
              </div>
              {user ?
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
      </nav>
      {/* content */}
      <section className=' pt-[90px] bg-gradient-to-bl from-black to-black via-purple-700'>
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
        <Game />

        {/* end credit */}
        <div className='sm:w-full md:w-[960px] lg:w-[1200px] mx-auto'>
          <div className="flex justify-center items-center gap-10 pt-10 pb-5">
            {services.map((items, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-1"
              >
                <div className="  rounded-full h-10 xl:h-18 lg:h-16 md:h-14 xs:h-12 relative ">
                  <div className="bg-purple-500 inset-2 xl:inset-3 absolute blur"></div>
                  <img
                    src={items.src}
                    alt=""
                    className=" w-full h-full  relative"
                  />
                </div>
                <div className="text-gray-100 flex flex-col">
                  <span className="text-[10px] md:text-[15px] lg:text-[20px]">
                    {items.step}
                  </span>
                  <span className="text-[9px] md:text-[12px] lg:text-[18px] font-semibold text-yellow-300 ">
                    {items.title}
                  </span>
                  <span className="text-[9px] md:text-[12px] lg:text-[18px] text-gray-200">{items.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-5 lg:10">
            {Banking.map((items, index) => (
              <div
                key={index}
                className="flex items-center gap-1 xl:gap-2"
              >
                <div className="w-[30px] h-[30px] lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden">
                  <img
                    src={items.src}
                    alt={items.title}
                    className="w-full h-full"
                  />
                </div>
                <div className=' flex flex-col'>
                  <span className="font-semibold text-yellow-300 text-sm md:text-xl lg:text-2xl">{items.title}</span>
                  <span className="text-[6px] md:text-sm lg:text-sm text-white">
                    {items.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-2 xl:my-10  lg:my-8  md:my-6 xs:my-4 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
        </div>
        <div className=' w-[90%] mx-auto'>
          <p className=' text-white text-xl text-center font-bold'>ຄູ່ຄ້າຂອງເຮົາ</p>
          <div>
            <div id="default-carousel" className="relative w-full" data-carousel="slide">
              <div className="relative h-44 lg:h-[500px] overflow-hidden">
                <div className="duration-700 ease-in-out" data-carousel-item>
                  <Image src={provider1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." width={500} height={100} />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <Image src={provider2} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <Image src={provider3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                </div>
              </div>
              <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>

              </div>

              <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className=' w-[90%] pt-5 pb-10 mx-auto text-justify'>
          <h1 className="text-gray-300 text-center font-semibold mt-1 xl:mt-10 lg:mt-8 md:mt-4 xs:mt-2 indent-8 text-[5px]  xl:text-[12px] lg:text-[10px] md:text-[8px] xs:text-[6px] xl:leading-6 lg:leading-5  sm:leading-3  xl:indent-10">
            <span className="text-gray-200 bg-purple-500 bg-opacity-50 rounded-tr-lg rounded px-3 uppercase text-xs xl:text-[26px] lg:text-[22px] md:text-[18px] xs:text-[14px] font-semibold">
              Infinity
            </span>{" "}
            ลิขสิทธิ์ 2024, กลุ่มบริษัท Infinity สงวนลิขสิทธิ์ทั้งหมด Infinity
            Holdings plc จดทะเบียนในตลาดหลักทรัพย์ลอนดอน บริษัท Virtual Global
            Digital Services Limited และ VDSL (International) Limited
            ได้รับใบอนุญาตและถูกควบคุมให้ให้บริการเกมออนไลน์ภายใต้กฎหมายของยิบรอลตาร์
            (หมายเลขใบอนุญาตการเล่นเกมระยะไกล 112 และ 113)
            และไม่มีการรับรองความถูกต้องตามกฎหมายของบริการดังกล่าวในเขตอำนาจศาลอื่นๆ
            ในกรณีที่คุณลงทะเบียนจากแคนาดา บริการของเราให้บริการโดย VDSL
            (International) Limited บริการของเราในสหราชอาณาจักรดำเนินการโดย
            Infinity UK Limited บริษัทที่จดทะเบียนในยิบรอลตาร์ Infinity UK
            Limited ได้รับใบอนุญาตและถูกควบคุมในสหราชอาณาจักรโดย Gambling
            Commission ภายใต้หมายเลขบัญชี 39028
            บริการของเราในประเทศสมาชิกตลาดเดี่ยวในยุโรป
            (ยกเว้นประเทศที่มีใบอนุญาตในท้องถิ่น) ดำเนินการโดย Virtual Digital
            Services Limited บริษัทที่จดทะเบียนในมอลตา
            ซึ่งเป็นส่วนหนึ่งของสหภาพยุโรป Virtual Digital Services Limited
            ดำเนินการภายใต้ใบอนุญาตการเล่นเกมที่ได้รับภายใต้กฎหมายของมอลตา -
            MGA/CRP/543/2018 ที่ออกเมื่อวันที่ 11/10/2019
            ผลิตภัณฑ์การเดิมพันของเราดำเนินการในไอร์แลนด์โดย Infinity (Ireland)
            Limited บริษัทที่จดทะเบียนในมอลตา
            ซึ่งได้รับใบอนุญาตและถูกควบคุมโดยคณะกรรมการรายได้ของไอร์แลนด์
            ที่อยู่ของบริษัทที่ตั้งอยู่ในยิบรอลตาร์ของเราคือ: 601-701 Europort,
            Gibraltar ที่อยู่ของบริษัทที่ตั้งอยู่ในมอลตาของเราคือ: ชั้น 7,
            Tagliaferro Business Centre, 14, High Street, Sliema SLM 1549, Malta
            การพนันอาจทำให้เสพติดได้ โปรดเล่นอย่างมีความรับผิดชอบ
            สำหรับข้อมูลเพิ่มเติมเกี่ยวกับเครื่องมือสนับสนุน กรุณาเยี่ยมชมหน้า
            Responsible Gambling ของเรา
          </h1>
        </div>
      </section>
      <section className=' bg-gray-900 p-5'>
        <div className=' w-[90%] mx-auto flex justify-between'>
          <div className='w-full'>
            <p className=' text-yellow-300 text-xl font-bold text-center'>ຄູ່ຄ້າລາຍໃຫຍ່</p>
            <div className=' flex flex-col items-center'>
              <Image src={gamesoftLogo} alt='logo' width={100} />
              <Link className=' text-yellow-300 text-sm font-bold text-center' href={"https://www.gamingsoft.com/"}>www.gamingsoft.com</Link>
            </div>
          </div>
          <div className='w-full'>
            <p className=' text-yellow-300 text-xl font-bold text-center'>ພັດທະນາໂດຍ</p>
            <p className=' text-blue-500 text-center'>Telegram:@mondev20</p>
          </div>
        </div>
      </section>
      <section className=' bg-black py-2'>
        <p className=' text-gray-300 text-center'>copyright @ mondev2024</p>
      </section>
    </>
  )
}