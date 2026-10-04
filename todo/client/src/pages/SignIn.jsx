import { useEffect, useState } from "react";
import "../styles/auth.scss";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useApp";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToast } = useApp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email.length === 0 || form.password.length === 0) {
      setToast({ type: "error", message: "Please enter your email and password!" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error signing in:", data.message);
        setToast({ type: "error", message: data.message });
        return;
      }

      setToast({ type: "success", message: "Logged in successfully!" });
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      setToast({ type: "error", message: "Error signing in!" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Credentials!</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Email" onChange={handleChange} value={form.email} />
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
            <span>
              {showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeClosed onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1 }}
          >
            {loading ? "loading..." : "Sign In"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
