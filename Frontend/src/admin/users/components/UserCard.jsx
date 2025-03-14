import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center p-4">
        <img
          className="w-16 h-16 rounded-full border-2 border-indigo-500"
          src={userInfo?.profile_img}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {userInfo?.fullname}
          </h2>
          <p className="text-sm text-gray-600">{userInfo?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-white bg-indigo-500 rounded-full">
            {userInfo?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
