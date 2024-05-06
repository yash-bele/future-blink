import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((store) => store.app);
  const lsToken = localStorage.getItem("token");

  return token || lsToken ? children : <Navigate to="/" replace />;
}
