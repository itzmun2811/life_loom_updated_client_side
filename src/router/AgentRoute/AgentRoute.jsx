import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../hooks/useRole";
import { Navigate, useLocation } from "react-router";


const AgentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, loading: roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) return <p className="text-center my-10">Loading...</p>;

  if (user && role === 'agent') return children;

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default AgentRoute;
