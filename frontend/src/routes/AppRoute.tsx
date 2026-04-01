// Here you can add all Routes in the project
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import ClientDashboard from "../pages/clientDashboard";
import FreelancerDashboard from "../pages/freelancerDashboard";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      
      <Route path="/client" element={<ClientDashboard />} />
      <Route path="/freelancer" element={<FreelancerDashboard />} />
    </Routes>
  );
};

export default AppRoute;