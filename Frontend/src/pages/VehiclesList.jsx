import CarItem from "@/components/CarItem";
import Header from "@/components/Header";
import apiRequest from "@/lib/apiRequest";
import React, { useEffect, useState } from "react";

const VehiclesList = () => {
  const [allListings, setAllListings] = useState([]);

  const GetAllCarList = async () => {
    const response = await apiRequest.get("/car-listing/get-all-listing");
    setAllListings(response.data);
  };

  useEffect(() => {
    GetAllCarList();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allListings.map((car, index) => (
            <div className="">
              <CarItem car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;
