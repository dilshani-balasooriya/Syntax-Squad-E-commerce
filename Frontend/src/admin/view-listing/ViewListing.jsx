import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import CarItem from "./components/CarItem";
import apiRequest from "@/lib/apiRequest";
import AuthContext from "@/context/AuthContext";

const ViewListing = () => {
  const [carListings, setCarListings] = useState([]);
  const { token } = useContext(AuthContext);

  const GetUserCarListing = async () => {
    try {
      const response = await apiRequest.get("/car-listing/get-user-listing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarListings(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load listings!");
    }
  };

  const handleDeleteSuccess = (deletedCarId) => {
    setCarListings((prevListings) =>
      prevListings.filter((car) => car._id !== deletedCarId)
    );
  };

  useEffect(() => {
    GetUserCarListing();
  }, []);

  return (
    <div>
      <AdminHeader title={"View Listing"} />
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-8">
        {carListings.map((item, index) => (
          <div key={index}>
            <CarItem car={item} onDeleteSuccess={handleDeleteSuccess} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewListing;
