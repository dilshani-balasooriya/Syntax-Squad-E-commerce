import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "./ui/button";
import AuthContext from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import apiRequest from "@/lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = ({ profileDetail, setIsEditing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState(profileDetail?.fullname);
  const [password, setPassword] = useState("");

  const { token } = useContext(AuthContext);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      const updatedData = {
        fullname: fullName,
      };

      if (password) {
        updatedData.password = password;
      }
      await apiRequest.put(`/auth/edit-user/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully 👍");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-3xl mx-auto p-8 mt-10">
        <div className="flex flex-col items-center gap-3 w-full text-center">
          <form onSubmit={handleUpdateProfile}>
            <img
              src={profileDetail?.profile_img}
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md transition-transform duration-300 hover:scale-105"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex gap-4">
              <Button>Update Profile</Button>
              <Button onClick={() => setIsEditing(false)}>Back to Profile</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
