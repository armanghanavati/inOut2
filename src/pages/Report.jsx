import React, { useState } from "react";
import MyNavabar from "../components/MyNavabar/MyNavabar";
import { Link } from "react-router-dom";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-multi-date-picker/styles/colors/purple.css";
import { useMyContext } from "../components/contextProvider/MyContext";
import MainTitle from "../components2/MainTitle";

const Report = () => {
  const { sharedMonth, setSharedMonth, sharedYear, setSharedYear } =
    useMyContext();
  // console.log(sharedData.month.name)
  const [month, setmonth] = useState(true);
  const [custom, setCustom] = useState(false);
  const [summary, setSummary] = useState(true);
  const [detailed, setDetailed] = useState(false);
  const monthHandler = () => {
    setmonth(!month);
    setCustom(false);
  };
  const customHandler = () => {
    setmonth(false);
    setCustom(!custom);
  };
  const summaryHandler = () => {
    setSummary(!summary);
    setDetailed(false);
  };
  const detailedHandler = () => {
    setSummary(false);
    setDetailed(!detailed);
  };
  const changeHandler = (value) => {
    setSharedMonth(value.month.name);
    setSharedYear(value.year);
  };
  const firstName = JSON.parse(localStorage.getItem("userData")).firstName;
  const family = JSON.parse(localStorage.getItem("userData")).family;

  return (
    <div>
      <MainTitle label="گزارش" />
      <div className="flex items-center gap-x-4">
        <span className="mr-8">نوع بازه زمانی :</span>
        <button
          onClick={monthHandler}
          className={
            "p-3 rounded-md border mr-8 shadow-md" +
            (month ? " bg-zinc-700 text-white" : "")
          }
        >
          ماهانه
        </button>
        <button
          onClick={customHandler}
          className={
            "p-3 rounded-md border shadow-md" +
            (custom ? " bg-zinc-700 text-white" : "")
          }
        >
          سفارشی
        </button>
      </div>
      <div className="w-[60%] mx-auto mt-8">
        {month ? (
          <>
            <p className="mb-3">از تاریخ : </p>
            <div className="flex w-full relative mr-4">
              <DatePicker
                onChange={changeHandler}
                format="MMMM YYYY"
                className="purple"
                onlyMonthPicker
                inputClass="custom-input"
                placeholder="ماه /سال"
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              />
              <FaCalendarAlt
                className="absolute -left-20 right-[185px]"
                color="purple"
                size="40"
              />
            </div>
          </>
        ) : (
          <>
            <p className="mb-3">از تاریخ : </p>
            <div className="flex w-full relative mr-4">
              <DatePicker
                className="purple"
                inputClass="custom-input"
                placeholder="روز / ماه / سال"
                onChange={(value) => console.log(value)}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              />
              <FaCalendarAlt
                className="absolute -left-20 right-[190px] top-2"
                color="purple"
                size="30"
              />
            </div>
            <p className="mb-2 mt-5">تا تاریخ : </p>
            <div className="flex w-full relative mr-4">
              <DatePicker
                className="purple"
                inputClass="custom-input"
                placeholder="روز / ماه / سال"
                onChange={(value) => console.log(value)}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
              />
              <FaCalendarAlt
                className="absolute -left-20 right-[190px] top-2"
                color="purple"
                size="30"
              />
            </div>
          </>
        )}
      </div>

      <div
        className={
          "flex justify-center items-center gap-x-4 mt-[550px]" +
          (month ? " mt-[80px]" : " mt-[80px]")
        }
      >
        <Link to="/summary">
          <button
            onClick={summaryHandler}
            className={
              " rounded-md  py-2 px-5 border boder-black" +
              (summary ? " text-white bg-emerald-600" : "")
            }
          >
            گزارش خلاصه
          </button>
        </Link>
        <Link to="/detailed">
          <button
            onClick={detailedHandler}
            className={
              " rounded-md py-2 px-5 border border-black" +
              (detailed ? " text-white bg-emerald-600" : " ")
            }
          >
            گزارش تفضیلی
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Report;
