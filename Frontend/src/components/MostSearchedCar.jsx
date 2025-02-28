import FakeData from '@/Shared/FakeData';
import React from 'react';
import CarItem from './CarItem';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const MostSearchedCar = () => {
  return (
    <div className='mx-24 hidden md:block'>
        <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Cars</h2>
        <Carousel>
            <CarouselContent>
                {FakeData.carList.map((car, index) => (
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