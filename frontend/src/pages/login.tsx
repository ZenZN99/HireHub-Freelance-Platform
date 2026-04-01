import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGO1 from "../images/LOGO1.jpeg";
import { login } from "../apis/user.api";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);

      if (data?.message) {
        setErrorMessage(data.message);
      } else {
        setEmail("");
        setPassword("");
        toast.success(`Welcome back ${data.user.fullname}`);
        navigate("/");
      }
    } catch {
      toast.error("Error from Server");
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-4 sm:px-6 selection:bg-[#34d399]/30 py-10">
      <Link
        to="/"
        className="flex items-center gap-3 sm:gap-4 group shrink-0 pb-8 sm:pb-10"
      >
        <img
          src={LOGO1}
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform"
        />
        <span className="text-lg sm:text-xl md:text-2xl font-black tracking-[0.3em] text-white uppercase">
          HIREHUB
        </span>
      </Link>

      <div className="max-w-[460px] w-full">
        <div className="bg-[#0f0f0f] border border-white/[0.08] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl text-white font-bold mb-2 tracking-tight">
              Login
            </h2>
            <p className="text-white/40 text-[10px] sm:text-[11px] tracking-wide font-medium">
              Welcome back to the future of freelance
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 bg-red-500/10 border border-red-500 text-red-300 text-sm px-4 py-2 rounded-xl">
              {errorMessage}
            </div>
          )}

          <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-white/30 capitalize tracking-wider mb-2 sm:mb-3 ml-1">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#121212] border border-white/[0.03] rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-5 sm:px-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/10 focus:bg-[#151515] transition-all shadow-inner"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 sm:mb-3 ml-1">
                <label className="text-[10px] sm:text-[11px] font-bold text-white/30 capitalize tracking-wider">
                  Password
                </label>

                <a
                  href="#"
                  className="text-[9px] sm:text-[10px] font-bold text-white/20 hover:text-white/40 transition tracking-tighter"
                >
                  Forgot Password?
                </a>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
                className="w-full bg-[#121212] border border-white/[0.03] rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-5 sm:px-6 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/10 focus:bg-[#151515] transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-[14px] capitalize flex items-center justify-center gap-2 mt-2 shadow-lg transition-all duration-300 hover:bg-[#34d399] hover:text-white active:scale-[0.97]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-[9px] sm:text-[10px] font-bold text-white/20 mt-8 sm:mt-10 tracking-widest capitalize">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline underline-offset-4 decoration-white/30 transition-all"
            >
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;