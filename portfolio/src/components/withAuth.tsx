import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export const withAuth = (Component: React.FC) => {
  return () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
      if (!token) {
        navigate("/signin");
      }
    }, [token]);

    if (!token) return null;

    return <Component />;
  };
};
