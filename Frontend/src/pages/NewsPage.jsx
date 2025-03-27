import Header from "@/components/Header";
import React from "react";

const NewsPage = () => {
  return (
    <div>
      <Header />
      <div className="text-center mt-20">
        <h1 className="text-2xl font-semibold">
          🚧 This page is under maintenance 🚧
        </h1>
        <p className="text-gray-600 mt-2">
          We're working hard to bring you updates. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default NewsPage;
