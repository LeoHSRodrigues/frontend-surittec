import axios from 'axios';
import { authenticationService } from '../services/auth.service';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const APIconfig = axios.create({
  baseURL: BASE_URL,
});

APIconfig.interceptors.request.use(config => {
  const token = authenticationService.currentUserValue();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token;
  }
  return config;
});

export default APIconfig;