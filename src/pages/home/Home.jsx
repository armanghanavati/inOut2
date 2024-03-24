import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/index";
import { useMediaQuery } from "react-responsive";
import { Collapse, Col, Row, Container } from "react-bootstrap";
import Contant from "./contant/RecordDevice";
import TabsBase from "./TabsBase";
import { BsChevronDoubleLeft } from "react-icons/bs";

const Home = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const [showSide, setShowSide] = useState(false);

  return (
    <>
      {/* <Container fluid className="p-0">
        <div className="d-flex justify-content-between">
          {isSmallScreen && !showSide ? (
            <>
              <div className="showIcon containerSideAnimatOff sitShowSideIcon mt">
                <i
                  onClick={() => setShowSide(!showSide)}
                  className="px-2 py-4 baseBtn font20 bi cursorPointer bi-chevron-double-left text-white rounded-start-4"
                />
              </div>
            </>
          ) : null}
          {isSmallScreen ? (
            <Collapse
              in={showSide}
              className="col-6 col-sm-5 col-md-3"
              dimension="width"
            >
              <Row className="containerSideAnimat">
                <div className="baseBtn rounded-start-4 mt-4">
                  <Sidebar showSide={showSide} setShowSide={setShowSide} />
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
              <Sidebar showSide={showSide} setShowSide={setShowSide} />
            </Col>
          )}
          <Col
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="9"
            className="bg-light rounded-4 shadow-lg mt-4"
          > */}
      <TabsBase />
      {/* </Col>
        </div>
      </Container> */}
    </>
  );
};

export default Home;
