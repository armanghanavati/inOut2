import React from "react";
import { Col, Row } from "react-bootstrap";

const MainTitle = ({ label = "" }) => {
  return (
    <Col
      xs="10"
      sm="9"
      md="8"
      lg="6"
      xl="4"
      className="mt-4 d-flex justify-content-center rounded-start-pill baseBtn text-white p-4"
    >
      {label}
    </Col>
  );
};

export default MainTitle;
