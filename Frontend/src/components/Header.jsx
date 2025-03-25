import React, { useState, useContext, useEffect } from "react";
import { Button } from "./ui/button";
import Login from "./Login";
import UserNavigationPanel from "./UserNavigationPanel";
import Register from "./Register";
import AuthContext from "@/context/AuthContext";
import apiRequest from "@/lib/apiRequest";
import { jwtDecode } from "jwt-decode";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileDetail, setProfileDetail] = useState();
  const { token } = useContext(AuthContext);

  useEffect(()=>{
    GetProfile();
  },[]);

  const GetProfile = async () => {
    try {

      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await apiRequest.get(`/auth/get-profile/${userId}`);
      const data = response.data;
      setProfileDetail(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-between items-center shadow-sm p-5 relative">
      <img src="/logo.svg" width={150} height={100} alt="Logo" />
      <ul className="hidden md:flex gap-16">
        <NavLink to={'/'}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Home
          </li>
        </NavLink>
        <NavLink to={'/vehicles-list'}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Vehicles
          </li>
        </NavLink>
        {/* <NavLink to={'/news'}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            News
          </li>
        </NavLink> */}
        <NavLink to={'/contact'}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Contact us
          </li>
        </NavLink>
      </ul>

      <div className="relative">
        {!token ? (
          <Button onClick={() => setIsLoginOpen(true)}>Join</Button>
        ) : (
          <div className="relative">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <img
                src={profileDetail?.profile_img}
                className="w-12 h-12 object-cover rounded-full border-3 border-gray-300"
              />
            </button>
            {isProfileMenuOpen && <UserNavigationPanel />}
          </div>
        )}

        {isLoginOpen && (
          <Login
            onClose={() => setIsLoginOpen(false)}
            openRegister={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />
        )}
        {isRegisterOpen && (
          <Register
            onClose={() => setIsRegisterOpen(false)}
            openLogin={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
