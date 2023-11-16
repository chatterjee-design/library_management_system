import React from "react";
import Layout from "../Layout/Layout";
import HeroSection from "../Components/HomePage/HeroSection";
import CategorySection from "../Components/HomePage/CategorySection";


const HomePage = () => {
  return (
    <Layout>
      <HeroSection/>
      <CategorySection/>
    </Layout>
  );
};

export default HomePage;
