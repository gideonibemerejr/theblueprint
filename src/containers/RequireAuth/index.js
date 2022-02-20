import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user && !auth.loading) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
