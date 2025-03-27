import React from 'react';

const Pricing = ({carDetail}) => {
  return (
    <div className='p-10 rounded-xl border shadow-md bg-blue-50'>
        <h2 className='text-primary'>Our Price</h2>
        <h2 className='font-bold text-4xl text-primary'>LKR {carDetail?.sellingPrice}</h2>
    </div>
  );
}

export default Pricing;