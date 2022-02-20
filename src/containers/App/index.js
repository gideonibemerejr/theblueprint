import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, RequireAuth } from '..';
import { AuthProvider } from '../../utils/auth';
import { Layout } from '../../components';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/public' element={<div>public</div>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegistrationPage />} />
            <Route
              path='/'
              element={
                <RequireAuth redirectTo='/login'>
                  <HomePage />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
