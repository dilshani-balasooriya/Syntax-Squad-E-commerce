import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./pages/Profile";
import AdminLayout from "./admin/AdminLayout";
import AddListing from "./admin/add-listing/AddListing";
import Dashboard from "./admin/dashboard/Dashboard";
import Users from "./admin/users/Users";
import ViewListing from "./admin/view-listing/ViewListing";
import ViewSingleListing from "./admin/view-single-listing/ViewSingleListing";
import SearchByCategory from "./search/[category]/SearchByCategory";
import SearchByOptions from "./search/SearchByOptions";

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
      path:'/search',
      element:<SearchByOptions/>
    },
    {
      path:'/search/:category',
      element:<SearchByCategory/>
    },
    {
      path:'/admin',
      element: <AdminLayout/>,
      children: [
        {
          path:'dashboard',
          element: <Dashboard/>
        },
        {
          path:'add-listing',
          element: <AddListing/>
        },
        {
          path:'view-listing',
          element: <ViewListing/>
        },
        {
          path:'view-single-listing',
          element: <ViewSingleListing/>
        },
        {
          path:'users',
          element: <Users/>
        },
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