import React from "react";
import LayoutOther from "../../Layout/LayoutOther";

const Loader1 = () => {
  return (
    <>
     <div className="w-screen flex gap-12 flex-wrap min-h-[78.7vh] items-center justify-center">
     <div className="skeleton w-72 h-80"></div>
     <div className="skeleton w-72 h-80"></div>
     <div className="skeleton w-72 h-80"></div>
     <div className="skeleton w-72 h-80"></div>
     <div className="skeleton w-72 h-80"></div>
     <div className="skeleton w-72 h-80"></div>
     </div>
    </>
  );
};

export default Loader1;
