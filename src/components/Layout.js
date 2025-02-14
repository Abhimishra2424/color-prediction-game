import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BottomNav from "./BottomNav";

const Layout = () => {
  const { user } = useAuth(); // ✅ Properly fetching user

  return (
    <div>
      {/* ✅ Main Content */}
      <Outlet />

      {/* ✅ Show Bottom Navigation only if user is logged in */}
      {user && <BottomNav />}
    </div>
  );
};

export default Layout;
