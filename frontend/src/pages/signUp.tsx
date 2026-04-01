import React, { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuArrowUpRight,
  LuUser,
  LuMail,
  LuLock,
  LuUsers,
} from "react-icons/lu";
import LOGO1 from "../images/LOGO1.jpeg";
import { signup } from "../apis/user.api";
import toast from "react-hot-toast";
import { UserRoles } from "../types/user";

const SignUp: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const roles = Object.values(UserRoles);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await signup(fullname, email, password, role);

      if (data?.message) {
        setErrorMessage(data.message);
      } else {
        toast.success(`Welcome ${data.user.fullname}`);

        setFullname("");
        setEmail("");
        setPassword("");
        setRole("");

        navigate("/");
      }
    } catch {
      toast.error("Error From Server, Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-4 sm:px-6 py-10">
      <Link to="/" className="flex items-center gap-3 pb-8 sm:pb-10">
        <img src={LOGO1} className="w-9 h-9 object-contain" alt="Logo" />
        <span className="text-white font-black tracking-[0.3em] text-xl">
          HIREHUB
        </span>
      </Link>

      <div className="w-full max-w-[460px]">
        <div className="bg-[#0f0f0f] border border-white/[0.08] rounded-[2.5rem] p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Sign Up</h2>
            <p className="text-white/40 text-xs mt-2">
              Create your account to join HireHub
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 bg-red-500/10 border border-red-500 text-red-300 text-sm px-4 py-2 rounded-xl">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full bg-[#121212] border border-white/[0.03] rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/10"
              />
              <LuUser className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121212] border border-white/[0.03] rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/10"
              />
              <LuMail className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121212] border border-white/[0.03] rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/10"
              />
              <LuLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
            </div>

            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full bg-[#121212] border border-white/[0.03] rounded-2xl py-4 px-5 appearance-none focus:outline-none focus:border-white/10 text-sm ${
                  role ? "text-white" : "text-white/30"
                }`}
              >
                <option value="" disabled>
                  Select Role
                </option>

                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                <LuUsers />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#34d399] hover:text-white transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
              <LuArrowUpRight />
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;