import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-black p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-white">Create Account</h1>

        <p className="mt-2 text-center text-gray-400">Join us today</p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Full Name</label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-400"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm text-gray-300">Confirm Password</label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-cyan-400"
            />
          </div>

          <button className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-cyan-400 hover:text-cyan-300">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
