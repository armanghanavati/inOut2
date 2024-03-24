import React, { useState } from 'react';
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineMyLocation } from "react-icons/md";
import { BsRadioactive } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom/dist';
import { FaAngleDown } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
const AdminLocationItem = ({id,name,address,isActive,userLocationUsersId}) => {
    
  
    const[open,setOpen]=useState('ali')
    const openHandler=()=>{
        if(open ===`${id}`){
            setOpen('ali')
        }
        else{
            setOpen(`${id}`)
        }
    }
    // کاربران حاضر در آن لوکیشن
    const[employers,setEmployers]=useState([])
    useEffect(()=>{
        const headers = {
            'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')) , 
            'Content-Type': 'application/json'    
        }
          axios.get(`https://auto.fanwebco.com/InOut_api/api/UserLocationController/LocationUsers?locationid=${id}`,{headers:headers})
          .then(res=>setEmployers(res.data.usersList))
          .catch(error => {
            Swal.fire({
                title:'Error occurd',
                icon:'error'
            })
          })
    },[employers])
    const navigate=useNavigate()
    // عملیات حذف لوکیشن کاربر
    const deleteHandler=()=>{
        Swal.fire({
            title: "آیا از حذف لوکیشن اطمینان دارید؟",
            showDenyButton: true,
            confirmButtonText: "بله",
            denyButtonText: 'خیر'
        }).then((result) => {
            if (result.isConfirmed) {
                
                const headers = {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')) , 
                    'Content-Type': 'application/json'    
                };
                axios.delete(`https://auto.fanwebco.com/InOut_api/api/UserLocationController/DeleteUserLocation?userlocationid=${id}`,{headers:headers})
                .then (res =>Swal.fire({
                    title:"لوکیشن حذف شد",
                    icon:'success',
                    showConfirmButton:false,
                    timerProgressBar:true,
                    timer:1500
                }),
                navigate('/admin')
                )
                
                .catch(error=>Swal.fire({
                    text:'An Error accord'
                }))
            } else if (result.isDenied) {
                Swal.fire({
                    text:'لوکیشن حذف نشد',
                    icon:'error',
                    showConfirmButton:false,
                    timerProgressBar:true,
                    progressBarColor: '#ff0000',
                    timer:1500
                })
            }
        });  
    }
    return (
        <div className='flex flex-col gap-y-2 border-2 bg-purple-100 border-zinc-200 shadow-md rounded-xl p-2'>
            <p className='flex items-center gap-x-2'><MdLocationOn size='25px' color='green'/> نام لوکیشن: {name}</p>
            <p className='flex items-center gap-x-2'> <MdOutlineMyLocation size='25px' color='green' /> آدرس : {address}  </p>
            <p className='flex items-center gap-x-2'> <BsRadioactive size='25px' color='green'/>وضعیت:{isActive ? 'فعال':"غیر فعال"}</p>
            <div onClick={openHandler} className='flex items-center justify-between relative pl-3 bg-zinc-300 p-2 '><div className='flex items-center gap-x-2'> <FaUsers size='25px' color='black'/>کاربران</div> <FaAngleDown />{<div className={'border transition-all p-2 bg-zinc-100 absolute w-full  md:w-[465px] right-0 top-10 flex flex-col'+(open===`${id}` ? ' opacity-100 visible':' invisible opacity-0')} >{employers?.map(user =>(
              <div key={user.id} className='flex items-center gap-x-2 hover:text-white hover:bg-zinc-600 pr-3'><span > {user.firstName}</span><span> {user.family}</span></div>
            ))}</div>}</div>
            <div className='flex items-center mt-4 justify-between px-3'>
                <Link onClick={deleteHandler} className='w-[40%]'>
                  <button className=' w-full flex items-center justify-center gap-x-2 md:gap-x-4 border border-red-500 bg-red-500 text-white px-1 md:px-3 py-1 rounded-xl text-lg'>حذف <RiDeleteBin2Line size='25px' /></button>
                </Link>
                <Link className='w-[40%]' to={`/admineditlocation/${id}`}>
                      <button className=' w-full flex items-center justify-center gap-x-2 md:gap-x-4 border border-yellow-500 bg-yellow-500 text-white px-1 md:px-3 py-1 rounded-xl text-lg'>ویرایش <FiEdit size='25px' /></button>
                </Link>

            </div>
            
        </div>
    );
};

export default AdminLocationItem;