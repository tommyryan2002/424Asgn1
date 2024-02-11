import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { value } = useAuth();

  const queryParameters = new URLSearchParams(window.location.search);
  const google_token = queryParameters.get("token");
  if (google_token) {
  	document.cookie = `token=${google_token}`
  	value.onLogin()
  }
  if (!value.token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};