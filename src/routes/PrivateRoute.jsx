import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Report from "../pages/Report";
import About from "../pages/About";
import Setting from "../pages/Setting";
import Shift from "../pages/Shift";
import Leave from "../pages/Leave";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/about" element={<About />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/shift" element={<Shift />} />
      <Route path="/leave" element={<Leave />} />
    </Routes>
  );
};

export default PrivateRoute;
