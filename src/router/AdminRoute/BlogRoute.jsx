import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useRole from '../../hooks/useRole';


const BlogRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) return <p className="text-center my-10">Loading...</p>;

if (user && (role === 'admin' || role === 'agent')) return children;

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default BlogRoute;
