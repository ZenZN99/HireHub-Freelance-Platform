import ActiveDomains from "../components/welcome/ActiveDomains";
import Hero from "../components/welcome/Hero";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#34d399]/20 selection:text-[#34d399] overflow-x-hidden">
      <Hero />
      <ActiveDomains />
    </div>
  );
};

export default Welcome;
