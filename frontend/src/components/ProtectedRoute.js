import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthUserContext from "../contexts/AuthUserContext";

function ProtectedRoute() {
  const { loggedIn } = React.useContext(AuthUserContext);

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
