import React from "react";
import { Button } from "./ui/button";

const Register = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8 h-auto min-h-[450px] flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center mb-4">
          Sign up to Car Marketplace
        </h2>
        
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
        />

        <Button className="w-full py-3">Continue</Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already a member?{" "}
          <a href="#" className="text-indigo-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;