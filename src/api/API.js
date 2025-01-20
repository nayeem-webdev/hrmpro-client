import axios from "axios";

export const API = axios.create({
  baseURL: "https://b10-a12-md-nayeem-uddin-server.vercel.app",
  // baseURL: "http://localhost:5000",
});
