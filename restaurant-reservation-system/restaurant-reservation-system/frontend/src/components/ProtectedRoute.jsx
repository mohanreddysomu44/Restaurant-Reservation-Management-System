import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps a route and only renders it if the user is authenticated and
// (optionally) has one of the allowed roles. Otherwise redirects.
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/customer"} replace />;
  }

  return children;
}
