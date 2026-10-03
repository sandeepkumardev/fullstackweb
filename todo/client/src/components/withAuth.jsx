import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { user, userLoading, setUser, setUserLoading } = useAuth();

    const getUser = async (token) => {
      setUserLoading(true);
      try {
        const response = await fetch("http://localhost:8000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!data.success) {
          console.error("Error fetching user:", data.message);
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setUserLoading(false);
      }
    };

    useEffect(() => {
      const token = localStorage.getItem("token") || null;

      if (token && !user) {
        getUser(token);
        return;
      } else if (!token) {
        navigate("/signin");
      }
    }, [user, userLoading]);

    if (userLoading) return <div className="user-loading">Loading...</div>;

    if (!user && !userLoading) return null;

    return <Component {...props} />;
  };
};

export default withAuth;
