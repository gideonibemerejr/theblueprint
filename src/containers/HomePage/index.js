import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import AdminDashboard from '../AdminDashboard';

const HomePage = () => {
  const auth = useAuth();

  if (auth?.user?.email && !auth?.user?.firstName) {
    return <Navigate to='/complete-registration' />;
  }
  return auth.isAdmin ? <Navigate to='/admin' /> : <div>Logging in Normmy</div>;
};

export default HomePage;
