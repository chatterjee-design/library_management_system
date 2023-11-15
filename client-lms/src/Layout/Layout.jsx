import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = ({children}) => {
  return (
    <>
      {children}
      <Navbar/>
      <Footer/>
    </>
  );
};

export default Layout;
