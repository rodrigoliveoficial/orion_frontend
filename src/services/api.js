import axios from "axios";

const api = axios.create({
  baseURL: "http://172.16.57.143:8080"  // Ambiente de teste
  //baseURL: "http://172.16.57.143:8081"  // Ambiente de produção
});

export default api;