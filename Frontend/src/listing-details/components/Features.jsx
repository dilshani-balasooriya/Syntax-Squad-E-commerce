import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const Features = ({ features }) => {
  return (
    <div>
      <div className="p-10 border shadow-md rounded-xl my-7">
        <h2 className="font-medium text-2xl">Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-7">
          {features &&
            Object.entries(features)
              .filter(([feature]) => feature !== "_id")
              .map(([feature, value]) => (
                <div key={feature} className="flex gap-2 items-center">
                  {value ? (
                    <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
                  ) : (
                    <FaTimes className="text-lg p-1 rounded-full bg-red-100 text-red-500" />
                  )}
                  <h2>{feature}</h2>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
