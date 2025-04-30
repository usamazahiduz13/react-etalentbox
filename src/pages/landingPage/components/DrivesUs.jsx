import React from "react";
import {
  FaRegEye,
  FaRegObjectGroup,
  FaUserAlt,
  FaRegCheckCircle,
} from "react-icons/fa";

const DrivesUs = () => {
  return (
    <div className="bg-white md:py-8 py-6 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      <div className="text-center max-w-[1280px] mx-auto">
        <p className="text-gray-500 text-sm mb-4 font-medium">Trusted by 4,000+ companies</p>
        <div className="flex flex-wrap justify-between items-center gap-6 mb-10">
          {[
            "coinbase",
            "spotify",
            "slack",
            "adobe",
            "webflow",
            "zoom",
          ].map((company) => (
            <img
              key={company}
              src={`https://logo.clearbit.com/${company}.com`}
              alt={company}
              className="h-10 object-contain"
            />
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
          What Drives Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-2xl rounded-lg p-6 text-center">
            <FaRegEye className="mx-auto text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Transparency
            </h3>
            <p className="text-gray-500 text-sm">
              Honesty in every listing, no hidden fees.
            </p>
          </div>

          <div className="bg-white shadow-2xl rounded-lg p-6 text-center">
            <FaRegObjectGroup className="mx-auto text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Diversity</h3>
            <p className="text-gray-500 text-sm">
              Inclusive opportunities for everyone
            </p>
          </div>

          <div className="bg-white shadow-2xl rounded-lg p-6 text-center">
            <FaUserAlt className="mx-auto text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              User-Focused
            </h3>
            <p className="text-gray-500 text-sm">
              Tailoring your search to your needs
            </p>
          </div>

          <div className="bg-white shadow-2xl rounded-lg p-6 text-center">
            <FaRegCheckCircle className="mx-auto text-3xl text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Quality</h3>
            <p className="text-gray-500 text-sm">
              Only verified, quality job listings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivesUs;
