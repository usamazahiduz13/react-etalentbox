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

export const companyInfoStepValidation = {
    firstName: { required: true, message: "First Name is required" },
    lastName: { required: true, message: "Last Name is required" },
    profileLevel: { required: true, message: "Profile Level is required" },
    dateOfBirth: { required: true, message: "Date of Birth is required" },
    nationality: { required: true, message: "Nationality is required" },
    language: { required: true, message: "Language is required" },
    workCountry: { required: true, message: "Work Country is required" }
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
    companyInfoStepValidation
];

export const stepsInitials = [
    companyInfoStepInitials
]; 