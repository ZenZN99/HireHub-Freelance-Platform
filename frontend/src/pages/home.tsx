import { useEffect, useState } from "react";
import { UserRoles } from "../types/user";
import FreelancerDashboard from "./freelancerDashboard";
import ClientDashboard from "./clientDashboard";
import Welcome from "./welcome";
import { useAuthStore } from "../stores/useAuthStore";

const Home = () => {
  const { user, loadUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="w-10 h-10 border-4 border-[#34d399] border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  const role = user?.role;

  if (!user) return <Welcome />;

  return (
    <div>
      {role === UserRoles.FREELANCER && <FreelancerDashboard />}
      {role === UserRoles.CLIENT && <ClientDashboard />}
      {!role && <Welcome />}
    </div>
  );
};
export default Home;
