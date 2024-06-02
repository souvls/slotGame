import React from 'react'
import { GiOverInfinity } from "react-icons/gi";
import { PiUserCircleBold } from "react-icons/pi";
import { LiaCoinsSolid } from "react-icons/lia";
import '../component/Nav_bar.css'
const Nav_bar = () => {
    return (
        <nav className=' w-full fixed top-0 z-40'>
            <div className='bg-[#151515] py-2 lg:py-4'>
                <div className=' container w-full lg:w-[1000px] mx-auto'>
                    <div className=' flex justify-between items-center'>
                        <div className=' flex flex-col items-center px-2'>
                            <GiOverInfinity size={30} color={'gold'} />
                            <h1 className=' text-yellow-300 text-sm'> INFINITY SLOT 999</h1>
                        </div>
                        <div className='px-5'>
                            <div className='flex justify-start items-center gap-2'>
                                <PiUserCircleBold size={20} color={'gold'} />
                                <span className=' text-yellow-300 text-sm'>abcd001</span>
                            </div>
                            <div className='flex justify-start items-center gap-2'>
                                <LiaCoinsSolid size={20} color={'gold'} />
                                <span className=' text-yellow-300 text-sm'>1,000,345.34</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' bg-red-500'>
                <div className=' container w-full lg:w-[1000px] mx-auto'>
                    <div className="slider">
                        <div className="text">
                            <p>ກະລຸນາກວດສອບ ການໂອນເງິນທຸກຄັ້ງ ຈະບໍ່ມີການຮັບຜິດຊອບທຸກກໍລະນີ</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Nav_bar