import axios from "axios";
// import { store } from "../common/store/store";

// axios.defaults.baseURL = 'http://2.186.229.181:3322/api'

axios.interceptors.request.use(
  function (config) {
    console.log(config);
    if (!!localStorage.getItem("tokenId")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "tokenId"
      )}`;
    }
    config.headers.post = {
      "Content-Type": "application/json",
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  async function (response) {
    console.log(response);
    return response;
  },
  function (error) {
    if (
      !!!error?.config?.headers?.Authorization ||
      error?.config?.headers?.Authorization === "Bearer null"
    ) {
      setTimeout(() => {
        localStorage.clear();
        window.location = "/login";
      }, 5000);
    }
    try {
      const expectedErrors =
        error.response &&
        error.response.status !== 401 &&
        error.response.status >= 400 &&
        error.response.status < 500;
    } catch (error) {
      console.log(error);
      const { message } = error;
      return Promise.reject(message);
    }
  }
);
