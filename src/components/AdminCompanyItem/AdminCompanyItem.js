import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PiFactoryFill } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom/dist';
import { FaAngleDown } from "react-icons/fa";
import { useEffect } from 'react';
const AdminCompanyItem = ({ name, description, number, address, id, employeesId, users }) => {
    // const[users,setUsers]=useState([])
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    // محل ذخیره کل اطلاعات تمام کاربران این شیفت
    const [selected, setSelected] = useState([])

    const [open, setOpen] = useState('ali')
    const openHandler = () => {
        if (open === `${id}`) {
            setOpen('ali')
        }
        else {
            setOpen(`${id}`)
        }
    }
    useEffect(() => {
        setSelected(users?.filter(user => employeesId.includes(user.id)))
    })
    // useEffect(()=>{
    //     const headers = {
    //         'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
    //     };
    //     axios.get('https://www.auto.fanwebco.com/InOut_api/api/Account/GetAllUsers', { headers: headers })
    //     .then(res =>{setLoading(false); setUsers(res.data.users);setError(false)})
    //     .catch(error =>{setLoading(false);setUsers([]);setError(true)})
    // },[])
    const navigate = useNavigate()
    const deleteHandler = () => {
        Swal.fire({
            title: "آیا از حذف شرکت اطمینان دارید؟",
            showDenyButton: true,
            confirmButtonText: "بله",
            denyButtonText: 'خیر'
        }).then((result) => {
            if (result.isConfirmed) {

                const headers = {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
                    'Content-Type': 'application/json'
                };
                axios.delete(`https://www.auto.fanwebco.com/InOut_api/api/CompanyController/DeleteCompany?companyid=${id}`, { headers: headers })
                    .then(res => Swal.fire({
                        title: "شرکت حذف شد",
                        icon: 'success',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1500
                    }),
                        // navigate('/admin')
                    )

                    .catch(error => Swal.fire({
                        text: 'An Error accord'
                    }))
            } else if (result.isDenied) {
                Swal.fire({
                    text: 'شرکت حذف نشد',
                    icon: 'error',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    progressBarColor: '#ff0000',
                    timer: 1500
                })
            }
        });
    }
    return (
        <div className='border flex flex-col gap-y-2 py-3 px-4 bg-purple-100'>
            <p className='flex items-center gap-x-2'>  <PiFactoryFill size='30px' color='blue' /><span className='pt-2'>نام شرکت: {name}</span></p>
            <p className='flex items-center gap-x-2'><IoLocationSharp size='30px' color='blue' /><span className='pt-2'>آدرس شرکت :{address}</span></p>
            <p className='flex items-center gap-x-2'><MdDescription size='30px' color='blue' /><span className='pt-2'>توضیحات :{description}</span></p>
            <div onClick={openHandler} className='flex items-center justify-between relative pl-3 bg-zinc-300 p-2 '><div className='flex items-center gap-x-2'> <FaUsers size='25px' color='black' />کارکنان</div> <FaAngleDown />{<div className={'border transition-all h-32 overflow-y-scroll p-2 bg-zinc-100 absolute w-full  md:w-[465px] right-0 top-10 flex flex-col gap-y-3' + (open === `${id}` ? ' opacity-100 visible' : ' invisible opacity-0')} >{selected?.map(user => (
                <div className='flex items-center  gap-x-2 hover:text-white hover:bg-zinc-600 pr-3'><span > {user.firstName}</span><span> {user.family}</span></div>
            ))}</div>}</div>
            <div className='flex items-center gap-x-5 px-3 my-3'>
                <button onClick={deleteHandler} className=' w-full border p-2 rounded-lg bg-red-500 text-center text-white'>حذف</button>
                <Link to={`/admineditcompany/${id}`} className='w-full border p-2 rounded-lg bg-orange-500 text-center text-white'><button>ویرایش</button></Link>
            </div>
        </div>
    );
};

export default AdminCompanyItem;