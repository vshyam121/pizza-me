import axios from "axios";

const instance = axios.create({
    baseURL: "https://pizza-joint.firebaseio.com/"
});

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;