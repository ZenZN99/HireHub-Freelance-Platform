import {
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTrendingDown,
} from "react-icons/fi";
import { IoSnow } from "react-icons/io5";
import type { IUser } from "../../../types/user";
import type { IClient } from "../../../types/client-profile";

interface StatsProps {
  user: IUser | null;
  clientProfile: IClient | null;
}

const Stats = ({ user, clientProfile }: StatsProps) => {
  const stats = [
    {
      label: "Available Balance",
      val: `$ ${user?.balance}`,
      icon: <FiDollarSign className="text-emerald-500" />,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Frozen Balance",
      val: `$ ${user?.frozenBalance}`,
      icon: <IoSnow className="text-sky-500" />,
      bg: "bg-sky-50",
      border: "border-sky-200",
    },
    {
      label: "Completed Projects",
      val: clientProfile?.completedProjects,
      icon: <FiCheckCircle className="text-green-600" />,
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "Pending Proposals",
      val: clientProfile?.pendingProposals,
      icon: <FiClock className="text-amber-500" />,
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Total Spent",
      val: clientProfile?.totalSpent,
      icon: <FiTrendingDown className="text-red-500" />,
      bg: "bg-red-50",
      border: "border-red-200",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#0A0A0A] p-6 rounded-2xl border border-[#1A1A1A]"
        >
          <div className="w-8 h-8 bg-[#151515] rounded-lg mb-4 flex items-center justify-center border border-[#222]">
            {stat.icon}
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
            {stat.label}
          </p>
          <p className="text-2xl font-bold">{stat.val}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
