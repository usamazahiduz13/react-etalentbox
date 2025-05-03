import React from 'react';

import { countries } from "../../utilis/helpers";

const AddressStep = ({ formData, onInputChange, errors = {} }) => {
    return (
        <div className="md:px-8 px-4 py-6">
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
                Address Information
            </h2>

            <div className='bg-blue-50 p-4 mb-6 text-blue-700 rounded-lg'>
                Please fill all required fields to continue
            </div>

            <div className='space-y-6'>
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
                        className={`mt-1 block w-full rounded-lg py-2.5 px-4 border ${
                            errors.street ? 'border-red-500' : 'border-[#D8D8D8]'
                        } shadow-sm focus:border-blue-500 outline-blue-500`}
                        required
                    />
                    {errors.street && (
                        <p className="mt-1 text-sm text-red-500">{errors.street}</p>
                    )}
                </div>

                {/* Flat/Suit Field */}
                <div className='space-y-1'>
                    <label htmlFor='flat' className='block text-sm font-medium text-gray-700'>
                        Flat/Suite No. <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='flat'
                        name='flat'
                        value={formData.flat || ''}
                        onChange={onInputChange}
                        className={`mt-1 block w-full rounded-lg py-2.5 px-4 border ${
                            errors.flat ? 'border-red-500' : 'border-[#D8D8D8]'
                        } shadow-sm focus:border-blue-500 outline-blue-500`}
                        required
                    />
                    {errors.flat && (
                        <p className="mt-1 text-sm text-red-500">{errors.flat}</p>
                    )}
                </div>

                {/* City and State Row */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* City Field */}
                    <div className='space-y-1'>
                        <label htmlFor='city' className='block text-sm font-medium text-gray-700'>
                            City <span className='text-red-500'>*</span>
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city || ""}
                            onChange={(e) => {
                                onInputChange({
                                    target: {
                                        name: "city",
                                        value: e.target.value,
                                    },
                                });
                            }}
                            className={`mt-1 block w-full rounded-lg py-2.5 px-4 border ${
                                errors.city ? 'border-red-500' : 'border-[#D8D8D8]'
                            } shadow-sm focus:border-blue-500 outline-blue-500`}
                            required
                        >
                            <option value="">Select City</option>
                            {countries.map((country) => (
                                <option key={country.label} value={country.label}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                        )}
                    </div>

                    {/* State Field */}
                    <div className='space-y-1'>
                        <label htmlFor='state' className='block text-sm font-medium text-gray-700'>
                            State <span className='text-red-500'>*</span>
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={formData.state || ""}
                            onChange={(e) => {
                                onInputChange({
                                    target: {
                                        name: "state",
                                        value: e.target.value,
                                    },
                                });
                            }}
                            className={`mt-1 block w-full rounded-lg py-2.5 px-4 border ${
                                errors.state ? 'border-red-500' : 'border-[#D8D8D8]'
                            } shadow-sm focus:border-blue-500 outline-blue-500`}
                            required
                        >
                            <option value="">Select State</option>
                            {countries.map((country) => (
                                <option key={country.label} value={country.label}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                        )}
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
                        className={`mt-1 block w-full rounded-lg py-2.5 px-4 border ${
                            errors.zipcode ? 'border-red-500' : 'border-[#D8D8D8]'
                        } shadow-sm focus:border-blue-500 outline-blue-500`}
                        required
                    />
                    {errors.zipcode && (
                        <p className="mt-1 text-sm text-red-500">{errors.zipcode}</p>
                    )}
                </div>

                {/* Phone Number Field */}
                <div className='space-y-1'>
                    <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>
                        Phone Number
                    </label>
                    <input
                        type='tel'
                        id='phoneNumber'
                        name='phoneNumber'
                        value={formData.phoneNumber || ''}
                        onChange={onInputChange}
                        className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default AddressStep;