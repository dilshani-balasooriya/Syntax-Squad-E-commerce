import { SignInButton, useAuth, UserButton, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import apiRequest from "@/lib/apiRequest";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const registerUser = async () => {
    if (isSignedIn) {
      const token = await getToken();
      const isGoogleAuth = user.externalAccounts.some(
        (account) => account.provider === "google"
      );

      const res = await apiRequest.post(
        "/auth/login",
        {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName,
          isGoogleAuth,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("token", res.data.token);
    }
  };

  useEffect(() => {
    registerUser();
  }, [isSignedIn, user]);

  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <img src="/logo.svg" width={150} height={100} />
      <ul className="hidden  md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center mr-5">
          <UserButton />
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button>Join</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Header;
