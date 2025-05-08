import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import StepperFormSteps from "./StepperFormSteps";
import CompanyInfoStep from "./CompanyInfoStep";
import AddressStep from "./AddressStep";
import ExperienceStep from "./ExperienceStep";
import LinksStep from "./LinksStep";
import SkillsStep from "./SkillsStep";
import EducationStep from "./EducationStep";
import ReviewStep from "./ReviewStep";
import {
  createUserProfile,
  updateProfileData,
  setCurrentStep,
  nextStep,
  prevStep,
  addExperience,
  addSpeciality,
  updateOverview,
} from "../../../../Redux/user-slice";
import { stepsValidations } from "../../utilis/formUtilis";
import fetchApi from "../../../../utils/axios";

const StepperForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    profile,
    loading: profileLoading,
    currentStep,
  } = useSelector((state) => state.user);
  const { userInfo, isLogin } = useSelector((state) => state.auth);
  const [formErrors, setFormErrors] = useState({});

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLogin) {
      toast.error("Please login to create a profile");
      //navigate('/auth/login')
    }
  }, [isLogin, navigate]);

  // Set userId in profile data when component mounts
  useEffect(() => {
    if (userInfo?.userId) {
      dispatch(
        updateProfileData({
          userId: userInfo.userId,
          id: 0,
        })
      );
    }
  }, [userInfo, dispatch]);

  // Validate current step
  const validateStep = (step) => {
    if (!stepsValidations[step]) return true;

    const validationRules = stepsValidations[step];
    const errors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      if (rule.required && !profile[field]) {
        errors[field] = rule.message;
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  // Handle next button click
  const handleNext = async () => {
    if (validateStep(currentStep)) {
      // Handle special case for Social Links step
      if (currentStep === 5) {
        // If window.saveLinks exists (exposed by LinksStep), call it
        if (window.saveLinks && typeof window.saveLinks === 'function') {
          const success = await window.saveLinks();
          if (!success) {
            toast.error("Please fill all required fields and try again");
            return;
          }
        }
      }
      
      // Only make API call on final step (Review page)
      if (currentStep === 6) {
        try {
          if (!userInfo?.userId) {
            toast.error("User ID not found. Please login again.");
            navigate("/auth/login");
            return;
          }

          // Update profile with userId from userInfo before submission
          dispatch(
            updateProfileData({
              userId: userInfo.userId,
              id: 0,
              isUpdate: false,
              isPortfolioPrivate: false,
              user: null,
            })
          );

          // Dispatch create profile action with complete profile data
          await dispatch(
            createUserProfile({
              ...profile,
              userId: userInfo.userId,
              id: 0,
              // Make sure these fields match the API schema exactly
              workAuthoriztion: profile.workAuthoriztion || "", // Note: API might expect "workAuthorization" instead
              isUpdate: false,
              isPortfolioPrivate: false,
              status: profile.status || "",
              specialities: [],
              availabilities: [],
              // No need to specify experiences as empty array as we get them from Redux state
            })
          );

          toast.success("Profile created successfully");
          // Navigate to profile view or dashboard after successful creation
          navigate("/profile");
        } catch (error) {
          toast.error("Failed to save profile");
          console.error("Profile submission error:", error);

          // Redirect to login if user is not authenticated
          if (error.message === "User not authenticated") {
            navigate("/auth/login");
          }
        }
      } else {
        // Just move to the next step, store data in Redux
        dispatch(nextStep());
        toast.success("Step completed successfully");
      }
    } else {
      toast.error("Please fill all required fields");
    }
  };

  // Handle back button click
  const handleBack = () => {
    dispatch(prevStep());
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateProfileData({ [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    dispatch(updateProfileData({ [name]: checked }));
  };

  // Handle date changes
  const handleDateChange = (name, date) => {
    dispatch(updateProfileData({ [name]: date }));
  };

  // Handle file upload
  const handleFileUpload = (file, fieldName) => {
    // File handling logic
    dispatch(updateProfileData({ [fieldName]: file }));
  };

  const getProfileData = async () => {
    if (!userInfo.userId) return;
    try {
      const res = await fetchApi.get(`/Profile?userId=${userInfo.userId}`);
      if (res.data && res.data.success) {
        // Extract the profile data from the response
        console.log(res.data.data);
        const profileData = res.data.data;
        
        // Update Redux store with profile data
        dispatch(updateProfileData({
          id: profileData.id,
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          dateOfBirth: profileData.dateOfBirth          || null,
          nationality: profileData.nationality || '',
          language: profileData.language || '',
          workCountry: profileData.workCountry || '',
          cnic: profileData.cnic || '',
          address1: profileData.address1 || '',
          address2: profileData.address2 || '',
          city: profileData.city || '',
          state: profileData.state || '',
          postalCode: profileData.postalCode || '',
          phoneNumber: profileData.phoneNumber || '',
          race: profileData.race || '',
          gender: profileData.gender || '',
          veteran: profileData.veteran || '',
          lastFourDigitOfSsn: profileData.lastFourDigitOfSsn || '',
          passportNumber: profileData.passportNumber || '',
          workAuthoriztion: profileData.workAuthoriztion || '',
          willingToRelocate: profileData.willingToRelocate || false,
          willingToTravel: profileData.willingToTravel || false,
          idNumber: profileData.idNumber || '',
          profileLevel: profileData.profileLevel || '',
          availableOn: profileData.availableOn || null,
          isAvailable: profileData.isAvailable || false,
          userId: profileData.userId,
          artifactUrl: profileData.artifactUrl || '',
          isUpdate: profileData.isUpdate || false,
          isPortfolioPrivate: profileData.isPortfolioPrivate || false,
          status: profileData.status || '',
          user: profileData.user || null
        }));
        
        // Handle experiences if they exist
        if (profileData.experiences && Array.isArray(profileData.experiences)) {
          profileData.experiences.forEach(exp => {
            dispatch(addExperience(exp));
          });
        }
        
        // Handle specialities if they exist
        if (profileData.specialities && Array.isArray(profileData.specialities)) {
          profileData.specialities.forEach(spec => {
            dispatch(addSpeciality(spec));
          });
        }
        
        // Handle overview if it exists
        if (profileData.overview) {
          dispatch(updateOverview(profileData.overview.overviewDetail || ''));
        }
        
        toast.success("Profile data loaded successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  // Show loading spinner when profile is loading
  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="w-full flex md:flex-row flex-col items-start justify-center h-full">
        <div className="md:w-[25%] w-full h-full md:border-r border-gray-200">
          <StepperFormSteps
            step={currentStep}
            setStep={(step) => dispatch(setCurrentStep(step))}
          />
        </div>

        <div className="md:w-[75%] w-full bg-white p-4 md:p-6 flex flex-col justify-between h-full">
          <div className="flex-grow">
            {currentStep === 0 && (
              <CompanyInfoStep
                formData={profile}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                onDateChange={handleDateChange}
                errors={formErrors}
              />
            )}

            {currentStep === 1 && (
              <AddressStep
                formData={profile}
                onInputChange={handleInputChange}
                errors={formErrors}
              />
            )}

            {currentStep === 2 && (
              <EducationStep formData={profile} errors={formErrors} />
            )}

            {currentStep === 3 && (
              <ExperienceStep formData={profile} errors={formErrors} />
            )}

            {currentStep === 4 && (
              <SkillsStep formData={profile} errors={formErrors} />
            )}

            {currentStep === 5 && (
              <LinksStep
                formData={profile}
                onInputChange={handleInputChange}
                errors={formErrors}
              />
            )}

            {currentStep === 6 && <ReviewStep formData={profile} />}
          </div>
          <div className="flex justify-between mt-6 mb-2 w-full">
            <button
              type="button"
              className="px-4 md:px-6 py-2 border border-primary text-primary rounded-[16px] hover:bg-gray-50 transition-all disabled:opacity-50"
              onClick={handleBack}
              disabled={currentStep === 0 || profileLoading}
            >
              Back
            </button>

            <button
              type="button"
              className="primary-button px-4 md:px-6 py-2"
              onClick={handleNext}
              disabled={profileLoading}
            >
              {profileLoading
                ? "Loading..."
                : currentStep === 6
                ? "Save Profile"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
