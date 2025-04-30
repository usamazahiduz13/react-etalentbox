import React from 'react';

const AddressStep = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>
                Address Step
            </h2>

            <form className='space-y-4'>
                {/* Street Field */}
                <div className='space-y-1'>
                    <label htmlFor='street' className='block text-sm font-medium text-gray-700'>
                        Street <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        id='street'
                        name='street'
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
                            id='city'
                            name='city'
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-no-repeat bg-right-0.5 bg-center bg-[length:1em]'
                            required
                        >
                            <option value=''>Select City</option>
                            {/* Add your city options here */}
                        </select>
                    </div>

                    {/* State Field */}
                    <div className='space-y-1'>
                        <label htmlFor='state' className='block text-sm font-medium text-gray-700'>
                            State <span className='text-red-500'>*</span>
                        </label>
                        <select
                            id='state'
                            name='state'
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-no-repeat bg-right-0.5 bg-center bg-[length:1em]'
                            required
                        >
                            <option value=''>Select State</option>
                            {/* Add your state options here */}
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
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                    />
                </div>
            </form>
        </div>
    )
}

export default AddressStep;