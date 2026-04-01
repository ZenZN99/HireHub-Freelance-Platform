import {
  LuArrowUpRight,
  LuCpu,
  LuTarget,
  LuGlobe,
  LuBox,
} from "react-icons/lu";
import FreelancersHelp from "./FreelancersHelp";
import Services from "./Services";
import FAQ from "./Faq";
import About from "./About";
import ContactUs from "./ContactUs";

const ActiveDomains = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-48">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-2 tracking-tighter">
          Active Domains
        </h2>
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
          EXPLORE_DOMAINS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#0C0C0C] border border-white/5 p-12 rounded-[2rem] flex flex-col justify-between min-h-[400px] group hover:bg-[#111] hover:border-[#34d399]/30 transition-all duration-500">
          <div>
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#34d399]/50 transition-colors">
              <LuCpu
                className="text-white/60 group-hover:text-[#34d399]"
                size={24}
              />
            </div>
            <h3 className="text-4xl font-black mb-4 group-hover:text-[#34d399] transition-colors">
              Programming & Development
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Develop web applications, smartphones, and build complex backend
              systems using the latest technologies.
            </p>
          </div>
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
            1,240 Active
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-[2rem] flex-1 group hover:bg-[#111] hover:border-[#34d399]/30 transition-all duration-500">
            <LuTarget
              className="text-white/40 group-hover:text-[#34d399] transition-colors mb-6"
              size={24}
            />
            <h3 className="text-xl font-black mb-2 group-hover:text-[#34d399] transition-colors">
              Design & Interfaces
            </h3>
            <p className="text-white/30 text-xs">
              User interface and user experience design.
            </p>
            <div className="mt-6 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              1,240 Active
            </div>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-[2rem] flex-1 group hover:bg-[#111] hover:border-[#34d399]/30 transition-all duration-500">
            <LuGlobe
              className="text-white/40 group-hover:text-[#34d399] transition-colors mb-6"
              size={24}
            />
            <h3 className="text-xl font-black mb-2 group-hover:text-[#34d399] transition-colors">
              Digital Marketing
            </h3>
            <p className="text-white/30 text-xs">
              Marketing strategies and campaign management.
            </p>
            <div className="mt-6 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              1,240 Active
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] flex items-center justify-between group hover:bg-[#111] hover:border-[#34d399]/30 transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#34d399]/50 transition-colors">
                <LuBox
                  size={24}
                  className="text-white/40 group-hover:text-[#34d399]"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black group-hover:text-[#34d399] transition-colors">
                  Data Analysis
                </h3>
                <p className="text-white/30 text-sm">
                  AI models and data engineering.
                </p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-white/40 uppercase flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              Browse All <LuArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>

      <FreelancersHelp />
      <About />
      <Services />
      <ContactUs />
      <FAQ />
    </section>
  );
};

export default ActiveDomains;
