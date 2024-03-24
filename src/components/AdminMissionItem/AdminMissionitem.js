import React from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { SiStatuspage } from "react-icons/si";
import moment from 'jalali-moment';


const AdminMissionitem = ({id,missionType,missionRequestDate,isAdminRead,missionRequestOutcome,userID_Request_FullName}) => {
    return (
        <div className={'border relative rounded-md p-4 flex flex-col gap-y-2  ' +(!isAdminRead ? ' bg-red-500 ':' bg-purple-100')}>
            <div className='flex flex-col gap-y-3' >
                <p className='text-sm'>نام و نام خانوادگی : {userID_Request_FullName}</p>
                <span className='flex items-center gap-x-2'>
                {/* <FaRegCalendarDays color='green' size='20px' /> تاریخ : {new Date(missionRequestDate).toISOString().split('T')[0]} */}
                <FaRegCalendarDays color='green' size='20px' /> تاریخ : {  moment(missionRequestDate).locale('fa').format('YYYY-MM-DD ')  }
                </span>
               
            </div>
            <div className='flex items-center gap-x-10 '>
                <p className='flex items-center gap-x-2'> <SiStatuspage size='20px' color='blue' /> وضعیت:  {(missionRequestOutcome===0 && <span> مشخص نیست</span>)}{(missionRequestOutcome===1 && <span> در حال بررسی</span>)}{(missionRequestOutcome===2 && <span> تایید شده</span>)}{(missionRequestOutcome===3 && <span>رد شده </span>)}</p>
                <p className='p-2 rounded-lg bg-purple-500'>{missionType===0 && <span>داخل شهر</span>}{missionType===1 && <span>خارج شهر</span>}</p>
                <Link to={`/admineditmission/${id}`} className='absolute top-5 left-0'>
                    <FaAngleLeft size='40px' color='purple' />
                </Link>
            </div>
       </div>
    );
};

export default AdminMissionitem;