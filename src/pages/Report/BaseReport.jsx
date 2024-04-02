import React from "react";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import Report from "./Report";
import MainTitle from "../../components2/MainTitle";

const BaseReport = () => {
  return (
    <>
      <MainTitle label="گزارش" />
      <div className="mt-4">
        <Tabs className="" defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab
            tabClassName=" ms-1 ms-md-5 text-dark"
            eventKey={1}
            title="ماهانه"
          >
            <Report />
          </Tab>
          <Tab
            eventKey={2}
            title="سفارشی"
            tabClassName=" ms-1 ms-md-5 text-dark"
          ></Tab>
        </Tabs>
      </div>
    </>
  );
};

export default BaseReport;
