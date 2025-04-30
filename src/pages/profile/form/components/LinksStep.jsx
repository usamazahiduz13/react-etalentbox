import FormikField from '@/components/form/FormikField'
import React from 'react'

const LinksStep = () => {
    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <h2 className='text-2xl font-bold'>
                    Social Links
                </h2>
            </div>

            <hr className="border-gray-200" />

            <div className='space-y-4 mt-4'>
                <FormikField
                    name='Facebook'
                    label='Facebook'
                    isRequired
                />

                <FormikField
                    name='linkdin'
                    label='Linkedin'
                    isRequired
                />

                <FormikField
                    name='Tweeter'
                    label='Tweeter'
                    isRequired
                />

                <FormikField
                    name='instagram'
                    label='Instagram'
                    isRequired
                />

                <div className='flex justify-end space-x-4'>
                    <button 
                        type="button"
                        className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default LinksStep 