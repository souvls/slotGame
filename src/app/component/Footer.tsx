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
              <a href='#' className=' flex justify-start items-center gap-2 text-sm'> <FaWhatsapp size={25} color='green' /> 02012345678</a>
              <a href='#' className=' flex justify-start items-center gap-2 text-sm'> <CiFacebook size={25} color='blue' /> INFINITY999</a>

            </div>
          </div>
          <div>
            <p className=' font-bold text-lg text-amber-400'>ຜູ້ໃຫ້ບໍລິການເກມ</p>
            <div className=' px-5'>
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