import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path:'/contact',
      element:<Contact/>
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;