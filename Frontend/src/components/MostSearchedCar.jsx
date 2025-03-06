import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import apiRequest from '@/lib/apiRequest';

const MostSearchedCar = () => {

    const [carListings, setCarListings] = useState([]);

    const GetPopularCarList = async () => {
        const response = await apiRequest.get("/car-listing/get-all-listing");
        setCarListings(response.data);
    }

    useEffect(()=>{
        GetPopularCarList();
    },[]);

  return (
    <div className='mx-24 hidden md:block'>
        <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Cars</h2>
        <Carousel>
            <CarouselContent>
                {carListings.map((car, index) => (
                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <CarItem car={car} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  );
}

export default MostSearchedCar;