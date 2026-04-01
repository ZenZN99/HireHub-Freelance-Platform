import { FiChevronRight, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[2.5rem]">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            Profile Status
          </h3>
          <span className="text-[11px] font-bold text-white/60">85%</span>
        </div>
        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= 4 ? "bg-white" : "bg-white/10"}`}
            ></div>
          ))}
        </div>
        <button className="w-full bg-white/5 border border-white/10 hover:bg-white hover:text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
          View Profile as Client
        </button>
      </div>

      <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[2.5rem]">
        <h3 className="text-[10px] font-bold mb-10 text-white/40 uppercase tracking-[0.2em] flex items-center gap-2.5">
          <FiSettings /> Settings
        </h3>
        <div className="flex flex-col gap-8">
          {["Edit Profile", "Manage Portfolio", "Withdraw Funds"].map(
            (label) => (
              <a
                key={label}
                href="#"
                className="text-[10px] text-white/20 font-black hover:text-white transition-all uppercase tracking-[0.1em] flex justify-between items-center group"
              >
                {label}
                <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
