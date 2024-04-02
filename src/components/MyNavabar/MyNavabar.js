import React, { useState } from "react";
import Swal from "sweetalert2";
import "./MyNavbar.css";
// import ax from '../../asset/logo.png'
import { Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Modal,
} from "react-bootstrap";
import Header from "../../layout/Header";
import { useMyContext } from "../contextProvider/MyContext";
import Btn from "../../components2/Btn";
// import { WindowSharp } from '@mui/icons-material';

const MyNavabar = ({ title, open, setOpen }) => {
  const navigate = useNavigate();
  const [openMod, setOpenMod] = useState(false);
  const handleExit = () => {
    setOpenMod(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="my-4 mx-2 my-sm-1">
        <Col xl="12" className="sideAnimate cursorPointer my-4 py-2 ">
          <Link className=" text-decoration-none d-flex" to="/user/home">
            <i className="d-flex align-items-center bi bi-check2 font20 text-white" />
            <span className=" text-white  me-2">ثبت ورود و خروج</span>
          </Link>
        </Col>
        {/* <Col sm="12" xl="12" md="12" onClick={() => setOpen(!open)} className='d-flex sideAnimate cursorPointer' >
          <i className="d-flex align-items-center bi bi-calendar2-minus text-white font20 ms-2" />
          <span className='text-white ms-3' >
            مدیریت صورت حساب ها
          </span>
          {!open ? <i className="d-flex align-items-center bi bi-caret-down font20 align-items-center text-white" /> : <i className="d-flex align-items-center  font20 align-items-center bi bi-caret-up-fill text-white" />}
        </Col>
        <Collapse in={open} className='col-sm-12 col-md-12'>
          <Row className="" >
            <Col sm="12" md="12" xl="12" id="example-collapse-text" className='d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
              <i className='d-flex align-items-center mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
              <span className=' text-white  ms-3'>
                صورت حساب
              </span>
            </Col>
            <Col sm="12" md="12" xl="12" id="example-collapse-text" className=' d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
              <i className='d-flex align-items-center mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
              <span className=' text-white  ms-3'>
                صورت حساب های تایید نشده
              </span>
            </Col>
            <Col sm="12" md="12" xl="12" id="example-collapse-text" className=' d-flex cursorPointer mt-4 justify-content-sm-start justify-content-xl-start justify-content-md-center align-items-center me-4 text-white'>
              <i className='d-flex align-items-center mt-2 font20 mb-2 d-flex justify-content-start bi bi-caret-left ms-1 text-white' />
              <span className=' text-white  ms-3'>
                صورت حساب های نیازمند بررسی
              </span>
            </Col>
          </Row>
        </Collapse> */}
        <Col xl="12" className="sideAnimate cursorPointer my-4 py-2 ">
          <Link className="d-flex text-decoration-none" to="/user/report">
            <i className="d-flex align-items-center bi bi-card-checklist font20 text-white" />
            <span className="text-white  me-2">گزارش</span>
          </Link>
        </Col>
        <Col xl="12" className="sideAnimate cursorPointer my-4 py-2 ">
          <Link className="d-flex text-decoration-none" to="/user/about">
            <i className="d-flex align-items-center bi bi-clipboard-data font20 text-white" />
            <span className="text-white  me-2">درباره سامانه دینگ</span>
          </Link>
        </Col>
        <Col xl="12" className="sideAnimate cursorPointer my-4 py-2 ">
          <Link className="d-flex text-decoration-none" to="/user/setting">
            <i className="d-flex align-items-center bi bi-gear font20 text-white" />
            <span className="text-white  me-2">تنظیمات</span>
          </Link>
        </Col>
        <Col xl="12" className="sideAnimate cursorPointer my-4 py-2 ">
          <Link className="d-flex text-decoration-none" to="/user/shift">
            <i className="d-flex align-items-center bi bi-calendar2-date font20 text-white" />
            <span className="text-white  me-2">شیفت های من</span>
          </Link>
        </Col>
        <Col xl="12" className="sideAnimate cursorPointer my-4 py-2 ">
          <Link className="d-flex text-decoration-none" to="/user/leave">
            <i className="d-flex align-items-center bi bi-question-circle font20 text-white" />
            <span className="text-decoration-none text-white  me-2">
              درخواست ها
            </span>
          </Link>
        </Col>
        <Col
          onClick={() => setOpenMod(true)}
          xl="12"
          className="d-flex sideAnimate cursorPointer my-4 py-2 "
        >
          <i className=" d-flex align-items-center bi bi-power font20 text-white" />
          <span className="text-decoration-none text-white  me-2">خروج</span>
        </Col>
      </div>
      {openMod && (
        <Modal show={openMod} onHide={() => setOpenMod(false)}>
          <Modal.Header className="baseBtn text-white fw-bold">
            <Modal.Title>خروج</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <p>آیا میخواهید از سامانه خارج شوید؟</p>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Btn
              variant="secondary"
              onClick={() => {
                setOpenMod(false);
              }}
              title="لغو"
            />
            <Btn variant="primary" onClick={handleExit} title="تایید" />
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default MyNavabar;
