import { useAuthStore } from "../stores/useAuthStore";
import { useFreelancer } from "../hooks/useFreelancer";
import Header from "../components/dashboard/freelancer/Header";
import LeftColumn from "../components/dashboard/freelancer/LeftColumn";
import Sidebar from "../components/dashboard/freelancer/Sidebar";

const FreelancerDashboard = () => {
  const { user } = useAuthStore();

  const { freelancerProfile } = useFreelancer();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:px-20 md:py-16 font-sans">
      <Header user={user} freelancerProfile={freelancerProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <LeftColumn user={user} freelancerProfile={freelancerProfile} />

        <Sidebar />
      </div>
    </div>
  );
};

export default FreelancerDashboard;
