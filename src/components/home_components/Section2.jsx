import React from 'react';

export default function Section2() {
  return (
    <div className="py-20 bg-white">
      {/* Section Container */}
      <div className="md:max-w-[90%] xl:max-w-[60%] max-w-[97%] mx-auto flex flex-wrap md:gap-10 gap-5 flex-col sm:flex-row justify-around">
        {/* Vision Card */}
        <div className="bg-white text-gray-800 text-center shadow-lg rounded-lg p-6 md:p-7 flex-1 hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
          <div className="w-16 h-16 p-1 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            {/* <i className="fas fa-eye text-2xl"></i> */}
            <img src="/mission.png" alt="" />
          </div>
          <h1 className="font-bold text-2xl mb-4">Our Vision</h1>
          <p className="text-gray-600 leading-relaxed">
            To create a robust avenue where all digital needs will get a perfect solution at your fingertips around the world.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white text-gray-800 text-center shadow-lg rounded-lg p-6 md:p-7 flex-1 hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
          <div className="w-16 h-16 p-1 cl1 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/vision.png" alt="" />
          </div>
          <h1 className="font-bold text-2xl mb-4">Our Mission</h1>
          <p className="text-gray-600 leading-relaxed">
            To provide all telecommunication services that are globally accessible with a high rate of confidence and reliability.
          </p>
        </div>
      </div>
    </div>
  );
}