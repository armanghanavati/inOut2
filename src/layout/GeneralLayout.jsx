import React, { useState } from "react";
import Header from "./Header";
import MyNavabar from "../components/MyNavabar/MyNavabar";

const GeneralLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header />
      {/* <MyNavabar open={open} setOpen={setOpen} title='ثبت ورود و خروج' /> */}
      {children}
    </>
  );
};

export default GeneralLayout;
