import { LuHexagon, LuZap, LuBriefcase, LuProjector } from "react-icons/lu";
import type { IUser } from "../../../types/user";
import type { IFreelancer } from "../../../types/freelancer-profile";
import StatCard from "./StatCard";
import { FiChevronRight } from "react-icons/fi";
import ProjectItem from "./ProjectItem";
import ActivityItem from "./ActivityItem";

interface LeftColumnProps {
  user: IUser | null;
  freelancerProfile: IFreelancer | null;
}

const LeftColumn = ({ user, freelancerProfile }: LeftColumnProps) => {
  return (
    <div className="lg:col-span-8 space-y-8">
      <div className="flex items-center gap-6">
        <h2 className="bg-[#0c0c0c] py-2 px-5 rounded-2xl border border-white/5">
          Available Balance:{" "}
          <span className="text-emerald-400 animate-pulse">
            ${user?.balance}
          </span>
        </h2>
        <h2 className="bg-[#0c0c0c] py-2 px-5 rounded-2xl border border-white/5">
          Frozen Balance:{" "}
          <span className="text-emerald-400 animate-pulse">
            ${user?.frozenBalance}
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Completed Projects"
          value={freelancerProfile?.completedJobs}
          icon={<LuZap />}
        />
        <StatCard
          label="Pending Proposals"
          value={freelancerProfile?.pendingProposal}
          icon={<LuHexagon />}
        />

        <StatCard
          label="Under Implementation Projects"
          value={freelancerProfile?.underImplementationProject}
          icon={<LuProjector />}
        />
      </div>

      {/* Recommended Projects Card */}
      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <LuBriefcase className="text-emerald-500 text-lg" />
            </div>
            <div>
              <h3 className="text-[11px] font-black tracking-widest text-white uppercase">
                Recommended Projects
              </h3>
              <p className="text-[9px] text-white/20 uppercase font-bold mt-1 tracking-tighter">
                Matches your skills
              </p>
            </div>
          </div>
          <button className="text-[9px] text-white/20 hover:text-white uppercase font-bold tracking-widest transition flex items-center gap-1.5">
            Browse All <FiChevronRight />
          </button>
        </div>

        <div className="space-y-4">
          <ProjectItem
            title="Build Admin Dashboard for Real Estate"
            client="Horizon Corp"
            budget="$1,500 - $2,500"
          />
          <ProjectItem
            title="Convert Figma Design to Clean Code"
            client="Creative Agency"
            budget="$500"
          />
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="pt-6">
        <h3 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase mb-6 px-1">
          Recent Activity
        </h3>
        <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden">
          <ActivityItem
            title="React Dashboard Development"
            date="2 days ago"
            amount="$800"
            status="Pending"
          />
          <ActivityItem
            title="Landing Page Programming"
            date="1 week ago"
            amount="$300"
            status="Rejected"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
