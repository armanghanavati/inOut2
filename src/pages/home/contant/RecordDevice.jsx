import React, { useEffect, useRef, useState } from "react";
import { BsSun } from "react-icons/bs";
import moment from "jalali-moment";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import Swal from "sweetalert2";

const RecordDevice = () => {
  const [pop, setPop] = useState(false);

  //   استیت استاتوس برای ورود و خروج کاربر است که یعنی ورود کرده یا خروج کرده
  const [status, setStatus] = useLocalStorageState("status", "");

  // استیت تایپ برای نوع ورود خروج است که یعنی ورود خروخ معمولی بوده یا با مرخصی یا با ماموریت
  const [type, setType] = useState(0);
  // استیت مربوط به عرض و طول جغرافیایی
  const [location, setLocation] = useState({});

  // استیت مربوط به نوع ورود و خروج
  // const[attendancetype,setAttendancetype]=useState(0)

  const [currentTime, setCurrenttime] = useLocalStorageState("currenttime", "");
  const [saat, setSaat] = useState("");
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

  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (status) {
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
          title: "Geolocation is not supported by this browser",
          icon: "error",
        });
      }
      Swal.fire({
        title: "ایا میخواهید ورود خروج خودرا ثبت کنید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "آری!",
        cancelButtonText: "خیر",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = JSON.parse(localStorage.getItem("token"));
          const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          };
          axios
            .post(
              "https://auto.fanwebco.com/InOut_api/api/AttendanceController/CreateAttendancy",
              newCreateAttendance,
              { headers: headers }
            )
            .then((res) =>
              !res.data.res
                ? Swal.fire({
                    title: `${res.data.msg}`,
                    text: "ورود یا خروج شما ثبت نشد",
                    icon: "error",
                  })
                : Swal.fire({
                    // title:`${res.data.msg}`,
                    title: "ورود یا خروج شما ثبت شد",
                    icon: "success",
                  })
            )
            .catch((err) =>
              Swal.fire({
                text: `${err.message}`,
                icon: "error",
              })
            );
        } else {
          Swal.fire({
            title: "ورود خروج شما ثبت نشد",
            icon: "error",
          });
        }
      });
    }
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
  // تابع استاتوس هندلرر مشخص میکند که تابع ورود کرده یا خروج کرده
  // const statusHandler=(e)=>{
  //     if (navigator.geolocation) {
  //             navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //                 const { latitude, longitude } = position.coords;
  //                 setLocation({latitude, longitude} );
  //                 setCreateattendance({...createattendance,latitude,longitude})
  //             },
  //             (error) => {
  //                 console.error('Error getting geolocation:', error.message);
  //             }
  //             );
  //         }
  //         else {
  //             console.error('Geolocation is not supported by this browser.');
  //         }
  //     const newStatus = e.target.value;
  //         setStatus(newStatus);

  //         if (newStatus === 'login' && type === 0) {
  //             setCreateattendance({ ...createattendance, attendanceType: 0 });
  //         }
  //         if (newStatus === 'logout' && type === 0) {
  //             setCreateattendance({ ...createattendance, attendanceType: 1 });
  //         }
  //         if (newStatus === 'login' && type === 1) {
  //             setCreateattendance({ ...createattendance, attendanceType: 2 });
  //         }
  //         if (newStatus === 'logout' && type === 1) {
  //             setCreateattendance({ ...createattendance, attendanceType: 3 });
  //         }
  //         if (newStatus === 'login' && type === 2) {
  //             setCreateattendance({ ...createattendance, attendanceType: 4 });
  //         }
  //         if (newStatus === 'logout' && type === 2) {
  //             setCreateattendance({ ...createattendance, attendanceType: 5 });
  //     }
  // }

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
  const enterclick = (e) => {
    var newStatus;
    getCurrenttime();
    if (!status) {
      newStatus = "login";
      setStatus("login");
    } else if (status === "logout") {
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
  const outclick = (e) => {
    let newStatus;
    getCurrenttime();
    if (!status) {
      newStatus = "logout";
      setStatus("logout");
    } else if (status === "login") {
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
      <div>
        <div className="time w-[200px] h-[200px] mx-auto rounded-full bg-purple-100 mt-32 p-5 flex flex-col justify-center items-center gap-y-4">
          <p className="font-bold text-xl">{saat}</p>
          <p>{`   ${weekday}, ${persianDay} ${monthName}`} </p>
          <p>قزوین</p>
          <div className="flex items-center justify-center gap-x-2">
            <p>13°C</p>
            <BsSun />
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          {location.latitude ? (
            <div>
              <p>عرض جغرافیایی: {location.latitude}</p>
              <p>طول جغرافیایی: {location.longitude}</p>
              <p className="text-green-500">لوکیشن شما با موفقیت دریافت شد</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>

        <div className="mt-20 text-center text-sm  mb-7 border p-3 bg-purple-100 rounded-full w-[60%] mx-auto">
          {status && location.latitude && location.longitude ? (
            <span className="font-bold">
              {status === "login" && type === 0 && (
                <span className="text-green-500"> ورود </span>
              )}
              {status === "logout" && type === 0 && (
                <span className="text-red-500"> خروج </span>
              )}
              {status === "login" && type === 1 && (
                <span className="text-green-500"> ورود با مرخصی </span>
              )}
              {status === "logout" && type === 1 && (
                <span className="text-red-500"> خروج با مرخصی </span>
              )}
              {status === "login" && type === 2 && (
                <span className="text-red-500"> ورود با ماموریت </span>
              )}
              {status === "logout" && type === 2 && (
                <span className="text-red-500"> خروج با مرخصی </span>
              )}
              در ساعت {currentTime}
            </span>
          ) : null}
        </div>

        <div className="my-5 mx-auto text-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onClick={enterclick}
              checked={status === "login" ? true : false}
              value="login"
              className="sr-only peer"
            />
            <div className="w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-green-600"></div>
            <span className="ms-3 text-sm font-bold text-gray-900 ">ورود </span>
          </label>
        </div>
        <div className=" mx-auto text-center  ">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onClick={outclick}
              checked={status === "logout" ? true : false}
              value="logout"
              className="sr-only peer"
            />
            <div className="w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-green-600"></div>
            <span className="ms-3 text-sm font-bold text-gray-900 ">خروج </span>
          </label>
        </div>
        <div
          onClick={() => setPop(true)}
          className="cursor-pointer w-[65%] text-center  rounded-full text-white bg-purple-500 mx-auto mt-5 py-2 px-5 mb-4"
        >
          انتخاب نوع ورود و خروج
        </div>
      </div>
      <div
        className={
          "fixed  z-[10] top-48 right-5 left-5 bg-zinc-100 rounded-lg overflow-hidden pb-5 " +
          (pop ? " visible " : " invisible")
        }
      >
        <div className=" w-full text-center px-5 py-2 bg-purple-500 font-bold  text-white ">
          انتخاب نوع ورود و خروج
        </div>
        <div className="flex flex-col mt-4 gap-y-3 px-5">
          <button
            onClick={() => setType(0)}
            className={
              "border rounded-xl  text-center py-2 border-purple-500 my-2 mx-2" +
              (!type ? "  text-white bg-purple-500" : " text-black bg-white")
            }
          >
            ورود و خروج به صورت عادی
          </button>
          <button
            onClick={() => setType(1)}
            className={
              "border rounded-xl  text-center py-2 border-purple-500 my-2 mx-2" +
              (type == 1
                ? "  text-white bg-purple-500"
                : " text-black bg-white")
            }
          >
            ورود و خروج با مرخصی
          </button>
          <button
            onClick={() => setType(2)}
            className={
              "border rounded-xl  text-center py-2 border-purple-500 my-2 mx-2" +
              (type == 2
                ? "  text-white bg-purple-500"
                : " text-black bg-white")
            }
          >
            {" "}
            ورود و خروج با ماموریت
          </button>
        </div>
        <div className="flex items-center justify-center gap-x-3 px-5 mb-3 mt-4">
          <button
            onClick={() => {
              setType(type);
              setPop(false);
            }}
            className="rounded-2xl  border border-black  w-1/2 px-4 py-1"
          >
            اعمال
          </button>
          <button
            onClick={() => {
              setType(0);
              setPop(false);
            }}
            className="rounded-2xl  border border-black  w-1/2 px-4 py-1"
          >
            لغو
          </button>
        </div>
      </div>
      {/* overlay */}
      <div
        onClick={() => setPop(false)}
        className={
          "overlay fixed h-screen w-screen top-0 right-0 left-0 bottom-0 bg-black/80 z-[9]" +
          (pop ? " opacity-100 visible" : " invisible opacity-0 ")
        }
      ></div>
    </>
  );
};

// {
//   toastSucc.show && (
//     <Row className="d-flex toastContainer">
//       <Col xs="10" sm="10" xl="12" className="d-flex">
//         <Toast
//           bg={toastSucc.bg}
//           onClose={() => setToastSucc({ show: false })}
//           show={toastSucc.show}
//           delay={3000}
//           autohide
//         >
//           <Toast.Header>
//             <strong className="justify-content-center me-auto">
//               <i className="font20 text-danger bi bi-exclamation-triangle-fill" />
//             </strong>
//           </Toast.Header>
//           <Toast.Body
//             className={`d-flex py-4 justify-content-end ${
//               toastSucc.bg === "warning" ? "text-dark" : "text-white"
//             }`}
//           >
//             {toastSucc.title}
//           </Toast.Body>
//         </Toast>
//       </Col>
//     </Row>
//   );
// }
// {
//   openMod && (
//     <Entry_ExitModal
//       type={type}
//       setType={setType}
//       openMod={openMod}
//       setOpenMod={setOpenMod}
//     />
//   );
// }

export default RecordDevice;
