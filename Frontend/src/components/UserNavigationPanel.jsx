import React from 'react';
import { Link } from 'react-router-dom';

const UserNavigationPanel = () => {
  return (
    <div className="bg-white absolute right-0 border border-gray-300 w-60 shadow-lg rounded-lg p-4">
      <div className="flex flex-col gap-2">

        <Link className="block px-6 py-3 text-gray-700 rounded-md text-lg hover:bg-gray-100">
          Profile 
        </Link>

        <span className="border-t border-gray-300"></span>

        <button className="text-left px-6 py-3 w-full rounded-md hover:bg-gray-100">
          <h3 className="font-bold text-lg text-gray-800">Sign Out</h3>
        </button>

      </div>
    </div>
  );
};

export default UserNavigationPanel;
