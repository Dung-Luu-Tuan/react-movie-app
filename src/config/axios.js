import axios from "axios";

const API_KEY = "1ffbb6c9f0d5b48932c257b5d05f2a8e";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

axios.interceptors.request.use((config) => {
  config.params = { ...config.params, api_key: API_KEY };
  return config;
});
