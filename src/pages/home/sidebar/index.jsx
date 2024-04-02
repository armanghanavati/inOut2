import React from "react";
import { Col, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import MyNavabar from "../../../components/MyNavabar/MyNavabar";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useMyContext } from "../../../components/contextProvider/MyContext";

const SideBar = ({ showSide, setShowSide }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const { userRole } = useMyContext();

  return (
    <>
      <Container fluid className="py-4 positionRelative ">
        {isSmallScreen && (
          <>
            <Col
              xl="5"
              className="showIcon sitShowSideIcon baseBtn rounded-start-4 mt-4"
            >
              <i
                onClick={() => setShowSide(!showSide)}
                className="px-2 py-4 baseBtn cursorPointer bi  bi-chevron-double-right text-white font20  rounded-start-4 d-flex align-items-center"
              />
            </Col>
          </>
        )}
        {!!userRole?.firstName && (
          <p className="text-white d-flex text-center justify-content-center text-lg">{`${userRole?.firstName} ${userRole?.family}`}</p>
        )}
        <hr className="text-white" />
        <MyNavabar />
      </Container>
    </>
  );
};

export default SideBar;
