import LOGO1 from "../images/LOGO1.jpeg";

const Footer = () => {
  return (
    <footer className="w-full bg-black pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-start">

          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6 group cursor-pointer w-fit">
              <img
                src={LOGO1}
                alt="Logo"
                className="w-8 h-8 object-contain transition-transform"
              />
              <span className="text-xl font-black tracking-[0.3em] text-white transition-colors">
                HIREHUB
              </span>
            </div>
            <p className="text-white/30 text-xs max-w-sm leading-relaxed font-medium">
              The leading digital platform for freelance work. We connect
              exceptional talent with ambitious projects in an advanced, secure,
              and high-performance environment.
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-white">
                Quick Links
              </h4>
              <ul className="text-[11px] space-y-3 text-white/30 font-bold uppercase tracking-wider">
                <li>
                  <a href="#" className="hover:text-white inline-block transition-all">
                    Browse Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white inline-block transition-all">
                    Post a Project
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white inline-block transition-all">
                    Join as Freelancer
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-widest mb-6 text-white">
                System
              </h4>
              <ul className="text-[11px] space-y-3 text-white/30 font-bold uppercase tracking-wider">
                <li>
                  <a href="#" className="hover:text-white inline-block transition-all">
                    Admin Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white inline-block transition-all">
                    Security Protocols
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white inline-block transition-all">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] transition-colors cursor-default">
            © 2026 HIREHUB. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer group">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse group-hover:bg-[#34d399]"></span>
            <span className="text-white/60 text-[9px] font-bold tracking-[0.1em] uppercase">
              SYSTEM ONLINE
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;