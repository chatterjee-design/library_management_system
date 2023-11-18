import React from "react";
import Layout from "../Layout/Layout";
import HeroSection from "../Components/HomePage/HeroSection";
import CategorySection from "../Components/HomePage/CategorySection";
import Account from "../Components/HomePage/Account";


const HomePage = () => {
  return (
    <Layout>
      <HeroSection/>
      <Account/>
      <CategorySection/>
    </Layout>
  );
};

export default HomePage;
