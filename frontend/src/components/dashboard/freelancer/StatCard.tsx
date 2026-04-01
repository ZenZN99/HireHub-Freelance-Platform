interface StatCardProps {
  label: string;
  value: number | undefined;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <div className="bg-[#0c0c0c] border border-white/[0.05] p-9 rounded-[2.2rem] hover:border-white/20 transition-all cursor-pointer group">
    <div className="mb-8 text-white/10 group-hover:text-white transition-all text-2xl">
      {icon}
    </div>
    <p className="text-[9px] text-white/20 uppercase font-black tracking-[0.2em] mb-2">
      {label}
    </p>
    <p className="text-3xl font-bold tracking-tight">{value}</p>
  </div>
);

export default StatCard;
