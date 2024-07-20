import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
        <div className="logo"><span className="font-bold text-xl mx-9">Utasks</span></div>
        <ul className='flex md:gap-8 md:mx-9 mr:3 mr-3 gap-5'>
            <li className='cursor-pointer hover:font-bold transition-all hover:text-red-500'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-300 hover:text-red-500'>Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
