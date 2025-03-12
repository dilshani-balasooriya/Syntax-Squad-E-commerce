import React, { useState } from 'react';
import { Button } from './ui/button';
import { FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = ({ onClose }) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white rounded-lg shadow-lg w-96 p-8 h-auto min-h-[450px] flex flex-col justify-center relative">
        <FaTimesCircle 
          className="absolute top-4 right-4 cursor-pointer" 
          onClick={onClose} 
        />
        <h2 className="text-xl font-semibold text-center mb-8">
          Sign in to Car Marketplace
        </h2>

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
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
          <div 
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <Button className="w-full py-3">Continue</Button>

        <p className="text-center text-sm text-black mt-6">
          Don’t have an account? <Link to={'/register'} className="underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
