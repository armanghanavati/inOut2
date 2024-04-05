import React, { useEffect, useMemo, useState } from "react";
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
  const { setUserRole, setUserLocation, setIsLocation } = useMyContext();

  const handleCloseSideOnWindow = () => {
    if (showSide) {
      setShowSide(false);
    }
  };

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

  // const testMemo = () => {
  //   const memo = useMemo(() => "tese", []);
  // };

  const handleGetLocation = () => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setIsLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
      return () => clearInterval(interval);
    }, 3000);
  };

  useEffect(() => {
    handleUserRole();
    handleGetLocation();
  }, []);

  return (
    <>
      {/* <div onClick={handleCloseSideOnWindow} className=""> */}
      <Header />
      <Container fluid className="p-0">
        <div className=" d-flex justify-content-between">
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
      {/* </div> */}
    </>
  );
};

export default PrivateLayout;
