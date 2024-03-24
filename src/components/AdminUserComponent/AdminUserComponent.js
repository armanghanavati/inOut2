import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import { useMyContext } from '../contextProvider/MyContext';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import axios from 'axios';

const AdminUserComponent = () => {
    const userId=useParams().userId
    const[users,setUsers]=useState([])
    useEffect(()=>{
        const headers = {
          'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))   
        };
        axios.get('https://www.auto.fanwebco.com/InOut_api/api/Account/GetAllUsers',{headers:headers})
        .then( res=> setUsers(res.data.users))
  
    },[])
    // const { users,setUsers } = useMyContext();
    const userr= users?.filter(user => user.id===userId)
    
    return (
        <div>
            <div className='bg-purple-500 flex items-center justify-between px-5 py-4'>
                <Link to='/adminusers' className='border p-3 bg-white rounded-full'> 
                     <FaAngleRight color='purple'size='25px' />
                </Link>
                 <p className='font-bold text-white'>لیست کارکنان </p>
                 <div></div>
            </div>
            <div className='flex flex-col px-7  mt-2 '>
                <div className='flex items-center justify-between py-2 border-b '>
                           <span>نام</span>
                           <span>{userr[0]?.firstName}</span>
                </div>
                <div className='flex items-center justify-between py-2 border-b'>
                            <span>نام خانوادگی</span>
                           <span>{userr[0]?.family}</span>
               </div>
               <div className='flex items-center justify-between py-2 border-b'>
                           <span>کد ملی</span>
                           <span>{userr[0]?.melliCode}</span>
               </div>
               <div className='flex items-center justify-between py-2 border-b'>
                           <span>شماره تلفن</span>
                           <span>{userr[0]?.phoneNumber}</span>
               </div>
               <div className='flex items-center justify-between py-2 border-b'>
                           <span>جنسیت</span>
                           <span>{userr[0]?.gender ? 'مرد' :"زن"}</span>
              </div>
              
              <div className='flex items-center justify-between py-1'>
                           <span> وضعیت</span>
                           <span>{userr[0]?.isactive ?'غیرفعال':'فعال'}</span>
              </div>
             
            </div>
            <div className='flex items-center justify-between gap-x-2 mt-[50px] mb-20 px-3'>
                <button className=' w-1/3 border border-purple-500 bg-purple-500 text-white p-2 rounded-lg'>قطع همکاری</button>
                <button className=' w-1/3 border border-purple-500 bg-purple-500 text-white p-2 rounded-lg'>تعیین شیفت</button>
                <button className= 'w-1/3 border border-purple-500 bg-purple-500 text-white p-2 rounded-lg'>ویرایش مشخصات</button>
            </div>
            <AdminNavbar/>
        </div>
    );
};

export default AdminUserComponent;