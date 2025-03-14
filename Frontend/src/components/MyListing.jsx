import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import apiRequest from "@/lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";
import CarItem from "./CarItem";
import AuthContext from "@/context/AuthContext";

const MyListing = () => {
  const [carListings, setCarListings] = useState([]);
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

  useEffect(() => {
    GetUserCarListing();
  }, []);

  return (
    <>
      <Toaster />
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-4xl">My Listing</h2>
          <Link to={"/admin/dashboard"}>
            <Button>Go to dashboard</Button>
          </Link>
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
