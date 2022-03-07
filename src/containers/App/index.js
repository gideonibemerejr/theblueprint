import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, RequireAuth } from '..';
import { AuthProvider } from '../../utils/auth';
import { Layout } from '../../components';
import AdminDashboard from '../AdminDashboard';
import EventsPage from '../AdminDashboard/EventsPage';
import SpreadSheetsPage from '../AdminDashboard/SpreadSheetsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth redirectTo='/login'>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegistrationPage />} />

            <Route
              path='admin'
              element={
                <RequireAuth redirectTo='/login'>
                  <AdminDashboard />
                </RequireAuth>
              }
            >
              <Route path='events' element={<EventsPage />} />
              <Route path='spreadsheets' element={<SpreadSheetsPage />} />
              <Route index element={<EventsPage />} />
            </Route>
            <Route
              path='profile'
              element={
                <RequireAuth redirectTo='/login'>
                  <div>gideon</div>
                </RequireAuth>
              }
            >
              <Route index element={<SpreadSheetsPage />} />
              <Route path='spreadsheets' element={<SpreadSheetsPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
      <ToastContainer position='top-left' newestOnTop limit={5} />
    </AuthProvider>
  );
}

export default App;
