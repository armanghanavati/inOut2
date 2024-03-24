import React from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { SiStatuspage } from "react-icons/si";
const LeaveItem = ({id,leaveType,leaveRequestDate,isAdminRead,leaveRequestOutcome}) => {
    return (
        <div className='border relative rounded-md p-4 flex flex-col gap-y-2 bg-purple-100 '>
            <div className='flex flex-col gap-y-3' >
                 <span className='flex items-center gap-x-2'>
                    {leaveRequestDate && leaveRequestDate !==null &&(<>
                        <FaRegCalendarDays color='green' size='20px' /> تاریخ : {new Date(leaveRequestDate).toISOString().split('T')[0]}
                    </>
                    )}
                 </span>
                 <span className='flex items-center gap-x-2'>
                 <FaRegEye  color='red' size='20px'/> مشاهده توسط سرپرست: {isAdminRead ? 'بله' : 'خیر'}
                 </span>
            </div>
            <div className='flex items-center gap-x-10 '>
                <p className='flex items-center gap-x-2'> <SiStatuspage size='20px' color='blue' /> وضعیت:  {(leaveRequestOutcome===0 && <span> مشخص نیست</span>)}{(leaveRequestOutcome===1 && <span> در حال بررسی</span>)}{(leaveRequestOutcome===2 && <span> تایید شده</span>)}{(leaveRequestOutcome===3 && <span>رد شده </span>)}</p>
                <p className='p-2 rounded-lg bg-purple-500'>{leaveType===0 && <span>استحقاقی</span>}{leaveType===1 && <span>استعلاجی</span>}{leaveType===2 && <span>بدون حقوق</span>}</p>
                <Link to={`/leaveedit/${id}`} className='absolute top-5 left-0'>
                    <FaAngleLeft size='40px' color='purple' />
                </Link>
            </div>
        </div>
    );
};

export default LeaveItem;