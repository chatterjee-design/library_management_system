import React from "react";
import Layout from "../Layout/Layout";
import HeroSection from "../Components/HomePage/HeroSection";
import CategorySection from "../Components/HomePage/CategorySection";
import Account from "../Components/HomePage/Account";
import OurMission from "../Components/HomePage/OurMission";


const HomePage = () => {
  return (
    <Layout>
      <HeroSection/>
      <Account/>
      <CategorySection/>
      <OurMission/>
    </Layout>
  );
};

export default HomePage;
