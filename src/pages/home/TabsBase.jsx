import React, { useState } from "react";
import { Tabs, Tab, Col, Row } from "react-bootstrap";
import RecordDevice from "./contant/RecordDevice";
import MapLocation from "./contant/MapLocation";
import MainTitle from "../../components2/MainTitle";

const TabsBase = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  return (
    <>
      {/*<Col className="" xs="12">
        <Tabs className="" defaultActiveKey={2} id="uncontrolled-tab-example">
           <Tab
            tabClassName=" ms-1 ms-md-5 text-dark"
            eventKey={1}
            title="موقعیت مکانی"
          >
            <Row className="justify-content-center m-4">
              {!!location?.latitude && <MapLocation location={location} />}
            </Row>
          </Tab> 
          <Tab eventKey={2} title="ثبت" tabClassName=" ms-1 ms-md-5 text-dark">

          </Tab>
        </Tabs>
      </Col>*/}
      <MainTitle label="ثبت ورود و خروج" />

      <RecordDevice location={location} setLocation={setLocation} />
    </>
  );
};

export default TabsBase;
