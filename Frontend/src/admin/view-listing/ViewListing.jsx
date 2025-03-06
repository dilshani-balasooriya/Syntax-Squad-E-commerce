import React from 'react';
import AdminHeader from '../AdminHeader';
import CarItem from './components/CarItem';

const ViewListing = () => {
  return (
    <div>
        <AdminHeader title={"View Listing"}/>
        <div className="p-8 grid grid-row-2 md:grid-row-3 lg:grid-row-4 mt-7 gap-5">
            <CarItem/>
        </div>
    </div>
  );
}

export default ViewListing;