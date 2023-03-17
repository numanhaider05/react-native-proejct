import { HTTP_CLIENT } from '../utils/config';

export const signUp = (params: any) => {
  return HTTP_CLIENT.post('auth/signup', params);
};

export const signIn = (params: any) => {
  return HTTP_CLIENT.post('auth/login/', params);
};

export const forgetPassword = (params: any) => {
  return HTTP_CLIENT.post('/auth/forgot-password', params);
};

export const changePassword = (params: any) => {
  return HTTP_CLIENT.put('/auth/change-password', params);
};

export const helpQuestion = (params: any) => {
  return HTTP_CLIENT.post('/help/question', params);
};

export const resetPassword = (params: any) => {
  return HTTP_CLIENT.put('/auth/reset-password', params);
};

export const verify = (params: any) => {
  return HTTP_CLIENT.put('auth/verify/', params);
};

export const upload = (params: any) => {
  const headers = {
    'Authorization': 'nxtgemapp'
  }
  return HTTP_CLIENT.post('file/guest', params, { headers: headers });
};

