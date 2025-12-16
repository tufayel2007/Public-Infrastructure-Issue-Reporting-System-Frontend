import React from "react";
import { useNavigate } from "react-router-dom";

// import AdminProfile from "./AdminProfile";
// import StaffProfile from "./StaffProfile";
import CitizenProfile from "./CitizenProfile";
import { useAuth } from "../context/AuthContext";

const ProfileRouter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  switch (user.role) {
    // case "admin":
    //   return <AdminProfile />;
    // case "staff":
    //   return <StaffProfile />;
    default:
      return <CitizenProfile />;
  }
};

export default ProfileRouter;
