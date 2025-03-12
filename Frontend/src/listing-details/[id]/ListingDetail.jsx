import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/DetailHeader';
import { useParams } from 'react-router-dom';
import apiRequest from '@/lib/apiRequest';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';

const ListingDetail = () => {

    const {id}=useParams();
    const [carDetail,setCarDetail]=useState();

    useEffect(() => {
        GetCarDetail();
    },[]);

    const GetCarDetail = async () => {
        try {
            const response = await apiRequest.get(`/car-listing/get-single-car-listing/${id}`);
            if (response.status !== 200) {
                console.log("Failed to fetch car details.");
            }
            const data = response.data;
            setCarDetail(data);
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
    }

  return (
    <div>
        <Header/>

        <div className="p-10 md:px-20">
            {/* Header Detail Component  */}
            <DetailHeader carDetail={carDetail}/>

            <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                {/* Left  */}
                <div className="md:col-span-2">
                    <ImageGallery carDetail={carDetail}/>
                    <Description carDetail={carDetail} />
                </div>

                {/* Right  */}
                <div className=""></div>
            </div>

        </div>

    </div>
  );
}

export default ListingDetail;