import axios from "axios";
import * as config from "./config";

const { serverBaseURL, api } = config.default;

const axiosInstance = axios.create({
  baseURL: `${serverBaseURL}/api/v1`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token && config.headers) {
    config.headers["authorization"] = token;
  }
  return config;
});

// if access token expired then make request to refresh it

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response?.status == 403) {
      // generate a request for refresh token

      const token = sessionStorage.getItem("rToken");
      axiosInstance
        .post(api.auth.refreshToken, { refreshT: token })
        .then((response) => {
          const { access, refresh } = response?.data.data;
          sessionStorage.setItem("token", access);
          sessionStorage.setItem("rToken", refresh);
        })
        .catch((err) => {
          sessionStorage.clear();
        });
    } else if (err?.response?.status == 440) {
      sessionStorage.clear();
      return Promise.reject(err);
    } else {
      return Promise.reject(err);
    }
  }
);

export default axiosInstance;
