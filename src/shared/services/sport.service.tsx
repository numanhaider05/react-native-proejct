import { HTTP_CLIENT } from '../utils/config';

export const getSports = (callback: any) => {
  HTTP_CLIENT
    .get('sport')
    .then(data => {
      callback(data.data);
    })
    .catch(err => console.log(err));
};
