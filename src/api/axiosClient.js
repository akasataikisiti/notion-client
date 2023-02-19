import axios from 'axios';

const BASE_URL = "http://localhost:6001/api/v1/"

const axiosClient = axios.create({
  baseURL: BASE_URL,
});
const getToken = () => localStorage.getItem("token")

//APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  return {
    config,
    header: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,   //リクエストヘッダにJWTを付けてサーバに渡す
    }
  }
})

export default axiosClient;
