import { Route, Navigate } from "react-router-dom";

export default function ProtectedRoute({ Component, ...props }) {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return isAuthenticated() ? <Component {...props} /> : <Navigate to="/" />;
}
