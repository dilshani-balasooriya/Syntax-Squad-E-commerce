import IconField from "@/admin/add-listing/components/IconField";
import CarSpecification from "@/Shared/CarSpecification";
import React from "react";


const Specification = ({ carDetail }) => {
  return (
    <div className="p-10 rounded-xl border shadow-md mt-7 bg-blue-50">
      <h2 className="font-medium text-2xl text-primary">Specifications</h2>
      {carDetail ? (
        CarSpecification.map((item, index) => (
          <div className="mt-5 flex items-center justify-between">
            <h2 className="flex gap-2 text-primary">
              <IconField icon={item?.icon} /> {item.label}
            </h2>
            <h2 className="text-primary">{carDetail?.[item?.name]}</h2>
          </div>
        ))
      ) : (
        <div className="w-full h-[500px] rounded-xl bg-slate-200 animate-pulse "></div>
      )}
    </div>
  );
};

export default Specification;
