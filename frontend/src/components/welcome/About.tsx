import {
  LuArrowUpRight,
  LuSparkles,
  LuShield,
  LuUsers,
  LuRocket,
} from "react-icons/lu";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#34d399]/20 selection:text-[#34d399] overflow-x-hidden">
      
    

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-6 mt-40 mb-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Why HireHub?
          </h2>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] mt-3">
            CORE_VALUES
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuRocket className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Fast Growth
            </h3>
            <p className="text-white/30 text-sm">
              Connect instantly with clients and projects without unnecessary friction.
            </p>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuUsers className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Global Talent
            </h3>
            <p className="text-white/30 text-sm">
              Work with top freelancers and clients from all around the world.
            </p>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuShield className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Secure Platform
            </h3>
            <p className="text-white/30 text-sm">
              Safe payments, verified users, and trusted collaborations.
            </p>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem] hover:border-[#34d399]/30 transition-all group">
            <LuSparkles className="text-white/40 group-hover:text-[#34d399] mb-6" size={28} />
            <h3 className="text-2xl font-black mb-3 group-hover:text-[#34d399]">
              Smart Matching
            </h3>
            <p className="text-white/30 text-sm">
              AI-powered matching system to connect the right talent with the right job.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center mb-40 px-6">
        <div className="bg-[#0C0C0C] border border-white/5 rounded-[2rem] p-16 max-w-4xl mx-auto hover:border-[#34d399]/30 transition-all">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to build your future?
          </h2>
          <p className="text-white/30 mb-8">
            Join thousands of freelancers and companies already using HireHub.
          </p>

          <button className="bg-white text-black px-10 py-4 rounded-full text-sm font-black flex items-center gap-2 mx-auto uppercase tracking-wider hover:bg-[#34d399] hover:text-white transition-all">
            Get Started <LuArrowUpRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;