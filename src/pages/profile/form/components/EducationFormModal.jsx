import CommonModal from '@/components/common/CommonModal';
import FormikCheckbox from '@/components/form/FormikCheckbox';
import FormikDatePicker from '@/components/form/FormikDatepicker';
import FormikField from '@/components/form/FormikField';
import FormikWrapper from '@/components/form/FormikWrapper';
import { useState } from 'react'

const EducationFormModal = () => {
    const [isModalOpen, setModalStatus] = useState(false);

    return (
        <>
            <button 
                className="p-2 text-primary hover:bg-gray-100 rounded-full"
                onClick={() => setModalStatus(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>

            <CommonModal isOpen={isModalOpen} toggle={() => setModalStatus(false)} title='Add Education'>
                <div className="w-full">
                    <FormikWrapper formInitials={{}} submitFunc={() => { }}>
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <FormikField
                                        name='university'
                                        label='University'
                                        isRequired
                                    />

                                    <FormikField
                                        name='degree'
                                        label='Degree'
                                        isRequired
                                    />

                                    <FormikDatePicker
                                        name='start_date'
                                        label='Start Date'
                                        isRequired
                                    />
                                </div>
                                <div className="space-y-4">
                                    <FormikField
                                        name='university'
                                        label='School / University URL'
                                        isRequired
                                    />

                                    <FormikField
                                        name='study'
                                        label='Field of study'
                                        isRequired
                                    />

                                    <FormikDatePicker
                                        name='end_date'
                                        label='End Date'
                                        isRequired
                                    />
                                </div>
                            </div>
                            
                            <div className="my-6">
                                <FormikCheckbox
                                    name='enrolled'
                                    label='Currently Enrolled'
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <FormikField
                                        name='grade'
                                        label='Grade/CGPA'
                                        isRequired
                                    />

                                    <FormikField
                                        name='city'
                                        label='City'
                                        isRequired
                                    />

                                    <FormikDatePicker
                                        name='country'
                                        label='Country'
                                        isRequired
                                    />
                                </div>
                                <div className="space-y-4">
                                    <FormikField
                                        name='province'
                                        label='Province/State'
                                        isRequired
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-6">
                                <button 
                                    type="button"
                                    className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                                >
                                    Add
                                </button>
                            </div>
                        </>
                    </FormikWrapper>
                </div>
            </CommonModal>
        </>
    )
}

export default EducationFormModal 