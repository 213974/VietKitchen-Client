import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('adminToken');

  // If a token exists, render the child routes (via Outlet).
  // Otherwise, navigate to the login page.
  return token ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;