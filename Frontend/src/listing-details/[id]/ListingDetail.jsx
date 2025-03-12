import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/DetailHeader';
import { useParams } from 'react-router-dom';
import apiRequest from '@/lib/apiRequest';

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
        </div>

    </div>
  );
}

export default ListingDetail;