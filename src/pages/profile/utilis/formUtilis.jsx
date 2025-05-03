import { FaRegUserCircle, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaTools, FaLink, FaFileAlt } from "react-icons/fa";

export const steps = [
    { icon: <FaRegUserCircle className="w-6 h-6" />, title: 'Profile' },
    { icon: <FaMapMarkerAlt className="w-6 h-6" />, title: 'Address' },
    { icon: <FaGraduationCap className="w-6 h-6" />, title: 'Education' },
    { icon: <FaBriefcase className="w-6 h-6" />, title: 'Experience' },
    { icon: <FaTools className="w-6 h-6" />, title: 'Skill' },
    { icon: <FaLink className="w-6 h-6" />, title: 'Links' },
    { icon: <FaFileAlt className="w-6 h-6" />, title: 'Review' },
];

// Profile step validation
export const companyInfoStepValidation = {
    firstName: { required: true, message: "First Name is required" },
    lastName: { required: true, message: "Last Name is required" },
    profileLevel: { required: true, message: "Profile Level is required" },
    dateOfBirth: { required: true, message: "Date of Birth is required" },
    nationality: { required: true, message: "Nationality is required" },
    language: { required: true, message: "Language is required" },
    workCountry: { required: true, message: "Work Country is required" },
    passportNumber: { required: true, message: "Passport Number is required" },
    idNumber: { required: true, message: "ID Number is required" }
};

// Address step validation
export const addressStepValidation = {
    street: { required: true, message: "Street is required" },
    flat: { required: true, message: "Flat/Suite Number is required" },
    city: { required: true, message: "City is required" },
    state: { required: true, message: "State is required" },
    zipcode: { required: true, message: "Zip Code is required" }
};

// Education step validation - checked at component level

// Experience step validation - checked at component level

// Skills step validation - checked at component level

// Links step validation
export const linksStepValidation = {
    linkedin: { required: true, message: "LinkedIn link is required" }
};

export const companyInfoStepInitials = {
    firstName: "",
    lastName: "",
    profileLevel: "",
    dateOfBirth: null,
    nationality: "",
    language: "",
    workCountry: "",
    availabilities: [],
    artifactUrl: '',
    willingToTravel: 0,
    willingToRelocate: 0,
};

export const stepsValidations = [
    companyInfoStepValidation,  // Step 0: Profile
    addressStepValidation,      // Step 1: Address
    null,                       // Step 2: Education (validated in component)
    null,                       // Step 3: Experience (validated in component)
    null,                       // Step 4: Skills (validated in component)
    linksStepValidation,        // Step 5: Links
    null                        // Step 6: Review (no validation needed)
];

export const stepsInitials = [
    companyInfoStepInitials
]; 