import React from 'react';

import { countries } from "../../utilis/helpers";

const AddressStep = ({ formData, onInputChange }) => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
                Address Step
            </h2>

            <div className='space-y-4'>
                {/* Street Field */}
                <div className='space-y-1'>
                    <label htmlFor='street' className='block text-sm font-medium text-gray-700'>
                        Street <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='street'
                        name='street'
                        value={formData.street || ''}
                        onChange={onInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>

                {/* Flat/Suit Field */}
                <div className='space-y-1'>
                    <label htmlFor='flat' className='block text-sm font-medium text-gray-700'>
                        Flat/Suit No. <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='flat'
                        name='flat'
                        value={formData.flat || ''}
                        onChange={onInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>

                {/* City and State Row */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* City Field */}
                    <div className='space-y-1'>
                        <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                            City <span className='text-red-500'>*</span>
                        </label>
                        <select
              id="city"
              name="city"
              value={formData.city?.label || ""}
              onChange={(e) => {
                const selectedCountry = countries.find(
                  (country) => country.label === e.target.value
                ).label;
                onInputChange({
                  target: {
                    name: "city",
                    value: selectedCountry || null,
                  },
                });
              }}
              className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.label} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
                    </div>

                    {/* State Field */}
                    <div className='space-y-1'>
                        <label htmlFor='state' className='block text-sm font-medium text-gray-700'>
                            State <span className='text-red-500'>*</span>
                        </label>
                        <select
              id="workCountry"
              name="workCountry"
              value={formData.state.label || ""}
              onChange={(e) => {
                const selectedCountry = countries.find(
                  (country) => country.label === e.target.value
                ).label;
                onInputChange({
                  target: {
                    name: "state",
                    value: selectedCountry || null,
                  },
                });
              }}
              className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
              required
            >
              <option value="">Select State</option>
              {countries.map((country) => (
                <option key={country.label} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
                    </div>
                </div>

                {/* Zip Code Field */}
                <div className='space-y-1'>
                    <label htmlFor='zipcode' className='block text-sm font-medium text-gray-700'>
                        Zip code <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='zipcode'
                        name='zipcode'
                        value={formData.zipcode || ''}
                        onChange={onInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>
            </div>
        </div>
    )
}

export default AddressStep;