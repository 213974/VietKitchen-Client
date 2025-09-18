import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Updated import path

const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return null; 
  }

  return session ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;