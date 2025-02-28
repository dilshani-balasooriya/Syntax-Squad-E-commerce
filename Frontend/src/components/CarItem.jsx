import React from 'react';
  

const CarItem = ({car}) => {
  return (
    <div>
        <img src={car?.image} width={'100%'} height={250} className='rounded-t-xl h-[180px] object-cover'/>
        <div className="p-4">
            <h2 className='font-bold text-black text-lg mb-2'>{car?.name} Miles</h2> 
        </div>
    </div>
  );
}

export default CarItem;