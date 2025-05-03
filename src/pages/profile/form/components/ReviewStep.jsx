import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import AvatarImg from "../../../../assets/imgs/avatar-1.jpg";

const ReviewStep = () => {
  const { profile, experiences, education, specialities } = useSelector(state => state.user);

  // Format date or return empty string if null
  const formatDate = (date) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="md:px-8 px-4 py-6 space-y-8">
      <div className="bg-blue-50 p-4 mb-6 text-blue-700 rounded-lg">
        <p className="font-medium">Review your information carefully before submitting</p>
        <p className="text-sm mt-1">Once you click "Save Profile", your profile will be created.</p>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800">Review Your Profile</h2>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={profile.artifactUrl || AvatarImg}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Profile Picture</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{profile.firstName} {profile.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{formatDate(profile.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nationality</p>
            <p className="font-medium">{profile.nationality}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Language</p>
            <p className="font-medium">{profile.language}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Work Country</p>
            <p className="font-medium">{profile.workCountry}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Profile Level</p>
            <p className="font-medium">{profile.profileLevel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Passport Number</p>
            <p className="font-medium">{profile.passportNumber || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ID Number</p>
            <p className="font-medium">{profile.idNumber || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Resume & LinkedIn Profile */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Documents & Profiles</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Resume</p>
            <p className="font-medium">{profile.resume ? 'Uploaded' : 'Not uploaded'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">LinkedIn Profile</p>
            <p className="font-medium">{profile.linkedinProfile ? 'Uploaded' : 'Not uploaded'}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Address Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Street</p>
            <p className="font-medium">{profile.street || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Flat/Suite</p>
            <p className="font-medium">{profile.flat || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="font-medium">{profile.city || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">State/Province</p>
            <p className="font-medium">{profile.state || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Postal Code</p>
            <p className="font-medium">{profile.zipcode || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium">{profile.phoneNumber || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Education</h3>
        {education && education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <p className="font-semibold">{edu.degree || 'Degree'}</p>
                <p className="text-sm">{edu.institution || 'Institution'}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No education information provided</p>
        )}
      </div>

      {/* Experience */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Work Experience</h3>
        {experiences && experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary pl-4">
                <p className="font-semibold">{exp.title || 'Position'}</p>
                <p className="text-sm">{exp.company || 'Company'} {(exp.city || exp.country) ? `- ${[exp.city, exp.country].filter(Boolean).join(', ')}` : ''}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                </p>
                <p className="text-sm mt-1">{exp.description || 'No description provided'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No experience information provided</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Skills</h3>
        {specialities && specialities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {specialities.map((skill, index) => (
              <span key={index} className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No skills provided</p>
        )}
      </div>

      {/* Social Links */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Social Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {profile.linkedin && (
            <div>
              <p className="text-sm text-gray-500">LinkedIn</p>
              <p className="font-medium truncate">{profile.linkedin}</p>
            </div>
          )}
          {profile.facebook && (
            <div>
              <p className="text-sm text-gray-500">Facebook</p>
              <p className="font-medium truncate">{profile.facebook}</p>
            </div>
          )}
          {profile.twitter && (
            <div>
              <p className="text-sm text-gray-500">Twitter</p>
              <p className="font-medium truncate">{profile.twitter}</p>
            </div>
          )}
          {profile.instagram && (
            <div>
              <p className="text-sm text-gray-500">Instagram</p>
              <p className="font-medium truncate">{profile.instagram}</p>
            </div>
          )}
          {!profile.linkedin && !profile.facebook && !profile.twitter && !profile.instagram && (
            <p className="text-gray-500 italic">No social links provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep; 