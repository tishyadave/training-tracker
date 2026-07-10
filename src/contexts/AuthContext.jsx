import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as api from '@/mocks/mockApi';

const SESSION_TOKEN_KEY = 'tt_session_token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session from sessionStorage on first load — auth token only,
  // never business data.
  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    api
      .getMe(token)
      .then((me) => setUser(me))
      .catch(() => sessionStorage.removeItem(SESSION_TOKEN_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const { token, user: loggedInUser } = await api.login({ email, password });
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message || 'Unable to sign in');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
