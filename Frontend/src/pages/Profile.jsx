import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import React from 'react';

const Profile = () => {
  return (
    <div>
        <Header/>
        <div className="px-10 md:px-20 my-10">
            <div className="flex justify-between items-center">
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Button>+ Add New Listing</Button>
            </div>
        </div>
    </div>
  );
}

export default Profile;