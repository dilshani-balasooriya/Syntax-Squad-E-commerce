import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { Link } from "react-router-dom";
import apiRequest from "@/lib/apiRequest";
import AuthContext from "@/context/AuthContext";
import DeleteField from "./DeleteField";

const CarItem = ({ car }) => {
  const { token } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/car-listing/delete-car-list/${car._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
      <img
        src={car?.imageUrl[0]}
        width={"100%"}
        height={250}
        className="rounded-t-xl h-[180px] object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2">
          {car?.listingTitle}
        </h2>
        <Separator />
        <div className="grid md:grid-cols-3 mt-5 text-black">
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
            <h2>{car?.transmission} </h2>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between text-black">
          <h2 className="font-bold text-xl">${car.sellingPrice}</h2>
        </div>
      </div>

      <Separator />

      <div className="p-3 flex justify-evenly gap-8">
        <Link to={`/admin/view-single-listing/${car?._id}`} className="w-full">
          <Button className="bg-green-700 hover:bg-green-600 w-full">
            <FaEye />
          </Button>
        </Link>
        <Link
          to={`/admin/add-listing?mode=edit&id=${car?._id}`}
          className="w-full"
        >
          <Button className="w-full bg-yellow-400 hover:bg-yellow-500">
            <FaEdit />
          </Button>
        </Link>
        <DeleteField handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CarItem;
