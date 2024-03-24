import React from 'react';
import MyNavabar from '../components/MyNavabar/MyNavabar';
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineImport } from "react-icons/ai";
import Switch from '../components/switch/Switch';
import { Link } from 'react-router-dom';
import MainTitle from '../components2/MainTitle';





const Setting = () => {
    const firstName = JSON.parse(localStorage.getItem('userData')).firstName
    const family = JSON.parse(localStorage.getItem('userData')).family
    const phoneNumber = JSON.parse(localStorage.getItem('userData')).phoneNumber
    return (
        <div>
            <MainTitle label='تنظیمات' />
            <div className='flex items-center gap-x-10 mt-[71px] bg-zinc-200 py-3 px-5'>
                <div className='relative'>
                    <div>
                        <BsPersonCircle size='45px' color='white' />
                    </div>
                    <div className='absolute top-6'>
                        <AiOutlineImport color='green' size='25px' />
                    </div>
                </div>
                <div>
                    <p> {firstName} {family}</p>
                    <p> شماره تلفن همراه : {phoneNumber}</p>

                </div>
            </div>
            <div className='flex items-center justify-between py-3 px-5'>
                <p>یاد آوری ثبت  ورود و خروج</p>
                <Switch />
            </div>
            <div className='mx-auto mt-3 w-[80%]'>
                <Link to='/'>
                    <button className='w-full text-white rounded-xl px-5 py-2 bg-emerald-600' > مشاهده مجدد راهنمای اپلیکیشن</button>
                </Link>
            </div>
        </div>
    );
};

export default Setting;