"use client"
import Cookies from 'js-cookie';
import React from 'react'
const handleLogout = () => {
  Cookies.remove('userdata');
  window.location.href = "/"
}

const Logout = () => {
  return (
    <div onClick={handleLogout} className=' flex items-center '>
      <button className=' p-3 bg-red-500 rounded-full text-white'>Logout</button>
    </div>
  )
}

export default Logout