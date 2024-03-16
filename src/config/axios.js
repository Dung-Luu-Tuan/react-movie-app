import axios from "axios";

const API_KEY = "1ffbb6c9f0d5b48932c257b5d05f2a8e";
const BASE_URL = "https://api.themoviedb.org/3"
const GET_VIDEO_URL = "https://phimapi.com";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  if (config.baseURL === BASE_URL) {
    config.params = { ...config.params, api_key: API_KEY };
  }
  return config;
});

export const getVideo = (endpoint, params = {}) => {
  return axios.get(endpoint, { baseURL: GET_VIDEO_URL, params });
};
