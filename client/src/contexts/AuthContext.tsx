import { AxiosResponse } from 'axios';
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { LoginParams, login as loginAxios, getBookToken } from '../api/auth';

export type AuthContextType = {
  isLoggedIn: boolean;
  presistedBookToken?: string;
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
export const PERSISTED_BOOK_TOKEN = 'presistedBookToken';

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN) || undefined);
  const [presistedBookToken, setPresistedBookToken] = useState<
    AuthContextType['presistedBookToken']
  >(() => localStorage.getItem(PERSISTED_BOOK_TOKEN) || undefined);

  const saveToken = useCallback((token: string) => {
    setToken(token);
    localStorage.setItem(TOKEN, token);
  }, []);

  const removeToken = useCallback(() => {
    setToken(undefined);
    localStorage.removeItem(TOKEN);
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

  useEffect(() => {
    if (token) {
      getBookToken()
        .then(res => {
          setPresistedBookToken(res.data.bookToken);
          localStorage.setItem(PERSISTED_BOOK_TOKEN, res.data.bookToken);
        })
        .catch(err => console.log(err));
    } else {
      setPresistedBookToken(undefined);
      localStorage.removeItem(PERSISTED_BOOK_TOKEN);
    }
  }, [token]);

  const logout: AuthContextType['logout'] = useCallback(() => removeToken(), [removeToken]);

  const contextValues: AuthContextType = useMemo(
    () => ({
      login,
      isLoggedIn: !!token,
      logout,
      presistedBookToken,
    }),
    [login, token, logout, presistedBookToken]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};
