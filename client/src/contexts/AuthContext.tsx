import { AxiosResponse } from 'axios';
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { LoginParams, login as loginAxios } from '../api/auth';

export type AuthContextType = {
  isLoggedIn: boolean;
  logout: () => void;
  login: (params: LoginParams, { onSuccess, onError, onFinally }: LoginOptions) => void;
};

export type LoginOptions = {
  onSuccess?: (res: AxiosResponse<{ token?: string }>) => void;
  onError?: (err: any) => void;
  onFinally?: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const TOKEN = 'token';

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN) || undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem(TOKEN));

  const saveToken = useCallback((token: string) => {
    setToken(token);
    localStorage.setItem(TOKEN, token);
    setIsLoggedIn(true);
  }, []);

  const removeToken = useCallback(() => {
    setToken(undefined);
    localStorage.removeItem(TOKEN);
    setIsLoggedIn(false);
  }, []);

  const login: AuthContextType['login'] = useCallback(
    (params, { onError, onFinally, onSuccess }) => {
      loginAxios(params)
        .then(res => {
          saveToken(res.data.token as string);
          onSuccess?.(res);
        })
        .catch(err => {
          onError?.(err);
        })
        .finally(() => onFinally?.());
    },
    [saveToken]
  );

  const logout: AuthContextType['logout'] = useCallback(() => removeToken(), [removeToken]);

  const contextValues: AuthContextType = useMemo(
    () => ({
      login,
      isLoggedIn,
      logout,
    }),
    [login, isLoggedIn, logout]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};
