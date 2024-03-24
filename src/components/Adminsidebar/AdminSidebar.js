import React from 'react';
import { AiFillDashboard } from "react-icons/ai";
import { LuActivitySquare } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";
import ax from '../../asset/logo.png'
const AdminSidebar = () => {
    return (
        <div>
            <div className='fixed right-0 top-0 bottom-0 h-screen w-44 bg-purple-500 '>
                <div className='flex items-center gap-x-5'>
                     <p className='py-4 pr-3 font-bold text-white'>fanwebco</p>  
                     <img className='w-12 h-12' src={ax} alt=''/>
                </div>
                <div className='text-white flex flex-col gap-y-7 px-2 text-[12px]'>
                    <div >
                        <Link className='flex items-center gap-x-2'> 
                            <AiFillDashboard size='15px' />
                            <p>داشبورد</p>
                        </Link>
                    </div>
                    <div>
                         <Link className='cursor-pointer flex items-center gap-x-2'>
                                <LuActivitySquare size='15px'/>
                                <p>کسب وکار</p>
                         </Link>

                    </div>
                    <div>
                        <Link className='flex items-center justify-between gap-x-5'>
                             <div className='flex items-center gap-x-2'>
                                 <FaUsers size='15px ' />
                                 <p>لیست کارمندان </p>
                             </div>
                             <FaAngleLeft color='white ' size='20px'/>
                        </Link>
                    </div>
                    <div>
                       <Link className='flex items-center justify-between gap-x-5'>
                             <div className='flex items-center gap-x-2'>
                                 <FaUsers size='15px ' />
                                 <p>لیست شیفت ها </p>
                             </div>
                             <FaAngleLeft color='white ' size='20px'/>
                        </Link>
                    </div>
                    <div>
                        <Link className='flex items-center justify-between gap-x-5'>
                             <div className='flex items-center gap-x-2'>
                                 <FaUsers size='15px ' />
                                 <p>گزارش ها  </p>
                             </div>
                             <FaAngleLeft color='white ' size='20px'/>
                        </Link>
                    </div>
                    <div>
                        <Link className='flex items-center justify-between gap-x-5'>
                             <div className='flex items-center gap-x-2'>
                                 <FaUsers size='15px ' />
                                 <p>گزارش گیری   </p>
                             </div>
                             <FaAngleLeft color='white ' size='20px'/>
                        </Link>
                    </div>
                    <div>
                        <Link className='flex items-center justify-between gap-x-5'>
                             <div className='flex items-center gap-x-2'>
                                 <FaUsers size='15px ' />
                                 <p>لیست درخواست ها </p>
                             </div>
                             <FaAngleLeft color='white ' size='20px'/>
                        </Link>
                    </div>
                    <div>
                        <Link className='flex items-center justify-between gap-x-5'>
                             <div className='flex items-center gap-x-2'>
                                 <FaUsers size='15px ' />
                                 <p>لیست دستگاه ها </p>
                             </div>
                             <FaAngleLeft color='white ' size='20px'/>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminSidebar;