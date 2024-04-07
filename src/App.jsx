import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/Setting";
import About from "./pages/About";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Request from "./pages/Request";
import Leave from "./pages/Leave";
import Mission from "./pages/Mission";
import Shift from "./pages/Shift";
import PrivateRoute1 from "./components/PrivateRoute1/PrivateRoute1";
import LeaveEdit from "./pages/LeaveEdit";
import MainPrivateRoute from "./components/MainPrivateRoute/MainPrivateRoute";
import MissionEdit from "./pages/MissionEdit";
import InstallPrompt from "./InstallPrompt";
import React, { useState, useEffect } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import PrivateLayout from "./layout/PrivateLayout";
import "./services/axios";
import GeneralLayout from "./layout/GeneralLayout";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/user/*"
            element={
              <PrivateLayout>
                <PrivateRoute />
              </PrivateLayout>
            }
          />

          <Route
            path="/"
            element={
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;