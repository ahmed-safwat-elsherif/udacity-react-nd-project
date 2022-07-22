import axiosBase, { AxiosResponse } from 'axios';
import { TOKEN } from '../contexts/AuthContext';
import { User } from '../models/user.model';
import { Endpoints } from './config';

export const UserBaseUrl = 'http://localhost:3001';
const axios = axiosBase.create({
  baseURL: UserBaseUrl,
});

export type CreateAccountParams = {
  username: string;
  password: string;
};

export const createAccount = ({ username, password }: CreateAccountParams) =>
  axios.post<CreateAccountParams, AxiosResponse<{ user?: string; message?: string }>>(
    Endpoints.User.CreateAccount,
    {
      username,
      password,
    }
  );

export type LoginParams = CreateAccountParams;

export const login = ({ username, password }: CreateAccountParams) =>
  axios.post<LoginParams, AxiosResponse<{ token?: string }>>(Endpoints.User.Login, {
    username,
    password,
  });

export const getUserInfo = () =>
  axios.get<any, AxiosResponse<{ user: User }>>(Endpoints.User.UserInfo, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem(TOKEN) as string,
    },
  });

export const getBookToken = () =>
  axios.get<any, AxiosResponse<{ bookToken: string }>>(Endpoints.User.BookToken, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem(TOKEN) as string,
    },
  });
