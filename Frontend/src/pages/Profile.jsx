import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import MyListing from "@/components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCom from "@/components/ProfileCom";
import AuthContext from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import apiRequest from "@/lib/apiRequest";

const Profile = () => {
  const [profileDetail, setProfileDetail] = useState(null);
  const { token } = useContext(AuthContext);

  const GetProfile = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await apiRequest.get(`/auth/get-profile/${userId}`);
      setProfileDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetProfile();
  }, []);

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full flex justify-start">
            {profileDetail?.role === "admin" && (
              <TabsTrigger value="my-listing">My Listing</TabsTrigger>
            )}
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {profileDetail?.role === "admin" && (
            <TabsContent value="my-listing">
              <MyListing />
            </TabsContent>
          )}

          <TabsContent value="profile">
            <ProfileCom />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
