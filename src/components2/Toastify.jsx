// import React from "react";
// import { Button, Col, Row, Toast } from "react-bootstrap";

// const Toastify = ({}) => {

//   const oparationIcons = () => {
//     if (showToast.bg === "danger") {
//       return (
//         <i className="font20 text-danger bi bi-exclamation-triangle-fill" />
//       );
//     }
//     if (showToast.bg === "success") {
//       return <i className="font20 text-success bi bi-check-circle-fill" />;
//     }
//     if (showToast.bg === "warning") {
//       return <i className="font20 text-dark bi bi-exclamation-triangle-fill" />;
//     }
//   };

//   return (
//     <>
//       <Row className="d-flex toastContainer">
//         <Col xs="10" sm="10" xl="12" className="d-flex">
//           <Toast
//             bg={showToast.bg}
//             // onClose={() => dispatch(RsetShowToast({ show: false }))}
//             show={showToast.show}
//             delay={3000}
//             autohide
//           >
//             <Toast.Header>
//               <strong className="justify-content-center me-auto">
//                 {oparationIcons()}
//               </strong>
//             </Toast.Header>
//             <Toast.Body
//               className={`d-flex py-4 justify-content-end ${
//                 showToast.bg === "warning" ? "text-dark" : "text-white"
//               }`}
//             >
//               {showToast.title}
//             </Toast.Body>
//           </Toast>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default Toastify;

import React from "react";

const Toastify = () => {
  return <div>Toastify</div>;
};

export default Toastify;
