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

const RecordDevice = () => {
  const [openMod, setOpenMod] = useState(false);
  const {
    control,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange" });
  //   استیت استاتوس برای ورود و خروج کاربر است که یعنی ورود کرده یا خروج کرده
  const [status, setStatus] = useLocalStorageState("status", "");
  // استیت تایپ برای نوع ورود خروج است که یعنی ورود خروخ معمولی بوده یا با مرخصی یا با ماموریت
  const [type, setType] = useState(0);
  // استیت مربوط به عرض و طول جغرافیایی
  const [location, setLocation] = useState({});
  const [showQuestionInOut, setShowQuestionInOut] = useState(false);
  const [isQuestionInOut, setIsQuestionInOut] = useState(false);
  const [enterUser, setEnterUser] = useState(false);
  const [outUser, setOutUser] = useState(false);

  // استیت مربوط به نوع ورود و خروج
  // const[attendancetype,setAttendancetype]=useState(0)

  const [currentTime, setCurrenttime] = useLocalStorageState("currenttime", "");
  const [saat, setSaat] = useState("");
  const loginRef = useRef()
  // تقویم شمسی
  const [persianYear, setPersianYear] = useState("");
  const [persianMonth, setPersianMonth] = useState("");
  const [persianDay, setPersianDay] = useState("");

  const [weekday, setWeekday] = useState("");
  const [monthName, setMonthName] = useState("");

  //
  const [userData, setUserData] = useLocalStorageState("userData", "");
  // state for createattendance
  const [createattendance, setCreateattendance] = useState({
    attendanceType: `${type}`,
    latitude: 0,
    longitude: 0,
    // دریافت طول و عرض جغرافیایی
  });

  // const isInitialRender = useRef(true);
  useEffect(() => {
    // if (isInitialRender.current) {
    //   isInitialRender.current = false;
    //   return;
    // }

    let newCreateAttendance = { ...createattendance };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          newCreateAttendance = {
            ...newCreateAttendance,
            latitude,
            longitude,
          };
          setCreateattendance(newCreateAttendance);
        },
        (error) => {
          Swal.fire({
            title: "Error getting geolocation",
            text: `${error.message}`,
            icon: "error",
          });
        }
      );
    } else {
      Swal.fire({
        title: "موقعیت شما یافت نشد",
        icon: "error",
      });
    }
    // Swal.fire({
    //   title: "ایا میخواهید ورود خروج خودرا ثبت کنید؟",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "آری!",
    //   cancelButtonText: "خیر",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const token = JSON.parse(localStorage.getItem("token"));
    //     const headers = {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     };
    //     axios
    //       .post(
    //         "https://auto.fanwebco.com/InOut_api/api/AttendanceController/CreateAttendancy",
    //         newCreateAttendance,
    //         { headers: headers }
    //       )
    //       .then((res) =>
    //         !res.data.res
    //           ? Swal.fire({
    //               title: `${res.data.msg}`,
    //               text: "ورود یا خروج شما ثبت نشد",
    //               icon: "error",
    //             })
    //           : Swal.fire({
    //               // title:`${res.data.msg}`,
    //               title: "ورود یا خروج شما ثبت شد",
    //               icon: "success",
    //             })
    //       )
    //       .catch((err) =>
    //         Swal.fire({
    //           text: `${err.message}`,
    //           icon: "error",
    //         })
    //       );
    //   } else {
    //     Swal.fire({
    //       title: "ورود خروج شما ثبت نشد",
    //       icon: "error",
    //     });
    //   }
    // });
  }, [status]);

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
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axios
      .post(
        "https://www.auto.fanwebco.com/InOut_api/api/Account/UserDetailsToken",
        {},
        { headers: headers }
      )
      .then((res) => setUserData(res.data.model))
      .catch((error) =>
        Swal.fire({
          text: "از اتصال اینترنت اطمینان حاصل نمایید",
          icon: "error",
        })
      );
  }, []);

  useEffect(() => {
    console.log(loginRef);
  }, [loginRef]);

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
        console.log("Hello owordl");
        setEnterUser(false)
      }, 300);
    }
    if (outUser) {
      setTimeout(() => {
        setOutUser(false)
      }, 300);
    }
  }, [enterUser, outUser]);
  // پایان تقویم شمسی

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

  useEffect(now, []);

  const handleEnterClick = (e) => {

    console.log(e);
    setShowQuestionInOut(true);
    var newStatus;
    getCurrenttime();
    if (!!!status) {
      newStatus = "login";
      setEnterUser(true)
      setStatus("login");
    } else if (status === "logout") {
      setEnterUser(true)
      newStatus = "login";
      setStatus("login");
    } else {
      newStatus = "";
      setStatus("");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setCreateattendance({ ...createattendance, latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
    getCurrenttime();
    if (!!!status) {
      setOutUser(true)
      newStatus = "logout";
      setStatus("logout");
    } else if (status === "login") {
      setOutUser(true)
      newStatus = "logout";
      setStatus("logout");
    } else {
      newStatus = "";
      setStatus("");
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setCreateattendance({ ...createattendance, latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // setStatus(newStatus);

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
          <p className="font-bold text-xl">{saat}</p>
          <p>{`   ${weekday}, ${persianDay} ${monthName}`} </p>
        </Row>
        <hr />
        <Container fluid className="">
          <Row>
            <Col className="" md="6">
              <Col md="12">
                {!!location?.longitude && (
                  <MapLocation location={location} setLocation={setLocation} />
                )}
              </Col>
              <Col md="12">
                <div className="d-flex items-center justify-content-center mt-5">
                  {location.latitude ? (
                    <div>
                      <p>عرض جغرافیایی: {location.latitude}</p>
                      <p>طول جغرافیایی: {location.longitude}</p>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              </Col>
            </Col>
            <Col className="" md="6">
              {status && location.latitude && location.longitude ? (
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
              <Col className="" md="12">
                <div className=" mx-auto text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <SwitchCase
                      ref={loginRef}
                      name="in"
                      onChange={handleEnterClick}
                      checked={enterUser}
                      value={enterUser}
                      className="sr-only peer"
                      label="ورود"
                    />
                  </label>
                </div>
                <div className=" mx-auto text-center  ">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <SwitchCase
                      name="out"
                      onChange={handleOutClick}
                      checked={outUser}
                      value={outUser}
                      className="sr-only peer"
                      label="خروج"
                    />
                  </label>
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
          type={type}
          setType={setType}
          openMod={openMod}
          setOpenMod={setOpenMod}
        />
      )}
      {showQuestionInOut && (
        <QuestionInOutModal
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
