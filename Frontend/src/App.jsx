import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AdminLayout from "./admin/AdminLayout";
import AddListing from "./admin/add-listing/AddListing";
import Dashboard from "./admin/dashboard/Dashboard";
import Users from "./admin/users/Users";
import ViewListing from "./admin/view-listing/ViewListing";
import ViewSingleListing from "./admin/view-single-listing/ViewSingleListing";
import SearchByCategory from "./search/[category]/SearchByCategory";
import SearchByOptions from "./search/SearchByOptions";
import ListingDetail from "./listing-details/[id]/ListingDetail";
import { AuthProvider } from "./context/AuthContext";
import VehiclesList from "./pages/VehiclesList";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout/Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/vehicles-list",
          element: <VehiclesList />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/search",
          element: <SearchByOptions />,
        },
        {
          path: "/search/:category",
          element: <SearchByCategory />,
        },
        {
          path: "/listing-details/:id",
          element: <ListingDetail />,
        },
      ]
    },
    {
      path: "/admin",
      element: <ProtectedRoute allowedRoles={["admin"]} />,
      children: [
        {
          path: "",
          element: <AdminLayout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "add-listing",
              element: <AddListing />,
            },
            {
              path: "view-listing",
              element: <ViewListing />,
            },
            {
              path: "view-single-listing/:id",
              element: <ViewSingleListing />,
            },
            {
              path: "users",
              element: <Users />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
