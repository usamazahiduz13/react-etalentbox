import CommonModal from '@/components/common/CommonModal';
import FormikField from '@/components/form/FormikField';
import FormikWrapper from '@/components/form/FormikWrapper';
import { useState } from 'react'

const SoftSkillsPopup = () => {
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

            <CommonModal isOpen={isModalOpen} toggle={() => setModalStatus(false)} title='Soft Skill' minWidth='400px'>
                <div className="min-w-[400px]">
                    <FormikWrapper formInitials={{}} submitFunc={() => { }}>
                        <div className="space-y-4">
                            <FormikField
                                name='Skill'
                                label='Skill'
                                isRequired
                            />

                            <div className="flex justify-end space-x-4">
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
                        </div>
                    </FormikWrapper>
                </div>
            </CommonModal>
        </>
    )
}

export default SoftSkillsPopup 