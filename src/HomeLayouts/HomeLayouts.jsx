import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthContext";

const HomeLayouts = () => {
  return (
    <AuthProvider>
      <div>
        <header>
          <Navbar />
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </AuthProvider>
  );
};

export default HomeLayouts;
