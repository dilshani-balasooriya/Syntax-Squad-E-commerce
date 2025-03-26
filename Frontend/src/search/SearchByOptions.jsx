import React, { useEffect, useState } from 'react';
import CarItem from '@/components/CarItem';
import Header from '@/components/Header';
import Search from '@/components/Search';
import apiRequest from '@/lib/apiRequest';
import { useSearchParams } from 'react-router-dom';

const SearchByOptions = () => {
    const [searchParam] = useSearchParams();
    const [carList, setCarList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFinalMessage, setShowFinalMessage] = useState(false);

    const condition = searchParam.get('cars');
    const make = searchParam.get('make');
    const price = searchParam.get('price');

    const GetCarList = async () => {
        try {
            setIsLoading(true);
            setShowFinalMessage(false);

            const response = await apiRequest.get(`/car-listing/search?condition=${condition || ''}&make=${make || ''}&sellingPrice=${price || ''}`);
            if (response.status !== 200) {
                console.log("Failed to fetch car listings.");
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
            }, 10000);
        }
    };

    useEffect(() => {
        GetCarList();
    }, [searchParam.toString()]);

    return (
        <div>
            <Header />
            <div className="p-16 bg-black flex justify-center">
                <Search />
            </div>

            <div className="p-10 md:px-20">
                <h2 className="font-bold text-4xl">Search Result</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map((item, index) => (
                            <div key={index} className="h-[320px] rounded-xl bg-slate-200 animate-pulse"></div>
                        ))
                    ) : carList.length > 0 ? (
                        carList.map((item, index) => (
                            <div key={index}>
                                <CarItem car={item} />
                            </div>
                        ))
                    ) : showFinalMessage ? (
                        <p className="text-gray-500 text-lg col-span-full">No search results found.</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchByOptions;
