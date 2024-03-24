import React from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { SiStatuspage } from "react-icons/si";
import moment from 'jalali-moment';
const AdminLeaveItem = ({id,leaveType,leaveRequestDate,isAdminRead,leaveRequestOutcome,userID_Request_FullName}) => {
    return (
        <div className={'border relative rounded-md p-4 flex flex-col gap-y-2  ' +(!isAdminRead ? ' bg-red-500 ':' bg-purple-100')}>
            <div className='flex flex-col gap-y-3' >
                <p className='text-sm'>نام و نام خانوادگی : {userID_Request_FullName}</p>
                <span className='flex items-center gap-x-2'>
                <FaRegCalendarDays color='green' size='20px' /> تاریخ : {  moment(leaveRequestDate).locale('fa').format('YYYY-MM-DD ') }
                </span>
                {/* <span className='flex items-center gap-x-2'>
                <FaRegEye  color='red' size='20px'/> مشاهده توسط سرپرست: {isAdminRead ? 'بله' : 'خیر'}
                </span> */}
            </div>
            <div className='flex items-center gap-x-10 '>
                <p className='flex items-center gap-x-2'> <SiStatuspage size='20px' color='blue' /> وضعیت:  {(leaveRequestOutcome===0 && <span> مشخص نیست</span>)}{(leaveRequestOutcome===1 && <span> در حال بررسی</span>)}{(leaveRequestOutcome===2 && <span> تایید شده</span>)}{(leaveRequestOutcome===3 && <span>رد شده </span>)}</p>
                <p className='p-2 rounded-lg bg-purple-500'>{leaveType===0 && <span>استحقاقی</span>}{leaveType===1 && <span>استعلاجی</span>}{leaveType===2 && <span>بدون حقوق</span>}</p>
                <Link to={`/admineditleave/${id}`} className='absolute top-5 left-0'>
                    <FaAngleLeft size='40px' color='purple' />
                </Link>
            </div>
       </div>
    );
};

export default AdminLeaveItem;