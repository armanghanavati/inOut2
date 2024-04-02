import React, { useEffect, useState } from "react";
import Header from "./Header";
import MyNavabar from "../components/MyNavabar/MyNavabar";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SideBar from "../pages/home/sidebar";
import Swal from "sweetalert2";
import { getUserRole } from "../services/MasterServices";
import { useMyContext } from "../components/contextProvider/MyContext";

const PrivateLayout = ({ children }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const [showSide, setShowSide] = useState(false);
  const {setUserRole} = useMyContext()

  const handleUserRole = async () => {
    try {
      const res = await getUserRole();
      if (res?.data?.res === 1) {
        console.log(res);
        setUserRole(res?.data?.model);
      } else {
        Swal.fire({
          text: res?.data?.err,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserRole()
  }, [])

  // const logHandler = () => {
  //   Swal.fire({
  //     title: " آیا برای خروج از اپلیکیشن اطمینان دارید؟",
  //     icon: "warning",
  //     width: "300px",
  //     showCancelButton: true,
  //     confirmButtonColor: "green",
  //     cancelButtonColor: "red",
  //     confirmButtonText: "بله",
  //     fontSize: "50px",
  //     cancelButtonText: "خیر",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       //   window.location.reload(true)
  //       localStorage.clear();

  //       Swal.fire({
  //         title: "شما با موفقیت از پروفایل خود خارج شدید!",
  //         icon: "success",
  //         width: "250px",
  //       });
  //       navigate("/login");

  //       setOpen(false);
  //     }
  //   });
  // };

  return (
    <>
      <Header />
      <Container fluid className="p-0">
        <div className="d-flex justify-content-between">
          {isSmallScreen && !showSide ? (
            <>
              <div className="showIcon containerSideAnimatOff sitShowSideIcon mt">
                <i
                  onClick={() => setShowSide(!showSide)}
                  className="d-flex align-items-center px-2 py-4 baseBtn font20 bi cursorPointer bi-chevron-double-left text-white rounded-start-4"
                />
              </div>
            </>
          ) : null}
          {isSmallScreen ? (
            <Collapse
              in={showSide}
              className="col-8 col-sm-5 col-md-3"
              dimension="width"
            >
              <Row className="containerSideAnimat">
                <div className="baseBtn rounded-start-4 mt-4">
                  <SideBar showSide={showSide} setShowSide={setShowSide} />
                </div>
              </Row>
            </Collapse>
          ) : (
            <Col
              xs="3"
              sm="3"
              md="3"
              lg="2"
              xl="2"
              className="shadow baseBtn rounded-start-4 mt-4"
            >
              <SideBar showSide={showSide} setShowSide={setShowSide} />
            </Col>
          )}
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="9"
            className="bg-light rounded-4 shadow-lg mt-4"
          >
            {children}
          </Col>
        </div>
      </Container>
    </>
  );
};

export default PrivateLayout;
