import axios from "axios";

const API = axios.create({
  baseURL: "https://event-managment-vniv.onrender.com",
});

export default API;
