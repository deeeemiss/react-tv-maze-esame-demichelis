import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children }: any) => {
  const [user, loading, error] = useAuthState(auth);

  if (!user && loading) {
    return <div className="loading">Loading...</div>;
  }
  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
