import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-bulder-c4f87.firebaseio.com/",
});

export default instance;
