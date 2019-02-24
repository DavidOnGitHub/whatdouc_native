import axios from 'axios';
import converter from './converter';
import { store } from '../App';

const endpoint = 'http://localhost:4000/rest';

axios.interceptors.request.use(conf => {
  const updatedConfig = { ...conf };
  const token = store.getState().auth.token;
  if (token) {
    updatedConfig.headers.Authorization = `Bearer ${token}`;
  }
  return updatedConfig;
});

const api = {
  login: payload => axios.post(`${endpoint}/auth/login`, payload),
  // facebookLogin: payload => axios.post(`${endpoint}/auth/facebook-login`, payload),
  register: payload => axios.post(`${endpoint}/auth/register`, payload),
  setPassword: payload => axios.post(`${endpoint}/auth/set-password`, payload),
  activate: payload => axios.post(`${endpoint}/auth/activate`, payload),
  // setPassword: payload => axios.post(`${endpoint}/auth/set-password`, payload),
  // suggestNickname: payload => axios.post(`${endpoint}/auth/suggest-nickname`, payload),
  // updateUser: payload => axios.put(`${endpoint}/secure/user`, payload),
  uploadDocuments: payload =>
    axios.post(`${endpoint}/secure/document/upload`, payload)
};

Object.keys(api).forEach(key => {
  const apiFunc = api[key];
  api[key] = payload =>
    Promise.race([
      apiFunc(payload),
      new Promise((resolve, reject) =>
        setTimeout(() => reject('timeout'), 30000)
      )
    ]).then(response => response.data);

  if (converter[key]) {
    const apiFunc = api[key];
    if (converter[key].fromApi) {
      api[key] = args =>
        apiFunc(args).then(response => converter[key].fromApi(response));
      if (converter[key].toApi) {
        api[key] = payload =>
          apiFunc(converter[key].toApi(payload)).then(response =>
            converter[key].fromApi(response)
          );
      }
    } else if (converter[key].toApi) {
      api[key] = payload => apiFunc(converter[key].toApi(payload));
    }
  }
});

export default api;
