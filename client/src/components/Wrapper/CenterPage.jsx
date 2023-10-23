import React from "react";

// Wrap component that should be in the center of the screen
const CenterWrapper = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CenterWrapper;
