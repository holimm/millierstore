import axios from "axios";

const axiosMongo = axios.create({
  baseURL: process.env.MONGO_BE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosMongo;
