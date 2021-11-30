import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance | null = null;

export const useAxios = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;

  axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    params: {
      apikey: `${import.meta.env.VITE_API_PUBLIC_KEY}`,
    },
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

  return axiosInstance;
};
