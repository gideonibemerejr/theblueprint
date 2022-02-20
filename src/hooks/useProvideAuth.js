import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import httpClient from '../utils/httpClient';

function useProvideAuth() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        httpClient.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await httpClient.get('/users/me');
        if (user) {
          setUser(user);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async ({ identifier, password }, callback) => {
    try {
      const res = await httpClient.post('/auth/local', {
        identifier,
        password,
      });
      console.log('the response', res);
      if (res && res.statusText === 'OK') {
        const {
          data: { jwt, user },
        } = res;

        Cookies.set('token', jwt, { expires: 60 });
        httpClient.defaults.headers.Authorization = `Bearer ${jwt}`;

        setUser(user);
        callback();
      } else {
        console.log(res?.error?.message);
        setError(res?.error?.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error);
    }
  };

  const logout = ({ identifier, password }, callback) => {
    Cookies.remove('token');
    setUser(null);
    delete httpClient.defaults.headers.Authorization;
    callback();
  };

  return {
    user,
    isAdmin: user?.email.includes('@whenwherewhat.com'),
    login,
    logout,
    error,
    loading,
  };
}

export default useProvideAuth;
