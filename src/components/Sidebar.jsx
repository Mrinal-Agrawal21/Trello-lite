import React, { useState } from 'react'
import { Avatar } from 'antd';
import AvatarImg from '../assets/avatar.jpg';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button - positioned on the right */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className="p-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar - positioned on the right side */}
      <div className={`sidebar fixed lg:relative lg:block ${
        isOpen ? 'block' : 'hidden'
      } w-64 bg-red-100 p-5 z-40 lg:z-auto transition-all duration-300 ease-in-out right-0 lg:right-auto`}>
        {/* profile */}
        <div className="profile flex gap-4 lg:gap-6 items-center">
            <Avatar size={54} src={AvatarImg} className='m-2 lg:m-4' />
            <h3 className='font-bold text-sm lg:text-base'>Mrinal Agrawal</h3>
        </div>
        <hr className='mt-4' />
        {/* menu */}
        <div className="menu mt-[15vh] lg:mt-[25vh]">
            <h1 className='text-xl lg:text-2xl underline'>Pages</h1>
            <ul className='mt-4 ml-2 lg:ml-4'>
                <Link to='/' onClick={() => setIsOpen(false)}>
                  <li className='text-base lg:text-lg font-semibold mb-4 cursor-pointer hover:text-red-400 transition-colors'># Life</li>
                </Link>
                <Link to='/college' onClick={() => setIsOpen(false)}>
                  <li className='text-base lg:text-lg font-semibold mb-4 cursor-pointer hover:text-red-400 transition-colors'># College</li>
                </Link>
                <Link to='/work' onClick={() => setIsOpen(false)}>
                  <li className='text-base lg:text-lg font-semibold mb-4 cursor-pointer hover:text-red-400 transition-colors'># Work</li>
                </Link>
                <Link to='/chores' onClick={() => setIsOpen(false)}>
                  <li className='text-base lg:text-lg font-semibold mb-4 cursor-pointer hover:text-red-400 transition-colors'># Chores</li>
                </Link>
            </ul>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
