import { FiClock, FiMessageSquare } from "react-icons/fi";

interface ActivityItemProps {
  title: string;
  date: string;
  amount: string;
  status: "Pending" | "Rejected" | "Completed";
}

const ActivityItem = ({ title, date, amount, status }: ActivityItemProps) => (
  <div className="p-9 border-b border-white/[0.02] last:border-0 flex items-center justify-between hover:bg-white/[0.01] transition-all group">
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
        <FiMessageSquare className="text-white/20 text-xl group-hover:text-white" />
      </div>
      <div>
        <p className="text-[15px] font-bold mb-1.5">{title}</p>
        <p className="text-[9px] text-white/10 uppercase font-bold tracking-widest flex items-center gap-2">
          <FiClock /> {date}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-[15px] font-bold mb-2 tracking-tighter">{amount}</p>
      <span
        className={`text-[8px] uppercase font-black px-4 py-1 rounded-full tracking-widest ${
          status === "Pending"
            ? "bg-amber-500/10 text-amber-500"
            : status === "Rejected"
              ? "bg-red-500/10 text-red-500"
              : "bg-emerald-500/10 text-emerald-500"
        }`}
      >
        {status}
      </span>
    </div>
  </div>
);

export default ActivityItem;
