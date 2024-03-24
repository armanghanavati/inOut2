import React from 'react';
import MyNavabar from '../components/MyNavabar/MyNavabar';
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useMyContext } from '../components/contextProvider/MyContext';

const Reportdetailed = () => {
    const firstName = JSON.parse(localStorage.getItem('userData')).firstName
    const family = JSON.parse(localStorage.getItem('userData')).family
    const { sharedMonth, setSharedMonth, sharedYear, setSharedYear } = useMyContext();
    return (
        <div>
            <MyNavabar title='گزارش تفضیلی' />
            <p className='mt-24 mb-10 pr-8'>نام کارمند :  {firstName} {family}</p>
            <p className='text-center pl-48 my-3'> ماه / سال</p>
            <div className='flex justify-center w-[60%] mx-auto'>
                <button className=' w-full px-3 py-1 border-2  border-green-500 rounded-md'>{sharedMonth} /{sharedYear}</button>
            </div>
            <div className=' flex flex-col gap-y-3 mt-10 mx-5'>
                <div className='  bg-orange-500 flex items-center justify-between  p-4 border rounded-xl'>
                    <div>چهارشنبه 1 آذر 1402</div>
                    <div>07:55 تا 14:44</div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>جمع کارکرد</span>
                        <span>00:00</span>
                    </div>
                    <Link to='/detailedd'>
                        <div><FaAngleLeft /></div>

                    </Link>
                </div>
                <div className='bg-orange-500 flex items-center justify-between  p-4 border rounded-xl'>
                    <div>پنجشنبه 2 آذر 1402</div>
                    <div>07:55 تا 14:44</div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>جمع کارکرد</span>
                        <span>00:00</span>
                    </div>
                    <Link to='/detailedd'>
                        <div><FaAngleLeft /></div>

                    </Link>
                </div>
                <div className='flex items-center justify-between  p-4 border rounded-xl'>
                    <div>چهارشنبه 8 آذر 1402</div>
                    <div>07:55 تا 14:44</div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>جمع کارکرد</span>
                        <span>00:00</span>
                    </div>
                    <Link to='/detailedd'>
                        <div><FaAngleLeft /></div>

                    </Link>
                </div>
                <div className='flex items-center justify-between  p-4 border rounded-xl'>
                    <div>دوشنبه 6 آذر 1402</div>
                    <div>07:13 تا 12:44</div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>جمع کارکرد</span>
                        <span>00:00</span>
                    </div>
                    <Link to='/detailedd'>
                        <div><FaAngleLeft /></div>

                    </Link>
                </div>
                <div className='bg-orange-500 flex items-center justify-between  p-4 border rounded-xl'>
                    <div>چهارشنبه 12 آذر 1402</div>
                    <div>09:10 تا 14:44</div>
                    <div className='flex flex-col items-center justify-center'>
                        <span>جمع کارکرد</span>
                        <span>00:00</span>
                    </div>
                    <Link to='/detailedd'>
                        <div><FaAngleLeft /></div>

                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Reportdetailed;