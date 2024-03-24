import React, { useState } from 'react';
import './Leaverequest.css'
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import MyNavabar from '../components/MyNavabar/MyNavabar';
import DatePicker from 'react-multi-date-picker';
import { FaCalendarAlt } from 'react-icons/fa';
const Leaverequest = () => {
    const [msg, setMsg] = useState('')
    const [mor, setMor] = useState('')
    const msgHandler = (e) => {
        setMsg(e.target.value)
    }
    const morHandler = (e) => {
        setMor(e.target.value)
    }
    return (
        <div>
            <MyNavabar />
            <div className='mt-20 px-4'>
                <p className='mb-4'>علی کرمی</p>
                <div className='flex items-center gap-x-4 mb-5'>
                    <p className='mف-4'>نوع مرخصی : </p>
                    <select onChange={morHandler} value={mor} id="countries" class=" w-1/2 bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-300 focus:border-purple-500 block  p-2.5 ">
                        <option value="استحقاقی">استحقاقی (با حقوق) </option>
                        <option value="بدون حقوق">بدون حقوق</option>
                        <option value="استعلاجی">استعلاجی</option>
                    </select>
                </div>
                <div className='flex w-full relative pr-[105px]'>
                    <DatePicker className='purple' inputClass="custom-input" placeholder='روز / ماه / سال' onChange={value => console.log(value)} calendar={persian} locale={persian_fa} calendarPosition="bottom-right" />
                    <FaCalendarAlt className='absolute  right-[290px] top-2' color='purple' size='30' />
                </div>
                <textarea value={msg} onChange={msgHandler} placeholder="توضیحات ... " className=' py-2 px-3 mt-5 w-full focus:border border-zinc-200' />
                <div className='flex items-center justify-center mt-20'>
                    <button className=' w-2/3  mx-auto rounded-2xl p-2 border bg-purple-500 text-white'>ثبت</button>
                </div>
            </div>
        </div>
    );
};

export default Leaverequest;