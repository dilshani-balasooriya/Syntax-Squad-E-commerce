import Chatbot from "@/components/Chatbot";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Chatbot />
    </>
  );
};

export default Layout;
