import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import { LuFuel } from 'react-icons/lu';
import { TbBrandSpeedtest } from 'react-icons/tb';

const CarItem = ({ car }) => {
  return (
    <div className="flex items-center rounded-xl bg-white border hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden">
      <img src={car?.imageUrl[0]} className="w-[250px] h-[200px] object-cover" alt="Car" />
      <div className="p-3 flex-1">
        <h2 className="font-semibold text-2xl text-gray-900">{car?.listingTitle}</h2>
        <Separator className="my-2" />

        <div className="flex justify-between mt-4 text-gray-600 text-sm">
            <div className="flex flex-col items-center">
                <LuFuel className="text-xl text-gray-700 mb-1" />
                <span>{car?.mileage} Miles</span>
            </div>

            <div className="flex flex-col items-center">
                <TbBrandSpeedtest className="text-xl text-gray-700 mb-1" />
                <span>{car?.fuelType}</span>
            </div>

            <div className="flex flex-col items-center">
                <GiGearStickPattern className="text-xl text-gray-700 mb-1" />
                <span>{car?.transmission}</span>
            </div>

        </div>
      </div>

      <div className="p-2 rounded-lg flex flex-col gap-3 ml-auto mr-5">
        <Button className='bg-green-700'><FaEye /></Button>
        <Button className='bg-yellow-500'><FaEdit /></Button>
        <Button className='bg-red-600'><FaTrashAlt /></Button>
      </div>
    </div>
  );
};

export default CarItem;
