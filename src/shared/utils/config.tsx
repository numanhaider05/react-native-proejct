import axios, { AxiosInstance } from 'axios';
import { DeviceEventEmitter } from 'react-native';
import { Store } from 'redux';
import { store } from '../store/store';
import { CONSTANTS } from './constants';

export const HTTP_CLIENT: AxiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

HTTP_CLIENT.interceptors.request.use((config) => {
  const { user }: any = store.getState().root.user;
  if (user && user.accessToken) {
    config.headers.authorization = `${user.accessToken}`;
  }
  return config;
}, err => {
  return Promise.reject(err)
});

HTTP_CLIENT.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.data?.meta?.status == 401)
    DeviceEventEmitter.emit('logout');
  return Promise.reject(error);

})
