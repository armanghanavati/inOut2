import React, { useEffect, useState } from "react";
import MyNavabar from "../components/MyNavabar/MyNavabar";
import RequestNavbar from "./RequestNavbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

const LeaveEdit = () => {
  const navigate = useNavigate();
  // دریافت آیدی مرخصی
  const leaveId = useParams().leaveId;
  // دریافت اطلاعات مرخصی
  const [leaveData, setLeaveData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    };
    axios
      .get(
        `https://www.auto.fanwebco.com/InOut_api/api/LeaveManagementController/EditLeave?leaveid=${leaveId}`,
        { headers }
      )
      .then((res) => {
        setLoading(false);
        setLeaveData(res.data.leaveViewModel);
        setError(false);
      })
      .catch((error) => {
        setLoading(false);
        setLeaveData([]);
        setError(error);
      });
  }, []);
  const changeLeaveTypeHandler = (e) => {
    setLeaveData({ ...leaveData, leaveType: Number(e.target.value) });
  };
  const handleDateChangeStart = (e) => {
    setLeaveData({ ...leaveData, fromDate_Day: e.target.value });
  };
  const handleDateChangeEnd = (e) => {
    setLeaveData({ ...leaveData, toDate_Day: e.target.value });
  };
  const descriptionHandler = (e) => {
    setLeaveData({ ...leaveData, description: e.target.value });
  };
  const {
    leaveRequestDate,
    leaveRequestOutcome,
    leaveRequestConfirmDate,
    adminDescription,
    isAdminRead,
    userID_Request,
    userID_Request_UserName,
    userID_Request_FullName,
    userID_Confirm,
    userID_Confirm_UserName,
    userID_Confirm_FullName,
    ...leaveDataa
  } = leaveData;

  // ویرایش مرخصی
  const editHandler = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    if (!leaveDataa.fromDate_Day || !leaveDataa.toDate_Day) {
      Swal.fire({
        title: "تاریخ شروع و تاریخ پایان مرخصی را انتخاب کنید",
        icon: "error",
      });
    } else if (!leaveDataa.description) {
      Swal.fire({
        title: "  توضیحات مربوط به مرخصی راتکمیل کنید",
        icon: "error",
      });
    } else if (leaveDataa.leaveType === -1) {
      Swal.fire({
        title: "نوع مرخصی را انتخاب کنید",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "ایا مطمعنید که میخواهید این مرخصی را ویرایش کنید؟",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "بله",
        denyButtonText: `خیر`,
        cancelButtonText: "بازگشت",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              "https://www.auto.fanwebco.com/InOut_api/api/LeaveManagementController/EditLeave",
              leaveDataa,
              { headers: headers }
            )
            .then((res) => {
              Swal.fire({
                title: `${res.data.msg}`,
                icon: "success",
                timerProgressBar: "true",
              });
            }, navigate("/leave"))

            .catch((error) =>
              Swal.fire({
                title: "  مرخصی ویرایش نشد  ",
                text: `${error.message}`,
                icon: "error",
                timerProgressBar: "true",
              })
            );
        } else if (result.isDenied) {
          Swal.fire("ویرایش نشد", "", "error");
        }
      });
    }
  };
  // حذف مرخصی
  const deleteHandler = () => {
    Swal.fire({
      title: "آیا مطمعنید که میخواهید این مرخصی را حذف کنید؟",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "بله",
      denyButtonText: `خیر`,
      cancelButtonText: "بازگشت",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        };
        axios
          .delete(
            `https://www.auto.fanwebco.com/InOut_api/api/LeaveManagementController/DeletLeave?leaverequestid=${leaveData.id}`,
            { headers: headers }
          )
          .then((res) => {
            Swal.fire({
              title: `${res.data.msg}`,
              icon: "success",
              timerProgressBar: "true",
            });
            navigate("/leave");
          })
          .catch((error) =>
            Swal.fire({
              title: "  مرخصی حذف نشد  ",
              text: `${error.message}`,
              icon: "error",
              timerProgressBar: "true",
            })
          );
      } else if (result.isDenied) {
        Swal.fire("حذف نشد", "", "error");
      }
    });
  };
  if (isLoading) {
    return (
      <>
        <MyNavabar title=" ویرایش مرخصی" />
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
        <MyNavabar title=" ویرایش مرخصی" />
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
      <MyNavabar title=" ویرایش مرخصی" />
      <RequestNavbar />
      <div className="formRequestLeave mt-32 mx-5 sm:mx-10 bg-zinc-100 px-10 py-5  border rounded-lg  transition-all ">
        <p className="my-3">
          نام و نام خانوادگی : {leaveData.userID_Request_FullName}{" "}
        </p>
        <div>
          <select
            onChange={changeLeaveTypeHandler}
            value={leaveData.leaveType}
            className="w-full border py-2 my-2 rounded-md px-3 border-zinc-500 bg-purple-100"
            name=""
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
            className=" text-md md:text-lg  border border-zinc-500 p-2 rounded-md bg-purple-100"
            name="fromDate_Day"
            type="datetime-local"
            value={leaveData.fromDate_Day}
            onChange={handleDateChangeStart}
          />
        </div>
        <div className="flex flex-col gap-y-1 my-3">
          <span>تاریخ پایان مرخصی :</span>
          <input
            className=" text-md md:text-lg  border border-zinc-500 p-2 rounded-md bg-purple-100"
            name="toDate_Day"
            type="datetime-local"
            value={leaveData.toDate_Day}
            onChange={handleDateChangeEnd}
          />
        </div>
        <div className="my-3">
          <textarea
            onChange={descriptionHandler}
            value={leaveData.description}
            className=" w-full border rounded-md bg-purple-100 p-2"
            placeholder="توضیحات..."
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
          <button
            onClick={editHandler}
            className="text-white w-full border p-2 rounded-xl bg-green-400 flex items-center justify-center "
          >
            ویرایش مرخصی
          </button>
          <button
            onClick={deleteHandler}
            className="text-white w-full border p-2 rounded-xl bg-red-400 flex items-center justify-center "
          >
            حذف مرخصی
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveEdit;
