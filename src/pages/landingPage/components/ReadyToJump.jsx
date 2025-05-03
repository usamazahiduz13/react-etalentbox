import React from "react";
import heroImg from "../../../assets/imgs/landingpage/ready-to.png"; // Replace with your actual image path
import { Link } from "react-router-dom";

const ReadyToJump = () => {
  return (
    <div className="relative bg-blue-800 text-white w-full">
      <div className="max-w-[1280px] mx-auto py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between overflow-hidden ">
      {/* Left Side */}
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          Ready to jump-start your career? Don't wait any longer
        </h2>
        <p className="text-sm text-blue-200 mb-6">
          Click the button below to explore thousands of job listings.
        </p>
        <Link to='/find-jobs' className="bg-white text-blue-800 font-semibold py-2 px-6 rounded-[16px] shadow hover:bg-blue-100 transition">
          Find Your Dream Job Now
        </Link>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 relative">
        <div className="relative rounded-xl overflow-hidden z-10 shadow-lg">
          <img
            src={heroImg}
            alt="Interview"
            className="w-full h-auto max-h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* Top Circle */}
        <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-white rounded-full z-20" />

        {/* Bottom Left Circle */}
        <div className="absolute bottom-[-12px] left-4 w-10 h-10 border-4 border-white rounded-full z-20" />

        {/* Background circles & dots */}
        <div className="absolute top-4 right-4 w-28 h-28 rounded-full border-4 border-blue-600 opacity-30" />
        <div className="absolute right-4 bottom-4 grid grid-cols-4 gap-2">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-white rounded-full opacity-80"
            />
          ))}
        </div>
      </div>

      {/* Bottom wave (optional background shape) */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-white rounded-t-[100%]" />
      </div>
    </div>
  );
};

export default ReadyToJump;
