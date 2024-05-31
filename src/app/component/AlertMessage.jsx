
import React, { useEffect, useState } from 'react'

const AlertMessage = ({ message,status}) => {
  const [statuss,setStatus] = useState(false);
  useEffect(()=>{
    setStatus(status);
  },[])
  const handdleOK = () =>{
    setStatus(false);
  }
  return (
    <div className={`w-full h-full fixed inset-0 bg-opacity-50 bg-black  z-50 ${statuss ? '': 'hidden'} duration-1000 ease-in-out`}>
      <div className='w-full mt-32 p-5 md:w-[500px] lg:w-[500px] mx-auto bg-rew bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg'>
        <div className='border-b-2 border-yellow-200 pt-3 pb-5'>
          <p className=' text-lg font-bold text-center text-yellow-400'>MESSAGE</p>
        </div>
        <div>
          <p className='pt-5 text-center text-sm'>{message}</p>
        </div>
        <div className='flex justify-center py-5'>
          <button onClick={handdleOK}  className=' bg-white text-yellow-500 px-3 py-2 rounded-lg'>OK</button>
        </div>
      </div>
    </div>
  )
}

export default AlertMessage