import React from 'react'
import EducationFormModal from './EducationFormModal'

const EducationStep = () => {
    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <h2 className='text-2xl font-bold'>
                    Education
                </h2>

                <EducationFormModal />
            </div>

            <hr className="border-gray-200" />

            <div className='px-6 pt-2'>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>
                            National University of Sciences & Technology (NUST)
                        </h3>

                        <div className='flex space-x-2'>
                            <button className="p-2 text-gray-600 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p className='text-sm'>
                        https://nust.edu.pk/
                    </p>
                    <p className='text-sm text-gray-600'>
                        BSCS, Computer Science
                    </p>
                    <p className='text-sm text-gray-600'>
                        Jan 2019-Jan 2021
                    </p>
                    <p className='text-sm text-gray-600'>
                        3.89
                    </p>
                    <p className='text-sm text-gray-600'>
                        Islamabad, Pakistan
                    </p>

                    <hr className="my-4 border-gray-200" />
                </div>
            </div>
        </>
    )
}

export default EducationStep 