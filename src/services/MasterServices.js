import axios from "axios";

// const baseURL = import.meta.env.VITE_URL;
const baseURL = "https://www.auto.fanwebco.com/InOut_api/";

// login
export const accountLogin = (postData) => {
  return axios.post(`${baseURL}api/Account/Login`, postData);
};

// users list
export const getAllUsers = () => {
  return axios.get(`${baseURL}api/Account/GetAllUsers`);
};

export const getWeatherMap = () => {
  const urlMap = `https://api.openweathermap.org/data/2.5/onecell?`;
  return axios.get(urlMap);
};

// users role
export const getUserRole = () => {
  return axios.post(`${baseURL}api/Account/UserDetailsToken`, null);
};

// All User Leaves Requeset
export const allUserLeavesRequeset = () => {
  return axios.post(`${baseURL}api/LeaveManagementController/AllUserLeavesRequeset`);
};

// users Summary Report Monthly
export const usersSummaryReportMonthly = (postData) => {
  return axios.post(`${baseURL}api/ReportController/UsersSummaryReportMonthly`, postData);
};

// users Summary Report Monthly
export const createAttendancy = (postData) => {
  return axios.post(`${baseURL}api/AttendanceController/CreateAttendancy`, postData);
};