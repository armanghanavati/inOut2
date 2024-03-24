import React from 'react';
import { IoMdMore } from "react-icons/io";
import { GiGears } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import './AdminNavbar.css'
import { NavLink } from 'react-router-dom';

const AdminNavbar = () => {
    return (
        <div>
            <div className='py-2 px-5 flex justify-between z-[2] fixed bottom-0 right-0 left-0 bg-zinc-600 text-white'>
                <NavLink to='/admin' className='flex flex-col items-center justify-center gap-y-2 hover:text-purple-500'>
                    <IoMdMore size='25px'  />
                    <span>سایر</span>
                </NavLink>
                <NavLink to='/adminadvanced' className='flex flex-col items-center justify-center gap-y-2 hover:text-purple-600'>
                    <GiGears size='25px'  />
                    <span>پیشرفته</span>
                </NavLink>
                <NavLink to='/adminreport' className='flex flex-col items-center justify-center gap-y-2 hover:text-purple-600'>
                    <FaChartLine size='25px'  />
                    <span>گزارش</span>
                </NavLink>
                <NavLink to='/adminusers' className='flex flex-col items-center justify-center gap-y-2 hover:text-purple-600'>
                    <FaUsers size='25px'  />
                    <span>کارکنان</span>
                </NavLink>
                <NavLink to='/admindailyattendances' className='flex flex-col items-center justify-center gap-y-2 hover:text-purple-600'>
                    <FaRegCalendarDays  size='25px'  />
                    <span>امروز</span>
                </NavLink>

            </div>

            
        </div>
    );
};

export default AdminNavbar;