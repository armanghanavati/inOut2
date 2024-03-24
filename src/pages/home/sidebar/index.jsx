import React from "react";
import { Col, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import MyNavabar from "../../../components/MyNavabar/MyNavabar";
import { BsChevronDoubleLeft } from "react-icons/bs";

const SideBar = ({ showSide, setShowSide }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });

  return (
    <>
      <Container fluid className="py-4 positionRelative ">
        {isSmallScreen && (
          <>
            <Col xl="5" className='showIcon sitShowSideIcon baseBtn rounded-start-4 mt-4'>
              <i onClick={() => setShowSide(!showSide)} className='px-2 py-4 baseBtn cursorPointer bi  bi-chevron-double-right text-white font20  rounded-start-4  ' />
            </Col>
          </>
        )}
        <hr className="text-white" />
        <MyNavabar />
      </Container>
    </>
  );
};

export default SideBar;

