import withAuth from "../components/withAuth";
import { useApp } from "../hooks/useApp";
import { useAuth } from "../hooks/useAuth";
import "../styles/profile.scss";

const Profile = () => {
  const { user, logout } = useAuth();
  const { setToast } = useApp();

  return (
    <div className="profile">
      <h1>Welcome, {user.name}!</h1>
      <p>{user.email}</p>

      <button
        onClick={() => {
          setToast({ type: "success", message: "Logged out successfully!" });
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default withAuth(Profile);
