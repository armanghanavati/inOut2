import React, { useEffect, useState } from 'react';
import MyNavabar from '../components/MyNavabar/MyNavabar';
import RequestNavbar from './RequestNavbar';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';

const MissionEdit = () => {
    const navigate=useNavigate()
    // دریافت آیدی ماموریت
    const missionId=useParams().missionId
    // دریافت اطلاعات ماموریت
    const[missionData,setMissionData]=useState({})
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    useEffect(()=>{
        const headers = {
            'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))   
        };
        axios.get(`https://www.auto.fanwebco.com/InOut_api/api/MissionManagementController/EditMission?missionid=${missionId}`,{headers})
        .then(res => {setLoading(false);setMissionData(res.data.missionViewModel);setError(false)})
        .catch(error => {setLoading(false);setMissionData([]);setError(error)})
    },[])
    const changeMissionTypeHandler=(e)=>{
        setMissionData({...missionData,missionType:Number(e.target.value)})
    }
    const handleDateChangeStart=(e)=>{
         setMissionData({...missionData,startDate:e.target.value})
    }
    const handleDateChangeEnd=(e)=>{
        setMissionData({...missionData,endDate:e.target.value})
         
    }
    const descriptionHandler=(e)=>{
      setMissionData({...missionData,description:e.target.value})
    }
    const{missionRequestDate,missionRequestOutcome,missionRequestConfirmDate,adminDescription,isAdminRead,userID_Request,userID_Request_UserName,userID_Request_FullName,userID_Confirm,userID_Confirm_UserName,userID_Confirm_FullName,...missionDataa}=missionData
    


    // ویرایش ماموریت
    const editHandler=()=>{
        const token=JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+token    
          };
        if(!missionDataa.startDate || !missionDataa.endDate){
            Swal.fire({
                title:'تاریخ شروع و تاریخ پایان ماموریت را انتخاب کنید',
                icon:'error'
            })
        } 
        else if(!missionDataa.description){
            Swal.fire({
                title:'  توضیحات مربوط به ماموریت راتکمیل کنید',
                icon:'error'
            })
        } 
        else if(missionDataa.missionType ===-1){
            Swal.fire({
                title:'نوع ماموریت را انتخاب کنید',
                icon:'error'
            })
        }
        else{
            Swal.fire({
                title: "ایا مطمعنید که میخواهید این ماموریت را ویرایش کنید؟",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "بله",
                denyButtonText: `خیر`,
                cancelButtonText:'بازگشت'
              }).then((result) => {
                if (result.isConfirmed) {
                  axios.put('https://www.auto.fanwebco.com/InOut_api/api/MissionManagementController/EditMission',missionDataa,{headers:headers})
                  .then(res =>{Swal.fire({
                      title:`${res.data.msg}`,
                      icon:"success",
                      timerProgressBar:"true"
                    })},navigate('/mission'))
                 
                    .catch(error => Swal.fire({
                      title:"  ماموریت ویرایش نشد  ",
                      text:`${error.message}`,
                      icon:"error",
                      timerProgressBar:"true"
                    })
                    )

                } else if (result.isDenied) {
                  Swal.fire("ویرایش نشد", "", "error");
                }
              });
        }
    }
    // حذف مرخصی
    const deleteHandler=()=>{
        Swal.fire({
            title: "آیا مطمعنید که میخواهید این ماموریت را حذف کنید؟",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "بله",
            denyButtonText: `خیر`,
            cancelButtonText:'بازگشت'
          }).then((result) => {
            if (result.isConfirmed) {
                const token=JSON.parse(localStorage.getItem('token'))
                const headers = {
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+token    
                  };
                axios.delete(`https://www.auto.fanwebco.com/InOut_api/api/MissionManagementController/DeletMission?missionrequestid=${missionData.id}`,{headers:headers})
                .then(res =>{Swal.fire({
                    title:`${res.data.msg}`,
                    icon:"success",
                    timerProgressBar:"true"
                  });navigate('/mission')}) 
                  .catch(error => Swal.fire({
                    title:"  ماموریت حذف نشد  ",
                    text:`${error.message}`,
                    icon:"error",
                    timerProgressBar:"true"
                  })
                  )   

            } else if (result.isDenied) {
                Swal.fire("حذف نشد", "", "error");
              
            }
          });
    }
    if(isLoading){
        return (
           <>
                <MyNavabar title=' ویرایش ماموریت'/>
                <RequestNavbar/>
                <div className='mt-3 mb-8'>
                     <div className='flex items-center justify-center h-screen font-bold'><ClipLoader size='100px'/></div>
                </div>
           </>
        )
    }
    if(isError){
        return(
            <>
               <MyNavabar title=' ویرایش ماموریت'/>
                <RequestNavbar/>
                <div className='mt-36 mb-8'>
                    <div className='mt-20 flex items-center  mx-5  p-5 bg-red-100 justify-center text-red-500 font-bold'>'An error has occurred '{isError.message} </div>   
                </div>

            </>
        )
    }
    return (
        <div>
            <MyNavabar title=' ویرایش ماموریت'/>
            <RequestNavbar/>
            <div className='formRequestMission mt-32 mx-5 sm:mx-10 bg-zinc-100 px-10 py-5  border rounded-lg  transition-all '>
                  <p className='my-3'>نام و نام خانوادگی : {missionData.userID_Request_FullName}  </p>
                  <div>
                     <select onChange={changeMissionTypeHandler} value={missionData.missionType} className='w-full border py-2 my-2 rounded-md px-3 border-zinc-500 bg-purple-100' name="" id="">
                        <option value="-1">نوع ماموریت</option>
                        <option value="0">داخل شهر</option>
                        <option value="1">خارج شهر</option>
                        
                     </select>
                  </div>
                  <div className='flex flex-col gap-y-1 my-3'>
                       <span>تاریخ شروع ماموریت :</span>
                       <input
                            className='text-md border border-zinc-500 p-2 rounded-md bg-purple-100'
                            name='startDate'
                            type="datetime-local"
                            value={missionData.startDate}
                            onChange={handleDateChangeStart}
                        />
                  </div>
                  <div className='flex flex-col gap-y-1 my-3'>
                       <span>تاریخ پایان ماموریت :</span>
                       <input
                            className='text-md border border-zinc-500 p-2 rounded-md bg-purple-100'
                            name='endDate'
                            type="datetime-local"
                            value={missionData.endDate}
                            onChange={handleDateChangeEnd}
                        />
                  </div>
                  <div className='my-3'>
                    <textarea onChange={descriptionHandler} value={missionData.description}  className='justify-center w-full border rounded-md bg-purple-100 p-2' placeholder='توضیحات...' name="" id="" cols="30" rows="10"></textarea>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-2 gap-5'>
                    <button onClick={editHandler} className='text-white w-full border p-2 rounded-xl bg-green-400 flex items-center justify-center text-sm md:text-lg'>ویرایش ماموریت</button>
                    <button onClick={deleteHandler} className='text-white w-full border p-2 rounded-xl bg-red-400 flex items-center justify-center text-sm md:text-lg'>حذف ماموریت</button>
                  </div>
            </div>
        </div>
    );
};

export default MissionEdit;