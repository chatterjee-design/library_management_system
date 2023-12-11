import React from "react";

const LoaderStatPage = () => {
  return (
    <>
      <div className="w-full h-[78.8vh] flex items-center justify-center">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </>
  );
};

export default LoaderStatPage;
