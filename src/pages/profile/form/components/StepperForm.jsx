import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import StepperFormSteps from './StepperFormSteps'
import CompanyInfoStep from './CompanyInfoStep'
import AddressStep from './AddressStep'
import ExperienceStep from './ExperienceStep'
import LinksStep from './LinksStep'
import SkillsStep from './SkillsStep'
import EducationStep from './EducationStep'
import ReviewStep from './ReviewStep'
import { createUserProfile, updateUserProfile, fetchUserProfile, updateProfileData, setCurrentStep, nextStep, prevStep } from '../../../../Redux/user-slice'
import { stepsValidations } from '../../utilis/formUtilis'
import { createProfile } from '../../../../services/profile'

const StepperForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profile, loading: profileLoading, currentStep } = useSelector(state => state.user)
    const { userId, isAuthenticated, isNewUser } = useSelector(state => state.auth)
    const [formErrors, setFormErrors] = useState({})
    
    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error('Please login to create a profile')
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    // Validate current step
    const validateStep = (step) => {
        if (!stepsValidations[step]) return true

        const validationRules = stepsValidations[step]
        const errors = {}
        let isValid = true

        Object.keys(validationRules).forEach(field => {
            const rule = validationRules[field]
            if (rule.required && !profile[field]) {
                errors[field] = rule.message
                isValid = false
            }
        })

        setFormErrors(errors)
        return isValid
    }

    // Handle next button click
    const handleNext = async () => {
        if (validateStep(currentStep)) {
            if (currentStep === 0) {
                // Make API call after first step validation
                try {
                    if (!userId) {
                        toast.error('User ID not found. Please login again.')
                        navigate('/login')
                        return
                    }

                    // Make API call to create/update profile
                    await createProfile(profile)
                    
                    toast.success('Profile saved successfully')
                    dispatch(nextStep())
                } catch (error) {
                    toast.error('Failed to save profile')
                    console.error('Profile submission error:', error)
                    
                    // Redirect to login if user is not authenticated
                    if (error.message === 'User not authenticated') {
                        navigate('/login')
                    }
                }
            } else {
                dispatch(nextStep())
            }
        } else {
            toast.error('Please fill all required fields')
        }
    }

    // Handle back button click
    const handleBack = () => {
        dispatch(prevStep())
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        dispatch(updateProfileData({ [name]: value }))
    }

    // Handle checkbox changes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target
        dispatch(updateProfileData({ [name]: checked }))
    }

    // Handle date changes
    const handleDateChange = (name, date) => {
        dispatch(updateProfileData({ [name]: date }))
    }

    // Handle file upload
    const handleFileUpload = (file, fieldName) => {
        // File handling logic
        dispatch(updateProfileData({ [fieldName]: file }))
    }

    // Show loading spinner when profile is loading
    if (profileLoading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    return (
        <form onSubmit={handleNext}>
            <div className="w-full flex md:flex-row flex-col items-start justify-center gap-6 h-full">
                <div className="md:w-[35%] w-full h-full">
                    <StepperFormSteps currentStep={currentStep} setStep={(step) => dispatch(setCurrentStep(step))} />
                </div>

                <div className="md:w-[65%] w-full bg-white p-6 ">
                    {currentStep === 0 && 
                        <CompanyInfoStep 
                            formData={profile} 
                            onInputChange={handleInputChange}
                            onCheckboxChange={handleCheckboxChange}
                            onDateChange={handleDateChange}
                            errors={formErrors}
                        />
                    }
                    
                    {currentStep === 1 && 
                        <AddressStep 
                            formData={profile} 
                            onInputChange={handleInputChange}
                            errors={formErrors}
                        />
                    }
                    
                    {currentStep === 2 && 
                        <EducationStep 
                            formData={profile}
                            errors={formErrors}
                        />
                    }
                    
                    {currentStep === 3 && 
                        <ExperienceStep 
                            formData={profile}
                            errors={formErrors}
                        />
                    }
                    
                    {currentStep === 4 && 
                        <SkillsStep 
                            formData={profile}
                            errors={formErrors}
                        />
                    }
                    
                    {currentStep === 5 && 
                        <LinksStep 
                            formData={profile} 
                            onInputChange={handleInputChange}
                            errors={formErrors}
                        />
                    }
                    
                    {currentStep === 6 && 
                        <ReviewStep 
                            formData={profile}
                        />
                    }

                    <div className="flex justify-between mt-8 mb-4 md:px-8 px-4">
                        <button 
                            type="button"
                            className="px-6 py-2 border border-primary text-primary rounded-[16px] hover:bg-gray-50 transition-all disabled:opacity-50"
                            onClick={handleBack}
                            disabled={currentStep === 0 || profileLoading}
                        >
                            Back
                        </button>
                        
                        {currentStep < 6 ? (
                            <button 
                                type="button"
                                className="primary-button"
                                onClick={handleNext}
                                disabled={profileLoading}
                            >
                                {profileLoading ? 'Loading...' : 'Next'}
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                className="primary-button"
                                disabled={profileLoading}
                            >
                                {profileLoading ? 'Saving...' : 'Save Profile'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default StepperForm 