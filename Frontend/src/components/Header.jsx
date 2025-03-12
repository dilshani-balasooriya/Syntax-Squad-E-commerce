import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Login from "./Login";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
  
    checkAuth();
    window.addEventListener("storage", checkAuth);
  
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="flex justify-between items-center shadow-sm p-5 relative">
      <img src="/logo.svg" width={150} height={100} alt="Logo" />
      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Home</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Search</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">New</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Preowned</li>
      </ul>

      <div className="relative">
        {!isAuthenticated ? (
          <Button onClick={() => setIsLoginOpen(true)}>Join</Button>
        ) : (
          <div className="relative">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
              <img
                src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
                className="w-12 h-12 object-cover rounded-full"
                alt="Profile"
              />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
                <button onClick={handleLogout} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      </div>
    </div>
  );
};

export default Header;
