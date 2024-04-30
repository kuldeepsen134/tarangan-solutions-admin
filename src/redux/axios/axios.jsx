/* eslint-disable no-undef */
import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: `http://localhost:4500/api`,
  withCredentials: true,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    toast.error(error?.response?.data.message);

    // if (error?.response?.status === 401) {
    //   window.location.href = "/users"
    // }
    return Promise.reject(error);
  }
);

export default instance;
