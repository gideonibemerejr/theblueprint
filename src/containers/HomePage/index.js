import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const HomePage = () => {
  const auth = useAuth();

  return auth.isAdmin ? <Navigate to='/admin' /> : <Navigate to='/profile' />;
};

export default HomePage;
