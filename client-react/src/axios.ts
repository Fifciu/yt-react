import { Axios } from "axios";

export const ytAxios = new Axios({
  baseURL: 'https://www.googleapis.com/youtube/'
});

export const proxyAxios = new Axios({
  baseURL: import.meta.env.VITE_PROXY_URL
});