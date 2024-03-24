import React, { useState } from "react";
// import { RiDeleteBin2Line } from "react-icons/ri";
// import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom/dist";
import moment from "jalali-moment";
const AdminAttendanceItem = ({
    fullName,
    attendanceType,
    id,
    dateTime,
    deleteHandler,
}) => {
    if (attendanceType === 0 || attendanceType === 2 || attendanceType === 4) {
        var dateString = dateTime;
        var dateObject = new Date(dateString);
        var hours = dateObject.getHours();
        var minutes = dateObject.getMinutes();
    }
    if (attendanceType === 1 || attendanceType === 3 || attendanceType === 5) {
        var dateString = dateTime;
        var dateObject = new Date(dateString);
        var hours = dateObject.getHours();
        var minutes = dateObject.getMinutes();
    }
    return (
        <div className="grid grid-cols-5 border ">
            <p className="text-center flex items-center justify-center text-xs">
                {" "}
                {fullName}
            </p>
            <p className="text-sm flex items-center justify-center text-xs text-center border-r ">
                {!attendanceType && "ورود"}
                {attendanceType === 1 && "خروج"}
                {attendanceType === 2 && "ورود با مرخصی"}
                {attendanceType === 3 && "خروج با مرخصی"}
                {attendanceType === 4 && "ورود با ماموریت"}
                {attendanceType === 5 && "خروج با ماموریت"} {`${hours}:${minutes}`}
            </p>
            {dateTime ? (
                <div className="p-1 flex items-center justify-center border-r text-xs">
                    {moment(dateTime).locale("fa").format("YYYY-MM-DD ")}
                </div>
            ) : null}
            <Link
                className="flex items-center justify-center border-r "
                onClick={deleteHandler}
            >
                <button className="flex items-center justify-center gap-x-2 md:gap-x-4 text-white  md:px-3  rounded-xl text-sm">
                    {" "}
                    {/* <RiDeleteBin2Line color="red" size="25px" /> */}
                </button>
            </Link>
            <Link
                className="flex items-center justify-center border-r "
                classNameborder-r
                to={`/admineditattendances/${id}`}
            >
                <button className="  items-center justify-center gap-x-2 md:gap-x-4 border   text-white  md:px-3  rounded-xl text-sm">
                    {" "}
                    {/* <FiEdit color="green" size="25px" /> */}
                </button>
            </Link>
        </div>
    );
};

export default AdminAttendanceItem;
