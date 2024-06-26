import Button from "react-bootstrap/Button";
import { Row, Modal, Container } from "react-bootstrap";
import Btn from "../../../components2/Btn";
import { createAttendancy } from "../../../services/MasterServices";
import Swal from "sweetalert2";

const QuestionInOutModal = ({
  showQuestionInOut,
  isLocation,
  createattendance,
  setIsQuestionInOut,
  setShowQuestionInOut,
}) => {
  const handleCreate = async () => {
    setIsQuestionInOut(true);
    setShowQuestionInOut(false);
    // setIsLocation([longitude, latitude]);
    const postData = {
      attendanceType: createattendance?.attendanceType,
      longitude: isLocation?.[0],
      latitude: isLocation?.[1]
    }
    const resCreate = await createAttendancy(postData);

    if (!resCreate.data.res) {
      Swal.fire({
        title: `${resCreate.data.msg}`,
        text: "ورود یا خروج شما ثبت نشد",
        icon: "error",
      });
    } else {
      Swal.fire({
        // title:`${res.data.msg}`,
        title: "ورود یا خروج شما ثبت شد",
        icon: "success",
      });
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        centered
        show={showQuestionInOut}
        onHide={() => {
          setShowQuestionInOut(false)

        }
        }
      >
        <Modal.Header className="baseBtn text-white fw-bold"></Modal.Header>
        <Modal.Body>
          <p> آیا میخواهید ورود خروج خود را ثبت کنید؟ </p>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="secondary"
            onClick={() => {
              setShowQuestionInOut(false);

            }}
            title=" لغو"
          />
          <Btn variant="primary" onClick={handleCreate} title=" تایید" />
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default QuestionInOutModal;