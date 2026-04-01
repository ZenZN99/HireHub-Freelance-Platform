import {
  LuCode,
  LuPalette,
  LuMegaphone,
  LuDatabase,
  LuClock,
  LuShieldCheck,
} from "react-icons/lu";

const FreelancersHelp = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 text-white">
      
      {/* HEADER */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          How freelancers help you
        </h2>
        <p className="text-white/30 text-sm uppercase tracking-[0.4em]">
          GET_WORK_DONE_FASTER
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] group hover:border-[#34d399]/30 transition-all">
          <LuCode className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
          <h3 className="text-xl font-black mb-3 group-hover:text-[#34d399]">
            Build Your Product
          </h3>
          <p className="text-white/30 text-sm">
            Developers can turn your idea into a real web or mobile application quickly and efficiently.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] group hover:border-[#34d399]/30 transition-all">
          <LuPalette className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
          <h3 className="text-xl font-black mb-3 group-hover:text-[#34d399]">
            Design Your Brand
          </h3>
          <p className="text-white/30 text-sm">
            Designers create modern UI/UX and strong brand identities that attract customers.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] group hover:border-[#34d399]/30 transition-all">
          <LuMegaphone className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
          <h3 className="text-xl font-black mb-3 group-hover:text-[#34d399]">
            Grow Your Audience
          </h3>
          <p className="text-white/30 text-sm">
            Marketers help you reach more users through ads, SEO, and social media strategies.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] group hover:border-[#34d399]/30 transition-all">
          <LuDatabase className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
          <h3 className="text-xl font-black mb-3 group-hover:text-[#34d399]">
            Manage Data & Systems
          </h3>
          <p className="text-white/30 text-sm">
            Data engineers organize, analyze, and optimize your business data efficiently.
          </p>
        </div>

        {/* Card 5 */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] group hover:border-[#34d399]/30 transition-all">
          <LuClock className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
          <h3 className="text-xl font-black mb-3 group-hover:text-[#34d399]">
            Save Your Time
          </h3>
          <p className="text-white/30 text-sm">
            Freelancers handle tasks while you focus on growing your business.
          </p>
        </div>

        {/* Card 6 */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] group hover:border-[#34d399]/30 transition-all">
          <LuShieldCheck className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
          <h3 className="text-xl font-black mb-3 group-hover:text-[#34d399]">
            Work Securely
          </h3>
          <p className="text-white/30 text-sm">
            Verified freelancers and secure payments ensure safe collaborations.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FreelancersHelp;