import { useContext, useEffect } from "react";
import { userContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { user, userLoading } = useContext(userContext);

    useEffect(() => {
      if (!user && !userLoading) {
        navigate("/signin");
      }
    }, [user, userLoading]);

    if (userLoading) return <div className="user-loading">Loading...</div>;

    if (!user && !userLoading) return null;

    return <Component {...props} />;
  };
};

export default withAuth;
