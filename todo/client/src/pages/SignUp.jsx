import { useEffect, useState } from "react";
import "../styles/auth.scss";
import { Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error signing in:", data.message);
        return;
      }

      navigate("/signin");
    } catch (error) {
      console.error("Error signing in:", error);
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
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} value={form.name} />
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
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={form.confirm_password}
            />
            <span>
              {showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeClosed onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "loading..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
