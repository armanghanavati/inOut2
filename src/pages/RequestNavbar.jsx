import React from 'react';
import { NavLink } from 'react-router-dom';
import './RequestNavbar.css'

const RequestNavbar = () => {
    return (
        <div className='list text-white z-[50]  fixed right-0 left-0 top-0 flex bg-purple-600  border-t-4 border-purple-800 mt-[76px]'>
            <NavLink to='/leave' className='w-[33.33%] text-center py-2 '>مرخصی</NavLink>
            <NavLink to='/mission' className='w-[33.33%] text-center py-2'>ماموریت</NavLink>
            <NavLink to='/home' className='w-[33.33%] text-center py-2'>ورود / خروج</NavLink>
       </div>
    );
};

export default RequestNavbar;