import Button from "react-bootstrap/Button";
import { Row, Modal, Container } from "react-bootstrap";
import Btn from "../../../components2/Btn";

const Entry_ExitModal = ({ openMod, setOpenMod, type, setType, setTitleSwitch }) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={openMod} onHide={() => {
        setTitleSwitch({})
        setOpenMod(false)
      }
      }>
        <Modal.Header className="baseBtn text-white fw-bold">
          <Modal.Title>نوع ورود و خروج</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <p>نوع ورود و خروج خود را تعیین کنید!</p>
            <div
              className={
                "d-fixed rounded-3 overflow-hidden pb-5" +
                (openMod ? " visible " : " invisible")
              }
            >
              <Row className="d-flex mt-4 gap-y-3 px-5">
                <Btn
                  xl={12}
                  xs={12}
                  md={12}
                  lg={12}
                  variant="dark"
                  onClick={() => {
                    setTitleSwitch({ in: "ورود", out: "خروج" })
                    setType(0)
                  }
                  }
                  className={
                    "border rounded-3 text-center py-2 my-2" +
                    (!type
                      ? "  text-white bg-purple-500"
                      : " text-black bg-white")
                  }
                  title="ورود و خروج به صورت عادی"
                />
                <Btn
                  xl={12}
                  xs={12}
                  md={12}
                  lg={12}
                  onClick={() => {
                    setType(1)
                    setTitleSwitch({ in: "ورود با مرخصی", out: "خروج با مرخصی" })
                  }
                  }
                  className={
                    "border rounded-3 text-center py-2 my-2" +
                    (type == 1
                      ? "  text-white bg-purple-500"
                      : " text-black bg-white")
                  }
                  title="ورود و خروج با مرخصی"
                />
                <Btn
                  xl={12}
                  xs={12}
                  md={12}
                  lg={12}
                  onClick={() => setType(2)}
                  className={
                    "border rounded-3 text-center py-2 my-2" +
                    (type == 2
                      ? "  text-white bg-purple-500"
                      : " text-black bg-white")
                  }
                  title="ورود و خروج با ماموریت"
                />
              </Row>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="secondary"
            onClick={() => {
              setOpenMod(false);
              setTitleSwitch({})
              setType(0);
            }}
            title=" لغو"
          />
          <Btn
            variant="primary"
            onClick={() => {
              setType(type);
              setOpenMod(false);
            }}
            title=" تایید"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Entry_ExitModal;
