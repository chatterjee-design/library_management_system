import React from 'react'
import NavbarOther from '../Components/NavbarOther'
import Footer from '../Components/Footer'

const LayoutOther = ({children, userData}) => {
  return (
    <>
       <NavbarOther userData={userData}/>
       {children}
       <Footer/>
    </>
  )
}

export default LayoutOther
