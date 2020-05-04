import axios from "axios";
import store from "store";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  responseType: "json",
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const token =
    store.getState().auth.user && store.getState().auth.user.accessToken;
  console.log("token now: ", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
