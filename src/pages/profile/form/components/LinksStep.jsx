import React from 'react'

const LinksStep = ({ formData, onInputChange }) => {
    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <h2 className='text-2xl font-bold'>
                    Social Links
                </h2>
            </div>

            <hr className="border-gray-200" />

            <div className='space-y-4 mt-4'>
                <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                        Facebook <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={formData.facebook || ''}
                        onChange={onInputChange}
                       className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin || ''}
                        onChange={onInputChange}
                        className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                        Twitter <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter || ''}
                        onChange={onInputChange}
                        className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                        Instagram <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram || ''}
                        onChange={onInputChange}
                        className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                        required
                    />
                </div>

               
            </div>
        </>
    )
}

export default LinksStep 