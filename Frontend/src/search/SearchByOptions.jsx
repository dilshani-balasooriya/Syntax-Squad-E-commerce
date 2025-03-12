import React, { useEffect, useState } from 'react';
import CarItem from '@/components/CarItem';
import Header from '@/components/Header';
import Search from '@/components/Search';
import apiRequest from '@/lib/apiRequest';
import { useSearchParams } from 'react-router-dom';

const SearchByOptions = () => {
    
    const [searchParam]=useSearchParams();
    const [carList,setCarList]=useState([]);
    const condition=searchParam.get('cars');
    const make=searchParam.get('make');
    const price=searchParam.get('price');

    const GetCarList = async () => {
        try {
            const response = await apiRequest.get(`/car-listing/search?condition=${condition || ''}&make=${make || ''}&sellingPrice=${price || ''}`);
            console.log(response)
            if (response.status !== 200) {
                console.log("Failed to fetch car listings.");
              }
              const data = response.data;
              setCarList(data);
        } catch (error) {
            console.error("Error fetching car listings:", error);
        }
    }

    useEffect(() => {
        GetCarList();
    },[]);

  return (
    <div>
      <Header />
      <div className="p-16 bg-black flex justify-center">
        <Search />
      </div>

      <div className="p-10 md:px-20">
        <h2 className="font-bold text-4xl ">Search Result</h2>

        {/* List of CarList  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList?.length > 0
            ? carList.map((item, index) => (
                <div key={index}>
                  <CarItem car={item} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div className="h-[320px] rounded-xl bg-slate-200 animate-pulse"></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SearchByOptions;