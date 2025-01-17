import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const isAuthenticated: boolean = localStorage.getItem("session") !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to={"/login"} />;
}
