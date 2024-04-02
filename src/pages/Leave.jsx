import React, { useState } from "react";
import MyNavabar from "../components/MyNavabar/MyNavabar";
import RequestNavbar from "./RequestNavbar";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";

import { useEffect } from "react";
import axios from "axios";
import LeaveItem from "../components/LeaveItem/LeaveItem";
import Swal from "sweetalert2";
import MainTitle from "../components2/MainTitle";
import { allUserLeavesRequeset } from "../services/MasterServices";
// import { useNavigate } from 'react-router-dom';
const Leave = () => {
  const [addleaveData, setAddLeaveData] = useState({});
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const handleDateChangeStart = (e) => {
    setSelectedDateStart(e.target.value);
    setAddLeaveData({ ...addleaveData, [e.target.name]: e.target.value });
  };
  // تابع مربوط به تاریخ پایان مرخصی
  const handleDateChangeEnd = (e) => {
    setSelectedDateEnd(e.target.value);
    setAddLeaveData({ ...addleaveData, [e.target.name]: e.target.value });
  };

  const handleGetAllLeavesReq = async () => {
    try {
      const res = await allUserLeavesRequeset();
      console.log(res);
      //   .then((res) => {
      //     setLoading(false);
      //     setLeaves(res.data.leaveRequestsList ? res.data.leaveRequestsList : []);
      //     setError(false);
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     setLeaves([]);
      //     setError(error);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllLeavesReq();
  }, [leaves]);

  // مربوط به تغییرات textarea
  const descriptionHandler = (e) => {
    setAddLeaveData({ ...addleaveData, description: e.target.value });
  };
  const changeleaveTypeHandler = (e) => {
    setAddLeaveData({ ...addleaveData, leaveType: Number(e.target.value) });
  };
  const formHandler = (e) => {
    setAddLeaveData({ ...addleaveData, [e.target.name]: e.target.value });
  };
  const resetformRequestLeave = () => {
    setAddLeaveData({
      leaveType: "",
      selectedDateStart: "",
      selectedDateEnd: "",
      description: "",
    });
    setSelectedDateStart("");
    setSelectedDateEnd("");
  };
  
  const addLeaveHandler = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    if (!addleaveData.fromDate_Day || !addleaveData.toDate_Day) {
      Swal.fire({
        title: "تاریخ شروع و تاریخ پایان مرخصی را انتخاب کنید",
        icon: "error",
      });
    } else if (!addleaveData.description) {
      Swal.fire({
        title: "  توضیحات مربوط به  مرخصی را تکمیل کنید   ",
        icon: "error",
      });
    } else if (addleaveData.leaveType === -1) {
      Swal.fire({
        title: "نوع مرخصی را انتخاب کنید",
        icon: "error",
      });
    } else {
      axios
        .post(
          "https://www.auto.fanwebco.com/InOut_api/api/LeaveManagementController/CreateLeave",
          addleaveData,
          { headers: headers }
        )
        .then((res) => {
          Swal.fire({
            title: `${res.data.msg}`,
            icon: "success",
            timerProgressBar: "true",
          });
          setOpen(false);
          resetformRequestLeave();
        })

        .catch((error) =>
          Swal.fire({
            title: "  مرخصی ثبت نشد  ",
            text: `${error.message}`,
            icon: "error",
            timerProgressBar: "true",
          })
        );
    }
  };

  if (isLoading) {
    return (
      <>
        <MyNavabar title="درخواست ها" />
        <RequestNavbar />
        <div className="mt-3 mb-8">
          <div className="flex items-center justify-center h-screen font-bold">
            <ClipLoader size="100px" />
          </div>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <MyNavabar title="درخواست ها" />
        <RequestNavbar />
        <div className="mt-36 mb-8">
          <div className="mt-20 flex items-center  mx-5  p-5 bg-red-100 justify-center text-red-500 font-bold">
            'An error has occurred '{isError.message}{" "}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <MainTitle label="درخواست ها" />
      <RequestNavbar />
      <div className="mt-40 mb-8">
        <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 mt-24 mb-36">
          {leaves && leaves.length > 0 ? (
            leaves.map((leave) => <LeaveItem key={leave.id} {...leave} />)
          ) : (
            <div className="border bg-red-200 p-10 font-bold text-red-500">
              هیچ درخواست مرخصی ثبت نشده است
            </div>
          )}
        </div>
      </div>
      <div onClick={() => setOpen(true)}>
        <FaCirclePlus
          className="fixed left-2 top-32 text-purple-500"
          color="purple"
          size="50px"
        />
      </div>
      <div
        className={
          "formRequestLeave z-[6] bg-zinc-100 px-10 py-5 fixed top-36 bottom-14 overflow-y-auto border rounded-lg right-14 left-14 transition-all " +
          (open ? " visible opacity-100 " : " invisible opactiy-0")
        }
      >
        <div
          onClick={() => {
            setOpen(false);
            resetformRequestLeave();
          }}
          className="fixed text-red-500 top-32 right-10 transition-all"
        >
          <FaRegCircleXmark
            className="bg-red-500 rounded-full"
            size="40px"
            color="white"
          />
        </div>
        <p className="my-3">
          {userData.firstName} {userData.family}{" "}
        </p>
        <div>
          <select
            onChange={changeleaveTypeHandler}
            value={addleaveData.leaveType}
            className="w-full border py-2 my-2 rounded-md px-2 border-zinc-500 bg-purple-100"
            id=""
          >
            <option value="-1">نوع مرخصی</option>
            <option value="0">استحقاقی</option>
            <option value="1">استعلاجی</option>
            <option value="2">بدون حقوق</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-1 my-3">
          <span>تاریخ شروع مرخصی :</span>
          <input
            className="border border-zinc-500 p-2 rounded-md bg-purple-100"
            name="fromDate_Day"
            type="datetime-local"
            value={selectedDateStart}
            onChange={handleDateChangeStart}
          />
        </div>
        <div className="flex flex-col gap-y-1 my-3">
          <span>تاریخ پایان مرخصی :</span>
          <input
            className="border border-zinc-500 p-2 rounded-md bg-purple-100"
            name="toDate_Day"
            type="datetime-local"
            value={selectedDateEnd}
            onChange={handleDateChangeEnd}
          />
        </div>
        <div className="my-3">
          <textarea
            onChange={descriptionHandler}
            value={addleaveData.description}
            className=" w-full border rounded-md bg-purple-100 p-2"
            placeholder="توضیحات..."
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div>
          <button
            onClick={addLeaveHandler}
            className=" w-full border p-2 rounded-xl bg-purple-400 flex items-center justify-center"
          >
            ثبت مرخصی
          </button>
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={
          "overlay fixed z-[5] top-0 bottom-0 left-0 right-0 w-full h-full bg-black/80 transition-all" +
          (open ? " visible opacity-100" : " invisible opacity-0")
        }
      ></div>
    </div>
  );
};

export default Leave;
