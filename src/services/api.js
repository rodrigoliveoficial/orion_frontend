import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:8080"  // Ambiente de teste
  baseURL: "http://172.16.57.143:8080"  // Ambiente de teste
});

export default api;