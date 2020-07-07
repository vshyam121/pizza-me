import axios from 'axios';

/* Axios instance used to call firebase api */
const instance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_URL,
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
