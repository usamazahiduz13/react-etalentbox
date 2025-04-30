import { Form, Formik } from 'formik'
import { useState } from 'react'
import StepperFormSteps from './StepperFormSteps';
import CompanyInfoStep from './CompanyInfoStep';
import AddressStep from './AddressStep';
import ExperienceStep from './ExperienceStep';
import LinksStep from './LinksStep';
import SkillsStep from './SkillsStep';
import EducationStep from './EducationStep';
import { stepsInitials, stepsValidations } from '../../utilis/formUtilis';
import { useCreateProfileMutation } from '@/services/public/profile';

const StepperForm = () => {
    const [step, setStep] = useState(0);

    const [createProfileMutation] = useCreateProfileMutation();

    // handlers
    const handleSubmit = async (values) => {
        const userId = localStorage.getItem('userId')
        await createProfileMutation({...values, userId});
    }

    return (
        <Formik initialValues={stepsInitials[step]} validationSchema={stepsValidations[step]} onSubmit={handleSubmit}>
            {() => (
                <Form>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-3 min-h-[85vh]">
                            <StepperFormSteps step={step} />
                        </div>

                        <div className="col-span-12 md:col-span-9 p-4">
                            {step === 0 && <CompanyInfoStep />}
                            {step === 1 && <AddressStep />}
                            {step === 2 && <EducationStep />}
                            {step === 3 && <ExperienceStep />}
                            {step === 4 && <SkillsStep />}
                            {step === 5 && <LinksStep />}

                            <div className="flex justify-between mt-8">
                                <button 
                                    type="button"
                                    className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-gray-50"
                                    onClick={() => {
                                        if (step > 0) {
                                            setStep(prev => prev - 1)
                                        }
                                    }}
                                >
                                    Back
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default StepperForm 