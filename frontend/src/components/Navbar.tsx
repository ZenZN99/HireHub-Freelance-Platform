import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LOGO1 from "../images/LOGO1.jpeg";
import { LuArrowUpRight, LuBell } from "react-icons/lu";
import { useAuthStore } from "../stores/useAuthStore";

const Navbar: React.FC = () => {
  const { user, loadUser, logout } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);
  const navigate = useNavigate();

  const navLinksByRole = {
    CLIENT: [
      { title: "Home", link: "/" },
      { title: "Projects", link: "/projects" },
      { title: "My Jobs", link: "/my-jobs" },
      { title: "Messages", link: "/messages" },
    ],

    FREELANCER: [
      { title: "Home", link: "/" },
      { title: "Browse Jobs", link: "/jobs" },
      { title: "My Proposals", link: "/proposals" },
      { title: "Earnings", link: "/earnings" },
    ],

    ADMIN: [
      { title: "Dashboard", link: "/admin" },
      { title: "Users", link: "/admin/users" },
    ],
  };

  const navLinks = user?.role
    ? navLinksByRole[user.role.toUpperCase() as keyof typeof navLinksByRole]
    : [];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/5 backdrop-blur-md bg-[#0A0A0A]/80 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group shrink-0">
          <img
            src={LOGO1}
            alt="Logo"
            className="w-10 h-10 object-contain transition-transform "
          />
          <span className="text-xl md:text-2xl font-black tracking-[0.3em] text-white">
            HIREHUB
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.2em] text-white/40">
          {navLinks && navLinks.map((nav) => (
            <Link
              key={nav.link}
              className="hover:text-white transition-all duration-300"
              to={nav.link}
            >
              {nav.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-5">
              {/*  Notifications */}
              <Link to="/notifications" className="relative group">
                <LuBell className="text-white/70 text-xl hover:text-white transition" />

                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[red] rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[red] rounded-full" />
              </Link>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2 border-[#34d399] object-cover transition-all duration-300 hover:scale-125"
                  />
                </Link>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[white] hover:bg-[#34d399] text-black rounded-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                LOG_IN
              </Link>
              <Link
                to="/signup"
                className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black flex items-center gap-2 uppercase tracking-[0.1em] hover:bg-[#34d399] hover:text-white transition-all duration-300"
              >
                Start Your Project <LuArrowUpRight size={14} strokeWidth={3} />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
