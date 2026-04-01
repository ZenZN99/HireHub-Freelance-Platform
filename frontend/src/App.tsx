import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AppRoute from "./routes/AppRoute";

const App: React.FC = () => {
  const location = useLocation();
  const hideLayout = 
    location.pathname === "/login" || 
    location.pathname === "/signup";

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            padding: "14px",
            borderRadius: "8px",
          },
        }}
      />

      <div className="flex flex-col min-h-screen bg-[#050505] text-white">
        
        {!hideLayout && <Navbar />}

        <main className={`flex-grow ${!hideLayout ? "pt-24" : ""}`}>
          <AppRoute />
        </main>

        {!hideLayout && <Footer />}
      </div>
    </div>
  );
};

export default App;