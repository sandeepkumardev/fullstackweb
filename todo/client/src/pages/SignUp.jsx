import { useState } from "react";
import "../styles/auth.scss";
import { Eye, EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

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
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={form.confirmPassword}
            />
            <span>
              {showPassword ? (
                <Eye onClick={() => setShowPassword(false)} />
              ) : (
                <EyeClosed onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
