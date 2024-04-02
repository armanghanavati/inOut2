import React, { useState } from "react";
import { Col, Container, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useMyContext } from "../components/contextProvider/MyContext";
import { useNavigate } from "react-router-dom";
import Btn from "../components2/Btn";

const Header = () => {
  const { userRole } = useMyContext();
  const navigate = useNavigate();



  return (
    <>
      <Col
        md="12"
        className="d-flex text-center  bg-dark shadow p-4 text-white justify-content-center"
      >
        <Col md="2">

        </Col>
        <Col className="">
          <p md="8" className="">
           فرتاک راهکار آراد ایمن
          </p>
        </Col>
        <Col md="2">
        </Col>
        {/* <Col md="5" >
            <span> hhh </span>
          </Col> */}
      </Col>
    </>
  );
};

export default Header;




// import React, { useState } from "react";
// import { Col, Container, Modal, Row, Tab, Tabs } from "react-bootstrap";
// import { FaBars } from "react-icons/fa";
// import { useMyContext } from "../components/contextProvider/MyContext";
// import { useNavigate } from "react-router-dom";
// import Btn from "../components2/Btn";

// const Header = () => {
//   const { userRole } = useMyContext();
//   const [openMod, setOpenMod] = useState(false);
//   const navigate = useNavigate();

//   const handleExit = () => {
//     setOpenMod(false);
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <header>
//         <Row className="d-flex text-center  bg-dark shadow p-4 text-white justify-content-center">
//           <Col
//             onClick={() => setOpenMod(true)}
//             className=" d-flex cursorPointer justify-content-center align-items-center text-center border border-white rounded-4"
//             // md="2"
//             // xs="12"
//           >
//             <i className="bi bi-power ms-2 d-flex justify-content-center align-items-center text-center" />
//             <span>خروج</span>
//           </Col>
//           <Col md="8" xs="12" className="">
//             <p  className="">
//               شرکت فرتاک راهکار آراد ایمن
//             </p>
//           </Col>
//           <Col xs="12" md="2">
//             {!!userRole?.firstName && (
//               <p className="onvan text-lg">{`${userRole?.firstName} ${userRole?.family}`}</p>
//             )}{" "}
//           </Col>
//         </Row>
//         { !!openMod &&
//       <Modal show={openMod} onHide={() => setOpenMod(false)}>
//         <Modal.Header className="baseBtn text-white fw-bold">
//           <Modal.Title>خروج</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container fluid>
//             <p>آیا میخواهید از سامانه خارج شوید؟</p>
//           </Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <Btn
//             variant="secondary"
//             onClick={() => {
//               setOpenMod(false);
//             }}
//             title="لغو"
//           />
//           <Btn variant="primary" onClick={handleExit} title="تایید" />
//         </Modal.Footer>
//       </Modal>}
//     </header>
//   );
// };

// export default Header;
