import Toastify from "./components2/Toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { BrowserRouter, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyProvider } from "./components/contextProvider/MyContext";
import "mapir-react-component/dist/index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <HashRouter> */}
    <MyProvider>
      <App />
      {/* <Toastify /> */}
    </MyProvider>
    {/* </HashRouter> */}
  </>
);
serviceWorkerRegistration.register();

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then((registration) => {
//         console.log(
//           "Service Worker registered with scope:",
//           registration.scope
//         );
//       })
//       .catch((error) => {
//         console.error("Service Worker registration failed:", error);
//       });
//   });
// }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator?.serviceWorker?.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}