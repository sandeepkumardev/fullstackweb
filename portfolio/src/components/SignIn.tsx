import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
    setToken("dummy-token");
    navigate("/");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-black p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-white">Welcome Back</h1>

        <p className="mt-2 text-center text-gray-400">Sign in to continue</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-400"
            />
          </div>

          <button className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-cyan-400 hover:text-cyan-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
