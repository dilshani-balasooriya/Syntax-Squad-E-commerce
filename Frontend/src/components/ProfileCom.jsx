import AuthContext from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import apiRequest from "@/lib/apiRequest";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ProfileCom = () => {
  const [profileDetail, setProfileDetail] = useState();
  const { token, removeFromSession } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await apiRequest.get(`/auth/get-profile/${userId}`);
      const data = response.data;
      setProfileDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    removeFromSession();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg mt-10">
      <div className="flex flex-col items-center gap-3 w-full text-center">
        <img
          src={profileDetail?.profile_img}
          alt="profile_img"
          className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md transition-transform duration-300 hover:scale-105"
        />

        <h1 className="text-3xl font-bold text-gray-800">
          {profileDetail?.fullname}
        </h1>

        <p className="text-gray-600 text-base">
          {profileDetail?.email || "user@example.com"}
        </p>

        <div className="flex gap-4 mt-4 w-full max-w-xs">
          <Button className="w-full">Edit Profile</Button>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCom;
