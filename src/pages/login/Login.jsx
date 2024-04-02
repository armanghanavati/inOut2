import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useLocalStorageState from "use-local-storage-state";
import AOS from "aos";
import "aos/dist/aos.css";
import InstallPrompt from "../../InstallPrompt";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InputText from "../../components2/InputText";
import { useForm } from "react-hook-form";
import Btn from "../../components2/Btn";
import {
  accountLogin,
  getAllUsers,
  getUserRole,
} from "../../services/MasterServices";
import logo from "../../asset/logo.jpg";
import Swal from "sweetalert2";
import { useMyContext } from "../../components/contextProvider/MyContext";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm({ reValidateMode: "onChange" });
  const { setUserRole } = useMyContext();
  const [userData, setUserData] = useLocalStorageState("userData", "");

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   const userRole = JSON.parse(localStorage.getItem("userRole"));
  //   if (token && userRole === "Admin") {
  //     navigate("/adminlogin");
  //   } else if (token && userRole === "User") {
  //     navigate("/home");
  //   } else {
  //     console.log("hi");
  //   }
  // }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleSub = async (data) => {
    const postData = {
      userName: data?.userName,
      password: data?.password,
    };
    try {
      const res = await accountLogin(postData);
      if (res?.data?.res === 1) {
        handleUserRole();
        localStorage.setItem("tokenId", res?.data?.jwtToken);
        localStorage.setItem("userRole", res?.data?.userRole);
        navigate("/user/home");
      }else {
        Swal.fire({
          text: res?.data?.err,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // موقت
  const handleGetAllUsers = async () => {
    try {
      const res = await getAllUsers();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // user role
  const handleUserRole = async () => {
    try {
      const res = await getUserRole();
      if (res?.data?.res === 1) {
        setUserData(res?.data?.model);
        setUserRole(res?.data?.model);
      } else {
        Swal.fire({
          text: "از اتصال اینترنت اطمینان حاصل نمایید",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  // onSubmit={(values, { setSubmitting }) => {
  //     axios.post('https://www.auto.fanwebco.com/InOut_api/api/Account/Login', {
  //         userName: `${values.userName}`,
  //         password: `${values.password}`
  //     }).then((res) => (
  //         setSubmitting(false),
  //         res.data.jwtToken ? (
  //             setToken(res.data.jwtToken),
  //             setUserRole(res.data.userRole),
  //             Swal.fire({
  //                 position: "center",
  //                 icon: "success",
  //                 title: "شما با موفقیت وارد شدید",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //                 timerProgressBar: true
  //             }),
  //             (res.data.userRole === 'Admin' ? navigate('/adminlogin') : navigate('/home'))
  //         ) : (
  //             Swal.fire({
  //                 title: "کاربر با مشخصات وارد شده یافت نشد",
  //                 icon: "error",
  //                 width: 400,
  //                 heightAuto: false,
  //                 confirmButtonText: "بازگشت"
  //             })

  //         )
  //     ))
  //         .catch(error =>
  //             Swal.fire({
  //                 text: `${error.message}`,
  //                 icon: 'error',
  //                 confirmButtonColor: 'red'

  return (
    <>
      <Container fluid className="vh-100 ">
        {/* bg-cover  bg-center flex items-center justify-center bg-zinc-100 h-screen */}
        <Row className="vh-100">
          {/* <InstallPrompt /> */}
          <div className="d-flex bg-dark justify-content-center align-items-center">
            <Col
              xs="12"
              sm="9"
              md="7"
              lg="6"
              xl="4"
              className="bg-white shadow  mx-auto my-auto p-4 rounded-4 "
            >
              <InstallPrompt />
              <form className="justify-content-center bg-white">
                <div className="bg-white">
                  <div className="d-flex  justify-content-center">
                    <img src={logo} width={100} height={100} />
                  </div>
                  <InputText
                    xl={12}
                    errmsg="لطفا نام کاربری خود را وارد کنید"
                    label="نام کاربری:"
                    type="text"
                    validation={{
                      required: "لطفا نام کاربری را وارد کنید",
                      minLength: {
                        message: "نام کاربری باید بیشتر از 2 حرف باشد",
                        value: 2,
                      },
                    }}
                    control={control}
                    name="userName"
                    errors={errors}
                    important
                    className="py-2"
                    length_num={20}
                  />
                  <InputText
                    errmsg="لطفا رمز عبور خود را وارد کنید"
                    // setEditStyle={() => {
                    //     setShowPass(!showPass);
                    // }}
                    // showCharacter
                    errors={errors}
                    label="رمز عبور:"
                    xl={12}
                    important
                    validation={{
                      required: "لطفا رمز عبور خود را وارد کنید",
                      minLength: {
                        message: "رمز عبور خود باید بیشتر از 2 حرف باشد",
                        value: 2,
                      },
                    }}
                    name="password"
                    control={control}
                    type="password"
                    // type={showPass ? "text" : "password"}
                    className="py-2"
                  />
                </div>
                <Col sm="12" md="12" xl="12">
                  <Btn
                    xl={12}
                    title="ورود"
                    onClick={handleSubmit((data) => handleSub(data))}
                    loadingName="login"
                    className="bg-purple mt-4 text-white border-none py-2 rounded-4 w-100 p-2"
                  />
                </Col>
                <Row className="mt-4">
                  <Col sm="12" md="12" xl="12">
                    <p className="">
                      <Link
                        className="font12 text-primary text-decoration-none"
                        to="#"
                      >
                        رمز خود را فراموش کرده اید؟
                      </Link>
                    </p>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm="12" md="12" xl="12" className="">
                    <p className=" font12 d-flex align-items-center justify-content-center">
                      هنوز ثبت نام نکرده اید؟
                      <Link className="text-decoration-none" to="/register">
                        <span className=" me-1 text-primary "> ثبت نام </span>
                      </Link>
                    </p>
                  </Col>
                </Row>
              </form>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Login;

// <div className='bg-cover  bg-center flex items-center justify-center bg-zinc-100 h-screen'>
//     <div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" className="w-full md:w-[400px] flex items-center justify-center  rounded-xl shadow-2xl  ">
//         <div className=" rounded-xl">
//             s
//             <form onSubmit={handleSubmit} action="" className=" form_main">
//                 <p className="heading">Login</p>
//                 <div className="inputContainer">
//                     {/* <input onChange={handleChange} onBlur={handleBlur} value={values.userName}  name="userName" id="userName" type="text" className="inputField"  placeholder="نام کاربری"/> */}
//                     <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2e2e2e" viewBox="0 0 16 16">
//                         <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
//                     </svg>
//                 </div>
//                 <div class="inputContainer">
//                     {/* <input  onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" name="password" id="password"  className="inputField"  placeholder="رمز عبور"/> */}
//                     <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
//                         <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
//                     </svg>
//                 </div>
//                 {/* <button className='flex items-center justify-center py-4 rounded-md' type='submit' id="button">{isSubmitting ? <PulseLoader color="#ffffff" />:'ورود'}</button> */}
//                 <Link className="forgotLink" href="#">رمز عبور خود را فراموش کرده اید؟</Link>
//             </form>
//         </div>
//     </div>
// </div>
