import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import apiRequest from "@/lib/apiRequest";

const Register = ({ onClose, openLogin }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const userAuthServer = async () => {
    try {
      const response = await apiRequest.post('/auth/register',{
        fullname,
        email,
        password
      });
      if(response.data){
        toast.success('Registration successful 👍');
        openLogin();
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(fullname.length < 5){
      return toast.error("Username must be at least 5 letters long")
    }

    if(!email.length){
      return toast.error("Enter Email")
    }

    if(!emailRegex.test(email)){
      return toast.error("Invalid Email")
    }

    if(!passwordRegex.test(password)){
      return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
    }

    userAuthServer();
  }

  return (
    <>
      <Toaster/>
      <div className="fixed inset-0 flex items-center justify-center z-10 bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-lg shadow-lg w-96 p-8 h-auto min-h-[450px] flex flex-col justify-center relative">
          <FaTimesCircle
            className="absolute top-4 right-4 cursor-pointer"
            onClick={onClose}
          />
          <h2 className="text-xl font-semibold text-center mb-8 mt-4">
            Sign up to Car Marketplace
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              onChange={(e) => setFullname(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <Button className="w-full py-3">Continue</Button>
          </form>

          <p className="text-center text-sm text-black mt-6">
            Already a member?{" "}
            <Link onClick={openLogin} className="underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
