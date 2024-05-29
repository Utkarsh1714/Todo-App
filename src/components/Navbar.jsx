import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9 cursor-pointer">
            <li className='hover:font-bold transition-all'>Home</li>
            <li className='hover:font-bold transition-all'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar