import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import apiRequest from "@/lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";
import CarItem from "./CarItem";
import AuthContext from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

const MyListing = () => {
  const [carListings, setCarListings] = useState([]);
  const [profileDetail, setProfileDetail] = useState();
  const { token } = useContext(AuthContext);

  const GetUserCarListing = async () => {
    try {
      const response = await apiRequest.get("/car-listing/get-user-listing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarListings(response.data);
    } catch (error) {
      toast.error("Failed to load listings!");
    }
  };

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

  useEffect(() => {
    GetUserCarListing();
    GetProfile();
  }, []);

  return (
    <>
      <Toaster />
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-4xl">My Listing</h2>
          {profileDetail?.role === "admin" && (
            <Button onClick={() => (window.location.href = "/admin/dashboard")}>Go to dashboard</Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
          {carListings.map((item, index) => (
            <div key={index}>
              <CarItem car={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyListing;
