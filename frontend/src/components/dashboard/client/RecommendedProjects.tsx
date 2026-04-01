import { FiBriefcase, FiExternalLink } from "react-icons/fi";
import Stats from "./Stats";
import type { IUser } from "../../../types/user";
import type { IClient } from "../../../types/client-profile";

interface RecommendedProjectsProps {
  user: IUser | null;
  clientProfile: IClient | null;
}

const RecommendedProjects = ({
  user,
  clientProfile,
}: RecommendedProjectsProps) => {
  return (
    <div className="lg:col-span-8 space-y-6">
      <Stats user={user} clientProfile={clientProfile} />
      <div className="bg-[#0A0A0A] p-8 rounded-[32px] border border-[#1A1A1A]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FiBriefcase className="text-green-500 text-lg" />
            <h3 className="font-bold">Recommended Projects</h3>
          </div>
          <a
            href="#"
            className="text-[10px] text-gray-500 hover:text-white flex items-center gap-1"
          >
            Browse All <FiExternalLink />
          </a>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Build Admin Dashboard for Real Estate",
              price: "$1,500 - $2,500",
              tags: ["React", "Tailwind"],
            },
            {
              title: "Convert Figma Design to Clean Code",
              price: "$400 - $800",
              tags: ["Figma", "Next.js"],
            },
          ].map((job, i) => (
            <div
              key={i}
              className="bg-[#050505] p-6 rounded-2xl border border-[#151515] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <h4 className="font-bold text-sm mb-1">{job.title}</h4>
                <p className="text-[10px] text-gray-500 mb-3">{job.price}</p>
                <div className="flex gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] bg-[#111] px-2 py-1 rounded border border-[#222] text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full sm:w-auto text-[10px] text-white bg-[#111] px-5 py-2.5 rounded-xl border border-[#222] hover:bg-white hover:text-black transition-all">
                Submit Proposal
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0A0A0A] p-8 rounded-[32px] border border-[#1A1A1A]">
        <h3 className="font-bold mb-6">Recent Activity</h3>
        <div className="space-y-5">
          <div className="flex justify-between items-center border-b border-[#151515] pb-5">
            <div>
              <p className="text-xs font-medium">React Dashboard Development</p>
              <p className="text-[10px] text-gray-600 mt-1">
                Fixed bugs & updated UI components
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold">$400</p>
              <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full mt-1 inline-block">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProjects;
