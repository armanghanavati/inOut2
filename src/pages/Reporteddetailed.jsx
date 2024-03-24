import React from 'react';
import MyNavabar from '../components/MyNavabar/MyNavabar';

const Reporteddetailed = () => {
    return (
        <div>
            <MyNavabar title='گزارش تفضیلی'/>
            <div className='mt-20 mx-5 '>
                <div className=' flex items-center justify-between rounded-xl border-2 border-green-500 px-1 py-2'>
                      <p>نام کارمند : علی کرمی</p>
                      <p> 02 آذر 1402</p>
                </div>
                <div className='bg-zinc-200 py-2 px-3 mt-2 rounded-xl'>
                    <p>ورود -:-</p>
                    <p>خروج 15:45</p>
                </div>
                <div className='mt-48 '>
                    <p>مجموع ساعات طول شیفت :  00:00</p>
                    <p>مجموع ساعات کارکرد :  00:00</p>
                    <p>مجموع ساعات تاخیر در ورود: 00:00</p>
                    <p>مرخصی : خیر</p>
                    <p> ماموریت : خیر</p>
                </div>

            </div>
        </div>
    );
};

export default Reporteddetailed;