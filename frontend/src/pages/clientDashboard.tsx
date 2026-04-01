import { useAuthStore } from "../stores/useAuthStore";
import { useClient } from "../hooks/useClient";
import Header from "../components/dashboard/client/Header";
import Tabs from "../components/dashboard/client/Tabs";
import RecommendedProjects from "../components/dashboard/client/RecommendedProjects";
import ProfileStatus from "../components/dashboard/client/ProfileStatus";

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const { clientProfile } = useClient();

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10">
      <Header user={user} clientProfile={clientProfile} />

      <Tabs />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <RecommendedProjects user={user} clientProfile={clientProfile} />

        <ProfileStatus />
      </div>
    </div>
  );
};

export default ClientDashboard;
