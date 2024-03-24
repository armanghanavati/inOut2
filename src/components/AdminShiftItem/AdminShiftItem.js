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

const AdminShiftItem = ({name,id,shiftType,shiftUsers}) => {
    const navigate=useNavigate()
    const[open,setOpen]=useState('ali')
    const openHandler=()=>{
        if(open ===`${id}`){
            setOpen('ali')
        }
        else{
            setOpen(`${id}`)
        }
    }
    const deleteshiftHandler=()=>{
        Swal.fire({
            title: "آیا از حذف شیفت اطمینان دارید؟",
            showDenyButton: true,
            confirmButtonText: "بله",
            denyButtonText: 'خیر'
        }).then((result) => {
            if (result.isConfirmed) {
                const headers = {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')) , 
                    'Content-Type': 'application/json'    
                };
                axios.delete(`https://auto.fanwebco.com/InOut_api/api/ShiftController/DeleteShift?shiftid=${id}`,{headers:headers})
                .then (res =>Swal.fire({
                    title:"شیفت حذف شد",
                    icon:'success',
                    showConfirmButton:false,
                    timerProgressBar:true,
                    timer:1500
                }),
                // navigate('/adminadvanced')
                )
                
                .catch(error=>Swal.fire({
                    text:'An Error accord'
                }))
            } else if (result.isDenied) {
                Swal.fire({
                    text:'شیفت حذف نشد',
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
        <div className='border p-4 flex justify-between bg-purple-200 '>
            <div className=''>
                <p>نام شیفت :{name}</p>
                <p className='my-3'>نوع شیفت :  {shiftType===0 && 'تمام وقت'}{shiftType===1 && 'پاره وقت'}</p>
                <div>
                
            <div onClick={openHandler} className='flex w-[200px] items-center justify-between relative pl-3 bg-zinc-300 p-2 '><div className='flex w-full items-center gap-x-2'> <FaUsers size='25px' color='black'/>کاربران</div> <FaAngleDown />{<div className={'border transition-all p-2 bg-zinc-100 absolute w-full  right-0 top-10 flex flex-col gap-y-3 h-[150px] overflow-y-scroll  '+(open===`${id}` ? ' opacity-100 visible':' invisible opacity-0')} >{shiftUsers?.map(shift =>(
              <div className='flex   items-center gap-x-2 hover:text-white hover:bg-zinc-600 pr-3'><span > {shift.fullName}</span></div>
            ))}</div>}</div>
                </div>
            </div>
            <div className='flex flex-col gap-y-3'>
                <button onClick={deleteshiftHandler} className='border p-2 bg-red-500 text-white rounded-lg w-full '>حذف</button>
                <Link to={`/admineditshift/${id}`}>
                    <button  className='border p-2 bg-blue-500 text-white rounded-lg w-full'>ویرایش</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminShiftItem;