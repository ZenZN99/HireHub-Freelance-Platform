import { FaStar } from "react-icons/fa";
import { FiPlus, FiSearch } from "react-icons/fi";
import type { IUser } from "../../../types/user";
import type { IFreelancer } from "../../../types/freelancer-profile";

interface HeaderProps {
  user: IUser | null;
  freelancerProfile: IFreelancer | null;
}

const Header = ({ user, freelancerProfile }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center">
          <img
            src={user?.avatar}
            alt=""
            className="rounded-2xl border-2 border-emerald-400"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/10 text-emerald-400 text-[8px] font-black px-2 py-0.5 rounded-sm uppercase flex items-center gap-1">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>{" "}
              AVAILABLE
            </span>
            <span className="flex items-center gap-2 bg-amber-400/10 text-amber-400 text-[8px] font-black px-2 py-0.5 rounded-sm uppercase">
              {freelancerProfile?.rating} <FaStar />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">
              {user?.fullname}
            </h2>
          </div>
          <p className="text-[11px] text-white/30 font-medium mt-1 uppercase tracking-wider">
            {freelancerProfile?.jobTitle} - {user?.role}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <button className="flex-1 md:flex-none text-[10px] text-white/40 font-bold px-7 py-3.5 bg-[#0c0c0c] border border-white/5 rounded-full uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          <FiPlus className="text-sm" /> Add Ready Service
        </button>
        <button className="flex-1 md:flex-none text-[10px] text-black bg-white font-black px-8 py-3.5 rounded-full flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-white/5">
          <FiSearch className="text-sm" /> Find New Projects
        </button>
      </div>
    </div>
  );
};

export default Header;
