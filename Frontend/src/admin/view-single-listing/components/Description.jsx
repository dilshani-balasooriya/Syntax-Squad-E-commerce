import React from "react";

const Description = ({ carDetail }) => {
  return (
    <div>
      {carDetail?.listingDescription ? (
        <div className="p-10 rounded-xl bg-blue-50 shadow-md mt-6 border">
          <h2 className="my-2 font-medium text-2xl text-primary">Description</h2>
          <p className="text-primary">{carDetail?.listingDescription}</p>
        </div>
      ) : (
        <div className="w-full h-[100px] mt-7 bg-slate-200 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
};

export default Description;
