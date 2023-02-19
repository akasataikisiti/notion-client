import axios from 'axios';

const BASE_URL = "http://localhost:6001/api/v1/"

const axiosClient = axios.create({
  baseURL: BASE_URL,

});

export default axiosClient;
