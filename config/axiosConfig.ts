import { ACCESS_TOKEN } from '@/utils/constants';
import { getCookie } from '@/utils/cookie';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import systemConfig from './systemConfig';
import { useAuth } from '@/hooks/useAuth';
import { useAccount } from '@starknet-react/core';

export const axiosHandlerNoBearer = axios.create({
  baseURL: systemConfig().PUBLIC_API,
});

export const axiosHandler = axios.create({
  baseURL: systemConfig().PUBLIC_API,
});

axiosHandler.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie(ACCESS_TOKEN);

    if (accessToken) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
    }

    if (config.data instanceof FormData) {
      Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }

    return config;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const { account } = useAccount();
      const { verifySignature } = useAuth();
      if (account) {
        await verifySignature(account);

        if (error.config) {
          const config = { ...error.config };
          const newAccessToken = getCookie(ACCESS_TOKEN);

          if (newAccessToken) {
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosHandler.request(config);
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
