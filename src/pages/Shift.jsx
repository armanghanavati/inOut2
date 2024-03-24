import React from 'react';
import MyNavabar from '../components/MyNavabar/MyNavabar';
import MainTitle from '../components2/MainTitle';

const Shift = () => {
    return (
        <div>
            <MainTitle label='شیفت عادی'/>
            <div className='mt-28 mx-5'>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> شنبه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> یشنبه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> دوشنبه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> سشنبه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> چهارشنبه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> پنجشنبه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-y-1 my-3'>
                    <button className=' w-full rounded-xl border border-purple-500 p-2 text-center'> جمعه</button>
                    <div className='w-full flex items-center justify-between bg-zinc-200 p-2 border rounded-xl'>
                        <p>ساعت شروع : 08:00</p>
                        <p> ساعت پایان : 00 :16</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Shift;