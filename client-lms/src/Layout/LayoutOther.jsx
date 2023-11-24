import React from "react";
import NavbarOther from "../Components/NavbarOther";
import Footer from "../Components/Footer";

const LayoutOther = ({ children }) => {
  return (
    <>
      <NavbarOther />
      {children}
      <Footer />
    </>
  );
};

export default LayoutOther;
