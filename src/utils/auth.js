import React, { createContext, useContext } from 'react';
import { useProvideAuth } from '../hooks';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
