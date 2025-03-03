import React from 'react';
import Category from '@/components/Category';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import InfoSection from '@/components/InfoSection';
import MostSearchedCar from '@/components/MostSearchedCar';

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Category/>
      <MostSearchedCar/>
      <InfoSection/>
      <Footer/>
    </div>
  );
}

export default Home;