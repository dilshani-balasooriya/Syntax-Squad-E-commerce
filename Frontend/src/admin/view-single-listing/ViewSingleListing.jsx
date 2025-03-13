import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import { useParams } from "react-router-dom";
import apiRequest from "@/lib/apiRequest";

const ViewSingleListing = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();

  useEffect(() => {
    GetCarDetail();
  }, []);

  const GetCarDetail = async () => {
    try {
      const response = await apiRequest.get(
        `/car-listing/get-single-car-listing/${id}`
      );
      if (response.status !== 200) {
        console.log("Failed to fetch car details.");
      }
      const data = response.data;
      setCarDetail(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  return (
    <div>
      <AdminHeader title={"Signal View Listing"} />
      <div className="p-10 md:px-20">
        
      </div>
    </div>
  );
};

export default ViewSingleListing;
