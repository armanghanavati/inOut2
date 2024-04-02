import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Setting from "./pages/Setting";
import About from "./pages/About";
// import Reportdetailed from "./pages/Reportdetailed";
// import Reportsummary from "./pages/Reportsummary";
// import Reporteddetailed from "./pages/Reporteddetailed";
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
// import InstallPrompt from './InstallPrompt';

function App() {
  // const queryClient = new QueryClient()
  // const [installPromptEvent, setInstallPromptEvent] = useState(null);

  // useEffect(() => {
  //   const handleBeforeInstallPrompt = (event) => {
  //     event.preventDefault();
  //     setInstallPromptEvent(event);
  //     showInstallPrompt();
  //   };

  //   window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

  //   return () => {
  //     window.removeEventListener(
  //       "beforeinstallprompt",
  //       handleBeforeInstallPrompt
  //     );
  //   };
  // }, []);

  // const showInstallPrompt = () => {
  //   if (installPromptEvent) {
  //     installPromptEvent.prompt();
  //     installPromptEvent.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === "accepted") {
  //         console.log("User accepted the install prompt");
  //       } else {
  //         console.log("User dismissed the install prompt");
  //       }
  //     });
  //   }
  // };

  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
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
          {/*<Route path='/request' element={<PrivateRoute1><Request /></PrivateRoute1>}></Route>
          <Route path='/leaveedit/:leaveId' element={<PrivateRoute1><LeaveEdit /></PrivateRoute1>}></Route>
          <Route path='/mission' element={<PrivateRoute1><Mission /></PrivateRoute1>}></Route>
          <Route path='/missionedit/:missionId' element={<PrivateRoute1><MissionEdit /></PrivateRoute1>}></Route>
          <Route path='/summary' element={<PrivateRoute1><Reportsummary /></PrivateRoute1>}></Route>
          <Route path='/detailed' element={<PrivateRoute1><Reportdetailed /></PrivateRoute1>}></Route>
          <Route path='/detailedd' element={<PrivateRoute1><Reporteddetailed /></PrivateRoute1>}></Route> */}
        </Routes>
      </Router>
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;

// import PrivateRoutes from "./routes/PrivateRoutes";
// import GeneralRoutes from "./routes/GeneralRoutes";
// import "./services/axios";
// import Layout from "./layouts/Layout";
// import PrivateLayout from "./layouts/PrivateLayout";
// import ChangeProfile from "./components/changeProfile/ChangeProfile";
// import BatchEntryPage from "./pages/batchEntry/BatchEntryPage";
// import Loading from "./common/Loading";
// import { useAppSelector } from "./hooks/hook";
// import LogInForm from "./pages/logIn";
// import SignUp from "./pages/signUp";

//   return (
//     <>
//       <Loading isLoading={main?.showLoading?.value ? true : false} />
//       <Router>
//         <Layout>
//           <Routes>
//             <Route
//               path="/users/*"
//               element={
//                 <PrivateLayout>
//                   <PrivateRoutes />
//                 </PrivateLayout>
//               }
//             />
//             <Route path="/*" element={<GeneralRoutes />} />
//             <Route path="/logIn" element={<LogInForm />} />
//             <Route path="/signUp" element={<SignUp />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </>
//   );
// }
