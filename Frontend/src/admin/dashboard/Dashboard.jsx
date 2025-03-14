import React from 'react';
import AdminHeader from '../AdminHeader';
import StatCard from './components/StatCard';

const Dashboard = () => {
  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="">
        <StatCard/>
      </div>
    </div>
  );
}

export default Dashboard;