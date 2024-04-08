import React, { useEffect, useRef, useState } from "react";
import { BsSun } from "react-icons/bs";
import moment from "jalali-moment";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import Swal from "sweetalert2";
import SwitchCase from "../../../components2/CheckBox";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from "react-bootstrap";
import Entry_ExitModal from "./Entry_ExitModal";
import MapLocation from "./MapLocation";
import QuestionInOutModal from "./QuestionInOutModal";
import SwitchCaseDrow from "../../../components2/SwitchCaseDrow";
import { useMediaQuery } from "react-responsive";

const RecordDevice = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const [openMod, setOpenMod] = useState(false);
  const [isLocation, setIsLocation] = useState([0, 0]);
  const [titleSwitch, setTitleSwitch] = useState({ in: "ورود", out: "خروج" })
  //   استیت استاتوس برای ورود و خروج کاربر است که یعنی ورود کرده یا خروج کرده
  const [status, setStatus] = useLocalStorageState("status", "");
  // استیت تایپ برای نوع ورود خروج است که یعنی ورود خروخ معمولی بوده یا با مرخصی یا با ماموریت
  const [type, setType] = useState(0);
  // استیت مربوط به عرض و طول جغرافیایی
  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [showQuestionInOut, setShowQuestionInOut] = useState(false);
  const [isQuestionInOut, setIsQuestionInOut] = useState(false);
  const [enterUser, setEnterUser] = useState(false);
  const [outUser, setOutUser] = useState(false);

  // استیت مربوط به نوع ورود و خروج
  // const [attendancetype, setAttendancetype] = useState(0)

  const [currentTime, setCurrenttime] = useLocalStorageState("currenttime", "");
  const [saat, setSaat] = useState("");
  const [persianYear, setPersianYear] = useState("");
  const [persianMonth, setPersianMonth] = useState("");
  const [persianDay, setPersianDay] = useState("");

  const [weekday, setWeekday] = useState("");
  const [monthName, setMonthName] = useState("");

  const [userData, setUserData] = useLocalStorageState("userData", "");
  // state for createattendance
  const [createattendance, setCreateattendance] = useState({
    attendanceType: `${type}`,
  });
  // let newCreateAttendance = { ...createattendance };

  useEffect(() => {
    if (status === "login" && type === 0) {
      setCreateattendance({ ...createattendance, attendanceType: 0 });
    }
    if (status === "logout" && type === 0) {
      setCreateattendance({ ...createattendance, attendanceType: 1 });
    }
    if (status === "login" && type === 1) {
      setCreateattendance({ ...createattendance, attendanceType: 2 });
    }
    if (status === "logout" && type === 1) {
      setCreateattendance({ ...createattendance, attendanceType: 3 });
    }
    if (status === "login" && type === 2) {
      setCreateattendance({ ...createattendance, attendanceType: 4 });
    }
    if (status === "logout" && type === 2) {
      setCreateattendance({ ...createattendance, attendanceType: 5 });
    }
    // }
  }, [type, status]);

  useEffect(() => {
    moment.locale("fa");
    const updateDateTime = () => {
      const formattedWeekday = moment().format("dddd"); // نام روز هفته
      const formattedMonthName = moment().format("jMMMM"); // نام ماه شمسی
      setWeekday(formattedWeekday);
      setMonthName(formattedMonthName);
    };

    // اجرای تابع در زمان هر تغییر موقعیت
    const interval = setInterval(updateDateTime, 1000);
    // پاک کردن تایمر در هنگام از بین رفتن کامپوننت
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // گرفتن تاریخ شمسی فعلی
    const now = moment();
    // دریافت سال، ماه و روز جداگانه
    const year = now.jYear();
    const month = now.jMonth() + 1; // به دلیل اینکه ماه‌ها از 0 شروع می‌شوند
    const day = now.jDate();

    setPersianYear(year);
    setPersianMonth(month);
    setPersianDay(day);
  }, []);

  useEffect(() => {
    if (enterUser) {
      setTimeout(() => {
        setEnterUser(false);
      }, 110);
    }
    if (outUser) {
      setTimeout(() => {
        setOutUser(false);
      }, 110);
    }
  }, [enterUser, outUser]);

  // تابع گت کارنت تایم ساعت دقیق لحظه ورود ولحظه خروج کاربر را ثبت میکند
  const getCurrenttime = (e) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    setCurrenttime(`${seconds} : ${minutes} : ${hours}`);
    console.log("mio");
  };

  const now = () => {
    setInterval(() => {
      const hala = new Date();
      const hours = hala.getHours().toString().padStart(2, "0");
      const minutes = hala.getMinutes().toString().padStart(2, "0");
      setSaat(`${minutes} : ${hours}`);
    }, 1000);
  };

  useEffect(() => {
    now();
  }, []);

  const handleEnterClick = (e) => {
    console.log(e?.movementX);
    // console.log('Touch moved:', e.touches[0].clientX, e.touches[0].clientY);
    setShowQuestionInOut(true);
    var newStatus;
    // setEnterUser(false);
    getCurrenttime();
    if (!!!status) {
      newStatus = "login";
      setEnterUser(true);
      setStatus("login");
    } else if (status === "logout") {
      setEnterUser(true);
      newStatus = "login";
      setStatus("login");
    } else {
      newStatus = "";
      setStatus("");
    }
    if (newStatus === "login" && type === 0) {
      setCreateattendance({ ...createattendance, attendanceType: 0 });
    }
    if (newStatus === "logout" && type === 0) {
      setCreateattendance({ ...createattendance, attendanceType: 1 });
    }
    if (newStatus === "login" && type === 1) {
      setCreateattendance({ ...createattendance, attendanceType: 2 });
    }
    if (newStatus === "logout" && type === 1) {
      setCreateattendance({ ...createattendance, attendanceType: 3 });
    }
    if (newStatus === "login" && type === 2) {
      setCreateattendance({ ...createattendance, attendanceType: 4 });
    }
    if (newStatus === "logout" && type === 2) {
      setCreateattendance({ ...createattendance, attendanceType: 5 });
    }
  };

  const handleOutClick = (e) => {
    let newStatus;
    setShowQuestionInOut(true);
    // setEnterUser(false);
    getCurrenttime();
    getCurrenttime();
    if (!!!status) {
      setOutUser(true);
      newStatus = "logout";
      setStatus("logout");
    } else if (status === "login") {
      setOutUser(true);
      newStatus = "logout";
      setStatus("logout");
    } else {
      newStatus = "";
      setStatus("");
    }
    if (newStatus === "login" && type === 0) {
      setCreateattendance({ ...createattendance, attendanceType: 0 });
    }
    if (newStatus === "logout" && type === 0) {
      setCreateattendance({ ...createattendance, attendanceType: 1 });
    }
    if (newStatus === "login" && type === 1) {
      setCreateattendance({ ...createattendance, attendanceType: 2 });
    }
    if (newStatus === "logout" && type === 1) {
      setCreateattendance({ ...createattendance, attendanceType: 3 });
    }
    if (newStatus === "login" && type === 2) {
      setCreateattendance({ ...createattendance, attendanceType: 4 });
    }
    if (newStatus === "logout" && type === 2) {
      setCreateattendance({ ...createattendance, attendanceType: 5 });
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="d-flex text-center">
          {/* <p className="font-bold text-xl">{saat}</p> */}
          <p className="mt-4" >{`   ${weekday}, ${persianDay} ${monthName}`} </p>
        </Row>
        <hr />
        <Container fluid className="">
          <Row>
            <Col className="" md="6">
              <Col md="12">
                <MapLocation isLocation={isLocation} setIsLocation={setIsLocation} />
              </Col>
              {/* <Col md="12">
                <div className="d-flex items-center justify-content-center mt-5">
                  {!!isLocation?.[0] ? (
                    <div>
                      <p>عرض جغرافیایی: {isLocation?.[0]}</p>
                      <p>طول جغرافیایی: {isLocation?.[1]}</p>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </Col> */}
            </Col>
            <Col className="" md="6">
              {status && isLocation?.latitude && isLocation?.longitude ? (
                <div className="mt-5 text-center text-sm  mb-4 border p-3 bg-light rounded-2 w-50 mx-auto">
                  <span className="font-bold">
                    {status === "login" && type === 0 && (
                      <span className="text-success"> ورود </span>
                    )}
                    {status === "logout" && type === 0 && (
                      <span className="text-danger"> خروج </span>
                    )}
                    {status === "login" && type === 1 && (
                      <span className="text-white"> ورود با مرخصی </span>
                    )}
                    {status === "logout" && type === 1 && (
                      <span className="text-white"> خروج با مرخصی </span>
                    )}
                    {status === "login" && type === 2 && (
                      <span className="text-white"> ورود با ماموریت </span>
                    )}
                    {status === "logout" && type === 2 && (
                      <span className="text-white"> خروج با مرخصی </span>
                    )}
                    در ساعت {currentTime}
                  </span>
                </div>
              ) : null}
              <Col className="d-flex row" md="12">
                <div className="toggle-button-cover d-flex">
                  <div className="button r shadow" id="button-1">
                    <input name="in" value={enterUser} checked={false} onClick={handleEnterClick} onTouchMove={handleEnterClick} type="checkbox" className="checkbox" />
                    <div className="knobs">
                      <span className="d-flex font12 fw-bold bg-white text-start text-secondary justify-content-start me-2 mt-1" >
                        {titleSwitch?.in}
                      </span>
                    </div>
                    <div className="layer"></div>
                  </div>
                </div>
                <div className="toggle-button-cover">
                  <div className="button r shadow" id="button-3">
                    <input name="in" value={outUser} checked={false} onClick={!isSmallScreen ? handleOutClick : null} onTouchMove={handleOutClick} type="checkbox" className="checkbox" />
                    <div className="knobs">
                      <span className="d-flex font12 fw-bold bg-white text-start text-secondary justify-content-start me-2 mt-1" >
                        {titleSwitch?.in}
                      </span>
                    </div>
                    <div className="layer"></div>
                  </div>
                </div>
              </Col>
              <Row className="">
                <Col md="12" xl="12" xxl="12">
                  <div
                    onClick={() => setOpenMod(true)}
                    className="cursorPointer w-50 rounded-2 text-center text-white bg-dark mx-auto mt-5 py-2 mb-4"
                  >
                    انتخاب نوع ورود و خروج
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <div
        onClick={() => setOpenMod(false)}
        className={
          "overlay fixed h-screen w-screen top-0 right-0 left-0 bottom-0 bg-black/80 z-[9]" +
          (openMod ? " opacity-100 visible" : " invisible opacity-0 ")
        }
      ></div>
      {openMod && (
        <Entry_ExitModal
          setTitleSwitch={setTitleSwitch}
          type={type}
          setType={setType}
          openMod={openMod}
          setOpenMod={setOpenMod}
        />
      )}
      {showQuestionInOut && (
        <QuestionInOutModal
          isLocation={isLocation}
          setIsQuestionInOut={setIsQuestionInOut}
          createattendance={createattendance}
          showQuestionInOut={showQuestionInOut}
          setShowQuestionInOut={setShowQuestionInOut}
        />
      )}
    </>
  );
};

export default RecordDevice;
