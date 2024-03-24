import React, { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

const Header = ({ title = "", open, setOpen }) => {
  const userRoll = JSON.parse(localStorage.getItem("userData"));

  console.log(userRoll);

  return (
    <>
      <Col
        md="12"
        className="d-flex text-center  bg-dark shadow p-4 text-white justify-content-center"
      >
        <Col md="2">
          {/* <img className="baseBtn p-1  rounded-pill" src={logo} width={50} height={40} /> */}
        </Col>
        <Col className="">
          <p md="8" className="">
            شرکت فرتاک راهکار آراد ایمن
          </p>
        </Col>
        <Col md="2">
          <p className="onvan text-lg">{`${userRoll?.firstName} ${userRoll?.family}`}</p>
        </Col>
        {/* <Col md="5" >
            <span> hhh </span>
          </Col> */}
      </Col>
    </>
  );
};

export default Header;
