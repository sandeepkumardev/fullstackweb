import { UserCircle2 } from "lucide-react";
import "../styles/header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <h1>Todo</h1>
      </Link>

      <div className="auth">
        <Link to="/signin">
          <UserCircle2 />
        </Link>
      </div>
    </div>
  );
};

export default Header;
