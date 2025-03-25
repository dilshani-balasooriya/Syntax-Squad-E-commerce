import React, { useContext } from "react";
import { Separator } from "./ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";
import ModalContext from "@/context/ModalContext";

const CarItem = ({ car }) => {
  const { token } = useContext(AuthContext);
  const { setIsLoginOpen } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (token) {
      navigate(`/listing-details/${car?._id}`);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div
      className="rounded-xl bg-white border hover:shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">
        New
      </h2>
      <img
        src={car?.imageUrl[0]}
        width={"100%"}
        height={250}
        className="rounded-t-xl h-[180px] object-cover"
        alt={car?.listingTitle}
      />
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2">
          {car?.listingTitle}
        </h2>
        <Separator />
        <div className="grid md:grid-cols-3 mt-5">
          <div className="flex flex-col items-center">
            <LuFuel className="text-lg mb-2" />
            <h2>{car?.mileage} Miles</h2>
          </div>
          <div className="flex flex-col items-center">
            <TbBrandSpeedtest className="text-lg mb-2" />
            <h2>{car?.fuelType} </h2>
          </div>
          <div className="flex flex-col items-center">
            <GiGearStickPattern className="text-lg mb-2" />
            <h2>{car?.transmission}</h2>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">${car?.sellingPrice}</h2>
          <h2 className="text-primary text-sm flex gap-2 items-center">
            View Details <MdOpenInNew />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
