import CarItem from "@/components/CarItem";
import Header from "@/components/Header";
import Search from "@/components/Search";
import apiRequest from "@/lib/apiRequest";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchByCategory = () => {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    GetCarList();
  }, [category]);

  const GetCarList = async () => {
    try {
      setIsLoading(true);
      setShowFinalMessage(false);

      const response = await apiRequest.get(
        `/car-listing/get-listings-by-category/${category}`
      );
      if (response.status !== 200) {
        console.log("Failed to fetch car listings");
      }
      const data = response.data;
      setCarList(data);
    } catch (error) {
      console.error("Error fetching car listings:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        if (carList.length === 0) {
          setShowFinalMessage(true);
        }
      }, 30000);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>

      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl ">{category}</h2>

        {/* List of CarList */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[320px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))
          ) : carList.length > 0 ? (
            carList.map((item, index) => (
              <div key={index}>
                <CarItem car={item} />
              </div>
            ))
          ) : showFinalMessage ? (
            <p className="text-gray-500 text-lg col-span-full">
              No results found.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
