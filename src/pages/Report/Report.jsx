import React, { useState } from "react";
import "react-multi-date-picker/styles/colors/purple.css";
import { useMyContext } from "../../components/contextProvider/MyContext";
import MainTitle from "../../components2/MainTitle";
import { Col, Container, Row } from "react-bootstrap";
import Btn from "../../components2/Btn";
import Datepicker from "../../components2/DatePicker";
import { useForm } from "react-hook-form";
import { usersSummaryReportMonthly } from "../../services/MasterServices";
import StringHelpers from "../../helpers/StringHelpers";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

const Report = () => {
  const { sharedMonth, setSharedMonth, sharedYear, setSharedYear } =
    useMyContext();
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange" });

  const values = getValues();

  const handleUserReportMonthly = async (data) => {
    console.log(data?.convert(gregorian, gregorian_fa)?.format("YYYY/MM/DD"));
    const postData = {
      startDate: StringHelpers.convertDatePer(data),
      endDate: "",
    };
    try {
      const res = await usersSummaryReportMonthly(postData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-around ">
          <Col md="6" className="">
            <Datepicker
              xl={8}
              md={4}
              onlyMonthPicker
              format="MMMM YYYY"
              className="ms-4"
              label="بازه‌ زمانی:"
              name="fromDate"
              control={control}
              maxDate={new Date()}
              persianType="per"
            />
          </Col>
          <Col md="6" className="d-flex align-items-end">
            <Btn
              onClick={handleSubmit((data) => handleUserReportMonthly(data))}
              xl={4}
              className="ms-4"
              variant="outline-dark"
              title="گزارش خلاصه"
            />
            <Btn
              xl={4}
              className="me-4"
              variant="outline-dark"
              title="گزارش تفصیلی"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Report;

{
  /* <div>
<div className="flex items-center gap-x-4">
  <span className="mr-8"> :</span>
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
</div> */
}
