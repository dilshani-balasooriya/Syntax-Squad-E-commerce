import React, { useState } from "react";
import { Button } from "./ui/button";
import Login from "./Login";

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="flex justify-between items-center shadow-sm p-5 relative">
      <img src="/logo.svg" width={150} height={100} alt="Logo" />
      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Home</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Search</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">New</li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Preowned</li>
      </ul>
      <Button onClick={() => setIsLoginOpen(true)}>Join</Button>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default Header;
