import React, { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import apiRequest from '@/lib/apiRequest';
import AdminHeader from '../AdminHeader';

const Users = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    GetUserInfo();
  }, []);

  const GetUserInfo = async () => {
    try {
      const response = await apiRequest.get('/auth/get-all-users');
      setUserInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminHeader title={"View Users"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 ml-10 mr-10">
        {userInfo.map((item) => (
          <div key={item._id}>
            <UserCard userInfo={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
