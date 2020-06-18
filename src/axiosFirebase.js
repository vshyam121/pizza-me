import axios from "axios";

/* Axios instance used to call firebase api */
const instance = axios.create({
    baseURL: "https://pizza-joint.firebaseio.com/"
});

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;