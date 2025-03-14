import React from 'react';

const Pricing = ({carDetail}) => {
  return (
    <div className='p-10 rounded-xl border shadow-md'>
        <h2>Our Price</h2>
        <h2 className='font-bold text-4xl'>${carDetail?.sellingPrice}</h2>
    </div>
  );
}

export default Pricing;