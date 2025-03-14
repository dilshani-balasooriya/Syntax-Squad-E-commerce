import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import StatCard from "./components/StatCard";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import apiRequest from "@/lib/apiRequest";

const Dashboard = () => {

  const [userCount, setUserCount] = useState();

  useEffect(()=>{
    GetUserCount();
  },[]);

  const GetUserCount = async () => {
    try {
      const response = await apiRequest.get('/auth/get-user-count');
      setUserCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Users" icon={Users} color="#8B5CF6" value={userCount} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
