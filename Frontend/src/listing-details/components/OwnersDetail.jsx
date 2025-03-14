import apiRequest from "@/lib/apiRequest";
import React, { useEffect, useState } from "react";

const OwnersDetail = ({ listingId }) => {
  const [ownerProfileDetail, setOwnerProfileDetail] = useState();

  useEffect(() => {
    GetOwnersProfile();
  }, []);

  const GetOwnersProfile = async () => {
    try {
      const response = await apiRequest.get(
        `/auth/get-owner-profile/${listingId}`
      );
      const data = response.data;
      setOwnerProfileDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner/ Deals</h2>
      <img
        src={ownerProfileDetail?.profile_img}
        className="w-[70px] h-[70px] rounded-full"
      />
      <h2 className="mt-2 font-bold text-xl">{ownerProfileDetail?.fullname}</h2>
    </div>
  );
};

export default OwnersDetail;
