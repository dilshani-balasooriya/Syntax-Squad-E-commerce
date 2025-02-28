import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Category from './components/Category';
import MostSearchedCar from './components/MostSearchedCar';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Category/>
      <MostSearchedCar/>
      <Footer/>
    </div>
  );
}

export default Home;