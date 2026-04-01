import { LuMail, LuPhone, LuMapPin, LuSend } from "react-icons/lu";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#34d399]/20 selection:text-[#34d399] overflow-x-hidden">
      {/* HERO */}
      <main className="container mx-auto px-6 pt-24 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
          </span>
          Contact HireHub
        </div>

        <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
          LET’S TALK
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-white italic">
            FUTURE
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/40 mb-16 font-medium">
          Have a project, question, or idea? We’re here to connect you with the
          right talent instantly.
        </p>
      </main>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 mb-40 grid md:grid-cols-2 gap-10">
        {/* CONTACT FORM */}
        <div className="bg-[#0C0C0C] border border-white/5 p-10 rounded-[2rem]">
          <h2 className="text-2xl font-black mb-6">Send a Message</h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#34d399]/40"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#34d399]/40"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-[#34d399]/40 resize-none"
            />

            <button
              type="button"
              className="w-full bg-white text-black py-3 rounded-xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-[#34d399] hover:text-white transition-all"
            >
              Send Message <LuSend size={16} />
            </button>
          </form>
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-[2rem] flex items-center gap-4 hover:border-[#34d399]/30 transition-all">
            <LuMail className="text-[#34d399]" size={24} />
            <div>
              <h3 className="font-black">Email</h3>
              <p className="text-white/30 text-sm">support@hirehub.com</p>
            </div>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-[2rem] flex items-center gap-4 hover:border-[#34d399]/30 transition-all">
            <LuPhone className="text-[#34d399]" size={24} />
            <div>
              <h3 className="font-black">Phone</h3>
              <p className="text-white/30 text-sm">+00 123 456 789</p>
            </div>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-[2rem] flex items-center gap-4 hover:border-[#34d399]/30 transition-all">
            <LuMapPin className="text-[#34d399]" size={24} />
            <div>
              <h3 className="font-black">Location</h3>
              <p className="text-white/30 text-sm">Remote • Worldwide</p>
            </div>
          </div>

          <div className="bg-[#0C0C0C] border border-white/5 p-8 rounded-[2rem]">
            <h3 className="font-black mb-2">HireHub Network</h3>
            <p className="text-white/30 text-sm">
              We connect freelancers and clients globally with secure and fast
              matching systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
