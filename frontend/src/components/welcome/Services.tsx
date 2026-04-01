import {
  LuArrowUpRight,
  LuCode,
  LuPalette,
  LuMegaphone,
  LuDatabase,
  LuVideo,
  LuPenTool,
} from "react-icons/lu";

const Services = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#34d399]/20 selection:text-[#34d399] overflow-x-hidden">
      {/* HERO */}
      <main className="container mx-auto px-6 pt-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
          </span>
          HireHub Services
        </div>

        <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
          WHAT WE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-white italic">
            OFFER
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/40 mb-16 font-medium">
          A full ecosystem of freelance services designed to help you build,
          scale, and grow faster than ever.
        </p>
      </main>

      {/* SERVICES GRID */}
      <section className="max-w-6xl mx-auto px-6 mb-40">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Service 1 */}
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuCode
              className="text-white/40 group-hover:text-[#34d399] mb-6"
              size={30}
            />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Web Development
            </h3>
            <p className="text-white/30 text-sm mb-6">
              Full-stack web apps, APIs, dashboards, and scalable systems.
            </p>
            <div className="text-[10px] font-bold text-white/20 uppercase">
              React • Node • Next.js
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuPalette
              className="text-white/40 group-hover:text-[#34d399] mb-6"
              size={30}
            />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              UI/UX Design
            </h3>
            <p className="text-white/30 text-sm mb-6">
              Modern interfaces, user experience flows, and product design.
            </p>
            <div className="text-[10px] font-bold text-white/20 uppercase">
              Figma • UX Research
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuMegaphone
              className="text-white/40 group-hover:text-[#34d399] mb-6"
              size={30}
            />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Digital Marketing
            </h3>
            <p className="text-white/30 text-sm mb-6">
              SEO, ads, social media strategy, and growth hacking.
            </p>
            <div className="text-[10px] font-bold text-white/20 uppercase">
              SEO • Ads • Content
            </div>
          </div>

          {/* Service 4 */}
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuDatabase
              className="text-white/40 group-hover:text-[#34d399] mb-6"
              size={30}
            />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Data Engineering
            </h3>
            <p className="text-white/30 text-sm mb-6">
              Big data pipelines, analytics, and AI-ready infrastructure.
            </p>
            <div className="text-[10px] font-bold text-white/20 uppercase">
              AI • Big Data • ETL
            </div>
          </div>

          {/* Service 5 */}
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuVideo
              className="text-white/40 group-hover:text-[#34d399] mb-6"
              size={30}
            />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Video Production
            </h3>
            <p className="text-white/30 text-sm mb-6">
              Ads, reels, motion graphics, and brand storytelling.
            </p>
            <div className="text-[10px] font-bold text-white/20 uppercase">
              After Effects • Editing
            </div>
          </div>

          {/* Service 6 */}
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuPenTool
              className="text-white/40 group-hover:text-[#34d399] mb-6"
              size={30}
            />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Branding
            </h3>
            <p className="text-white/30 text-sm mb-6">
              Identity design, logos, and complete brand systems.
            </p>
            <div className="text-[10px] font-bold text-white/20 uppercase">
              Identity • Strategy
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mb-40 px-6">
        <div className="bg-[#0C0C0C] border border-white/5 rounded-[2rem] p-16 max-w-4xl mx-auto hover:border-[#34d399]/30 transition-all">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Need a custom service?
          </h2>
          <p className="text-white/30 mb-8">
            Hire top freelancers instantly or post your own project.
          </p>

          <button className="bg-white text-black px-10 py-4 rounded-full text-sm font-black flex items-center gap-2 mx-auto uppercase tracking-wider hover:bg-[#34d399] hover:text-white transition-all">
            Explore Talent <LuArrowUpRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;
