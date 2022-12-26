import axios from "axios";

export default axios.create({
  baseURL: "http://54.255.221.112:3500/",
  headers: {
    "Content-type": "application/json",
  },
});
