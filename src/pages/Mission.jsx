import React, { useState } from 'react';
import MyNavabar from '../components/MyNavabar/MyNavabar';
import RequestNavbar from './RequestNavbar';
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";

import { useEffect } from 'react';
import axios from 'axios';
import LeaveItem from '../components/LeaveItem/LeaveItem';
import Swal from 'sweetalert2';
import MissionItem from '../components/MissionItem/MissionItem';

const Mission = () => {
    // دریافت مرخصی های کاربر
    const [missions, setMissions] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    // مربوط به باز بسته شدن فرم در خواست مرخصی
    const [open, setOpen] = useState(false)
    // مربوط به تاریخ شروع مرخصی
    const [selectedDateStart, setSelectedDateStart] = useState("");
    // مربوط به تاریخ پایان مرخصی
    const [selectedDateEnd, setSelectedDateEnd] = useState("");

    const userData = JSON.parse(localStorage.getItem('userData'))
    // تابع مربوط به تاریخ شروع مرخصی
    const handleDateChangeStart = (e) => {
        setSelectedDateStart(e.target.value);
        setAddMissionData({ ...addMissionData, [e.target.name]: e.target.value })

    };
    // تابع مربوط به تاریخ پایان مرخصی
    const handleDateChangeEnd = (e) => {
        setSelectedDateEnd(e.target.value);
        setAddMissionData({ ...addMissionData, [e.target.name]: e.target.value })
    };
    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        };
        axios.get('https://www.auto.fanwebco.com/InOut_api/api/MissionManagementController/AllUserMissionRequeset', { headers })
            .then(res => { setLoading(false); setMissions(res.data.missionRequestsList ? res.data.missionRequestsList : []); setError(false) })
            .catch(error => { setLoading(false); setMissions([]); setError(error) })
    }, [missions])

    const [addMissionData, setAddMissionData] = useState({

    })
    // مربوط به تغییرات textarea
    const descriptionHandler = (e) => {
        setAddMissionData({ ...addMissionData, description: e.target.value })
    }
    const changemissionTypeHandler = (e) => {
        setAddMissionData({ ...addMissionData, missionType: Number(e.target.value) })
    }
    const formHandler = (e) => {
        setAddMissionData({ ...addMissionData, [e.target.name]: e.target.value })
    }
    const resetformRequestMission = () => {
        setAddMissionData({
            missionType: '',
            selectedDateStart: '',
            selectedDateEnd: '',
            description: '',
        })
        setSelectedDateStart('')
        setSelectedDateEnd('')
    }
    const addMissionHandler = () => {
        const token = JSON.parse(localStorage.getItem('token'))

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
        if (!addMissionData.startDate || !addMissionData.endDate) {
            Swal.fire({
                title: 'تاریخ شروع و تاریخ پایان ماموریت را انتخاب کنید',
                icon: 'error'
            })
        }
        else if (!addMissionData.description) {
            Swal.fire({
                title: '  توضیحات مربوط به  ماموریت را تکمیل کنید   ',
                icon: 'error'
            })
        }
        else if (addMissionData.missionType === -1) {
            Swal.fire({
                title: 'نوع ماموریت را انتخاب کنید',
                icon: 'error'
            })
        }
        else {

            axios.post('https://www.auto.fanwebco.com/InOut_api/api/MissionManagementController/CreateMission', addMissionData, { headers: headers })
                .then(res => {
                    Swal.fire({
                        title: `${res.data.msg}`,
                        icon: "success",
                        timerProgressBar: "true"
                    }); setOpen(false); resetformRequestMission()
                })

                .catch(error => Swal.fire({
                    title: "  ماموریت ثبت نشد  ",
                    text: `${error.message}`,
                    icon: "error",
                    timerProgressBar: "true"
                })
                )
        }
    }

    if (isLoading) {
        return (
            <>
                <MyNavabar title='درخواست ها' />
                <RequestNavbar />
                <div className='mt-3 mb-8'>
                    <div className='flex items-center justify-center h-screen font-bold'><ClipLoader size='100px' /></div>
                </div>
            </>
        )
    }
    if (isError) {
        return (
            <>
                <MyNavabar title='درخواست ها' />
                <RequestNavbar />
                <div className='mt-36 mb-8'>
                    <div className='mt-20 flex items-center  mx-5  p-5 bg-red-100 justify-center text-red-500 font-bold'>'An error has occurred '{isError.message} </div>
                </div>

            </>
        )
    }
    return (
        <div>
            <MyNavabar title='درخواست ها' />
            <RequestNavbar />
            <div className='mt-40 mb-8'>
                <div className=' grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 mt-24 mb-36'>
                    {missions && missions.length > 0 ? (missions.map(mission => (
                        <MissionItem key={mission.id} {...mission} />
                    ))) : (<div className='border bg-red-200 p-10 font-bold text-red-500'>هیچ درخواست ماموریتی ثبت نشده است</div>)}

                </div>
            </div>
            <div onClick={() => setOpen(true)}>
                <FaCirclePlus className='fixed left-2 top-32 text-purple-500' color='purple' size='50px' />
            </div>
            <div className={'formRequestMission z-[6] bg-zinc-100 px-10 py-5 fixed top-36 bottom-14 overflow-y-auto border rounded-lg right-14 left-14 transition-all ' + (open ? ' visible opacity-100 ' : ' invisible opactiy-0')}>
                <div onClick={() => { setOpen(false); resetformRequestMission() }} className='fixed text-red-500 top-32 right-10 transition-all'>
                    <FaRegCircleXmark className='bg-red-500 rounded-full' size='40px' color='white' />
                </div>
                <div className='my-3'>     {userData.firstName} {userData.family} </div>
                <div>
                    <select onChange={changemissionTypeHandler} value={addMissionData.missionType} className='w-full border py-2 my-2 rounded-md px-2 border-zinc-500 bg-purple-100' id="">
                        <option value="-1">نوع ماموریت</option>
                        <option value="0">داخل شهر</option>
                        <option value="1">خارج شهر</option>
                    </select>
                </div>
                <div className='flex flex-col gap-y-1 my-3'>
                    <span>تاریخ شروع ماموریت :</span>
                    <input
                        className='border border-zinc-500 p-2 rounded-md bg-purple-100'
                        name='startDate'
                        type="datetime-local"
                        value={selectedDateStart}
                        onChange={handleDateChangeStart}
                    />
                </div>
                <div className='flex flex-col gap-y-1 my-3'>
                    <span>تاریخ پایان ماموریت :</span>
                    <input
                        className='border border-zinc-500 p-2 rounded-md bg-purple-100'
                        name='endDate'
                        type="datetime-local"
                        value={selectedDateEnd}
                        onChange={handleDateChangeEnd}
                    />
                </div>
                <div className='my-3'>
                    <textarea onChange={descriptionHandler} value={addMissionData.description} className=' w-full border rounded-md bg-purple-100 p-2' placeholder='توضیحات...' name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <button onClick={addMissionHandler} className=' w-full border p-2 rounded-xl bg-purple-400 flex items-center justify-center'>ثبت مرخصی</button>
                </div>
            </div>
            <div onClick={() => setOpen(false)} className={'overlay fixed z-[5] top-0 bottom-0 left-0 right-0 w-full h-full bg-black/80 transition-all' + (open ? ' visible opacity-100' : ' invisible opacity-0')}></div>
        </div>

    );
};

export default Mission;