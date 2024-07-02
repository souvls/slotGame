import React from 'react'
import LogoGM from '../../../public/assets/gameserviecLogo/GS-Logo-hori-min.png'
import { FaWhatsapp } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import Image from 'next/image';
const Footer = () => {
  return (
    <div>
      <div className='py-20 px-4 w-full bg-blue-950 text-white text-center'>
        <div className=' flex justify-between items-center'>
          <div>
            <p className=' font-bold text-lg text-amber-400'>ເຕີມເກມ</p>
            <div>
              <a href='#' className=' flex justify-start items-center gap-2 text-xl'> <FaWhatsapp size={25} color='green' /> 56388013</a>
              <a href='#' className=' flex justify-start items-center gap-2 text-xl'> <CiFacebook size={25} color='blue' /> INFINITY999</a>

            </div>
          </div>
          <div>
            <p className=' font-bold text-lg text-amber-400'>ຜູ້ໃຫ້ບໍລິການເກມ</p>
            <div>
              <Image alt="" src={LogoGM} />
            </div>
          </div>
        </div>
      </div >
      <div className=' w-full p-5 bg-black'>
        <p className='text-white text-center'>Power by: mon dev @copyright2024</p>
        <p className='text-white text-center'>My telegram: @mondev20</p>
      </div>
    </div>
  )
}

export default Footer