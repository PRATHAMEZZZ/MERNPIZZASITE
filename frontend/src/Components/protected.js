import React from "react";
import { Navigate} from "react-router-dom";

function ProtectedRoute({ Component}) {
  const isAuthenticated = localStorage.getItem("user");
  return (
      isAuthenticated ? <Component/> : <Navigate to={'/login'}/>
  );
}

export default ProtectedRoute;