import Chatbot from "@/components/Chatbot";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Outlet />
      {!isAdminPage && <Chatbot />} 
    </>
  );
};

export default Layout;
