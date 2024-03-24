import React from "react";
import { FaChartLine, FaInfoCircle, FaRegHandPointUp } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const NavSide = () => {
  return (
    <>
      <div className="offcanvas-body flex flex-col gap-y-4 pr-3 pt-3 pb-3">
        <div>
          <Link to="/home" className="flex items-center gap-x-2">
            <FaRegHandPointUp size="20px" />
            <span
              className="cursor-pointer"
              //  onClick={() => setOpen(false)}
            >
              ثبت ورود و خروج
            </span>
          </Link>
        </div>
        <div>
          <Link to="/report" className="flex text items-center gap-x-2">
            <FaChartLine size="20px" />
            <span className="cursor-pointer"> گزارش</span>
          </Link>
        </div>
        <div>
          <Link to="/about" className="flex items-center gap-x-2">
            <FaInfoCircle size="20px" />
            <span className="cursor-pointer">درباره سامانه دینگ</span>
          </Link>
        </div>
        <div>
          <Link to="/setting" className="flex items-center gap-x-2">
            <IoIosSettings size="20px" />
            <span className="cursor-pointer">تنظیمات</span>
          </Link>
        </div>
        <p className="cursor-pointer">پیشرفته</p>
      </div>
    </>
  );
};

export default NavSide;
