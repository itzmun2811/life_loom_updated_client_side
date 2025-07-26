import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useRole from '../../hooks/useRole';


const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) return <p className="text-center my-10">Loading...</p>;

  if (user && role === 'admin') return children;

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AdminRoute;
