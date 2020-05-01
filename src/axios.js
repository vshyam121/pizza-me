import axios from "axios";

const instance = axios.create({
    baseURL: "https://pizza-joint.firebaseio.com/"
});

export default instance;