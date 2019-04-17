import Axios from "axios";

// 设置统一的前置url路径
// Axios.defaults.baseURL = "https://dev.apis.ittim.ltd/nWGq7NqEf";
Axios.defaults.baseURL = "http://localhost:8080/json";

// 设置允许跨域
Axios.defaults.withCredentials = true;

export default Axios;