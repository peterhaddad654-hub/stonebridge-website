import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { isAuthenticated, login as doLogin, logout as doLogout, refreshToken } from '@/lib/data';

interface AuthContextType {
  isAuth: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => isAuthenticated());

  useEffect(() => {
    const check = () => setIsAuth(isAuthenticated());
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const success = doLogin(username, password);
    if (success) setIsAuth(true);
    return success;
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setIsAuth(false);
  }, []);

  // Refresh token on navigation
  useEffect(() => {
    if (isAuth) refreshToken();
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
