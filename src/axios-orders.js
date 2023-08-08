import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://burger-dfdd3-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default instance;
