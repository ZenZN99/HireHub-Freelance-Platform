import { FiArrowRight, FiSettings } from "react-icons/fi";

const ProfileStatus = () => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-[#0A0A0A] p-7 rounded-[32px] border border-[#1A1A1A]">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase mb-6 tracking-widest">
          Profile Status
        </h3>
        <div className="mb-6">
          <div className="flex justify-between text-[10px] mb-2">
            <span className="text-gray-500">Completeness</span>
            <span className="text-white font-bold">85%</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full ${s <= 4 ? "bg-white" : "bg-[#1A1A1A]"}`}
              ></div>
            ))}
          </div>
        </div>
        <button className="w-full py-3 bg-[#111] border border-[#222] rounded-xl text-[10px] text-gray-400 hover:text-white transition-colors">
          View Profile as Client
        </button>
      </div>

      <div className="bg-[#0A0A0A] p-7 rounded-[32px] border border-[#1A1A1A]">
        <div className="flex items-center gap-2 mb-8">
          <FiSettings className="text-gray-500 text-sm" />
          <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            Settings
          </h3>
        </div>
        <div className="space-y-6">
          {["Edit Profile", "Manage Portfolio", "Withdraw Funds"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="flex justify-between items-center group"
              >
                <span className="text-[12px] text-gray-500 group-hover:text-white transition-colors">
                  {item}
                </span>
                <FiArrowRight className="text-gray-800 group-hover:text-white transition-transform group-hover:translate-x-1" />
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileStatus;
