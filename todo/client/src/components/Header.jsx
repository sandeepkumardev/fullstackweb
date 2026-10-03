import { UserCircle2 } from "lucide-react";
import "../styles/header.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="header">
      <Link to="/">
        <h1>Todo</h1>
      </Link>

      <div className="auth">
        <Link to={user ? "/profile" : "/signin"}>
          <UserCircle2 />
        </Link>
      </div>
    </div>
  );
};

export default Header;
