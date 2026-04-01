import { FiPlus } from "react-icons/fi";
import type { IUser } from "../../../types/user";
import type { IClient } from "../../../types/client-profile";

interface HeaderProps {
  user: IUser | null;
  clientProfile: IClient | null;
}

const Header = ({ user, clientProfile }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#111] rounded-xl flex items-center justify-center border border-[#222]">
          <img
            src={user?.avatar}
            alt=""
            className="rounded-xl border-2 border-emerald-400"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user?.fullname}</h2>
          <p className="text-[11px] text-gray-500 uppercase tracking-widest">
            {clientProfile?.companyName} - {user?.role}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-[11px] text-gray-300 px-4 py-2 bg-[#0A0A0A] border border-[#1A1A1A] rounded-full flex items-center gap-2 hover:bg-[#151515]">
          <span className="text-[#FFC107]">✦</span> Add Ready Service
        </button>
        <button className="text-[11px] text-black bg-white font-bold px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-200">
          <FiPlus /> Find New Projects
        </button>
      </div>
    </div>
  );
};

export default Header;
