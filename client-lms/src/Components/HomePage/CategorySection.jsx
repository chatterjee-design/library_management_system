import React from "react";
import { carouselData } from "../../Constants/CouselData";
import Carousel from "./Carousel";


const CategorySection = () => {
  return (
    <>
    <div className="flex items-center justify-center mt-6 ">
    <label className=" text-4xl font-bold font-serif tracking-[0.2em]">CATAGORIES</label>
    </div>
      <section className="carousel carousel-end rounded-box w-[100vw] gap-16 px-16 py-14">
       {carouselData && carouselData.map(data=>(<Carousel 
       {...data} 
       key={data.id}
       
       />))}
        
      </section>
    </>
  );
};

export default CategorySection;
