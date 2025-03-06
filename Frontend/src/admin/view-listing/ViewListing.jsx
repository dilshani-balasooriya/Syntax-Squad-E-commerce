import React from 'react';
import AdminHeader from '../AdminHeader';
import CarItem from './components/CarItem';

const ViewListing = () => {
  return (
    <div>
        <AdminHeader title={"View Listing"}/>
        <div className="">
            <CarItem/>
        </div>
    </div>
  );
}

export default ViewListing;