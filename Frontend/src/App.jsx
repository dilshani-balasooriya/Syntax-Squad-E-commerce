import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./pages/Profile";
import AdminLayout from "./admin/AdminLayout";
import AddListing from "./admin/add-listing/AddListing";

const App = () => {

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/admin',
      element: <AdminLayout/>,
      children: [
        {
          path:'add-listing',
          element: <AddListing/>
        }
      ]
    },
  ]);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  )
};

export default App;