import axios from "axios";

// Create client.
const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export default client;
