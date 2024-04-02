import React from "react";
import MyNavabar from "../components/MyNavabar/MyNavabar";
import { useMyContext } from "../components/contextProvider/MyContext";
const Reportsummary = () => {
  const { sharedMonth, setSharedMonth, sharedYear, setSharedYear } =
    useMyContext();

  return (
    <div>
      <MyNavabar title="گزارش خلاصه" />
      <p className="mt-24 mb-10 pr-8">
        نام کارمند : {firstName} {family}{" "}
      </p>
      <p className="text-center pl-48 my-3"> ماه / سال</p>
      <div className="flex justify-center w-[60%] mx-auto">
        <button className=" w-full px-3 py-1 border-2  border-green-500 rounded-md">
          {sharedMonth} /{sharedYear}
        </button>
      </div>
      <div className="mt-10 px-5">
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات طول شیفت :</span>
          <span>55 : 00</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات کارکرد :</span>
          <span>24 : 00</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات تاخیر در ورود :</span>
          <span>20 : 00</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات تعجیل در خروج :</span>
          <span>23 : 00</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات غیبت :</span>
          <span>05 : 23</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات اضافه کار :</span>
          <span>55 : 00</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات ماموریت :</span>
          <span>55 : 00</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع روزهای ماموریت :</span>
          <span>14</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع ساعات مرخصی ساعتی :</span>
          <span>17 : 35</span>
        </div>
        <div className=" border-y py-1 border-emerald-300 flex items-center justify-between px-2">
          <span>مجموع روزهای مرخصی :</span>
          <span> 3</span>
        </div>
      </div>
    </div>
  );
};

export default Reportsummary;
