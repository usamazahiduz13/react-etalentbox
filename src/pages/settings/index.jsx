import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import fetchApi from "../../utils/axios";
import Header from "../../layout/DashBoardNavbar";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const { userInfo, isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      toast.error("Please login to view your profile");
      navigate("/auth/login");
      return;
    }

    const getUserData = async () => {
      try {
        const res = await fetchApi.get(`/Profile?userId=${userInfo.userId}`);
        if (res.data && res.data.success) {
          setUserData(res.data.data);
        } else {
          toast.error("Failed to load profile data");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [isLogin, navigate, userInfo?.userId]);

  // Tab navigation handling
  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "contact", label: "Contact Information" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "links", label: "Social Links" },
  ];

  if (loading) {
    return (
      <div className="bg-[#F9F9F9] min-h-screen">
        <Header />
        <div className="container mx-auto py-10 flex justify-center items-center">
          <div className="animate-pulse text-xl">Loading profile data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <Header />
      <div className="container mx-auto py-8 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-blue-600 h-32 relative">
            {/* Banner area */}
          </div>
          <div className="p-6 relative">
            <div className="absolute top-[-60px] left-8">
              <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center overflow-hidden">
                {userData?.artifactUrl ? (
                  <img src={userData.artifactUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl text-gray-500">{userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}</div>
                )}
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-bold">{userData?.firstName} {userData?.lastName}</h1>
              <p className="text-gray-600">{userData?.profileLevel || "Professional"}</p>
              <p className="text-gray-500">{userData?.overview?.overviewDetail || "No overview available"}</p>
              <p className="text-gray-500 mt-1">{userData?.city}, {userData?.state}, {userData?.workCountry}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="border-b">
            <nav className="flex flex-nowrap overflow-x-auto py-2 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Basic Information */}
            {activeTab === "basic" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm">Full Name</p>
                    <p className="text-gray-800">{userData?.firstName} {userData?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Date of Birth</p>
                    <p className="text-gray-800">{userData?.dateOfBirth ? new Date(userData.dateOfBirth).toLocaleDateString() : "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Nationality</p>
                    <p className="text-gray-800">{userData?.nationality || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Gender</p>
                    <p className="text-gray-800">{userData?.gender || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Language</p>
                    <p className="text-gray-800">{userData?.language || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Work Authorization</p>
                    <p className="text-gray-800">{userData?.workAuthoriztion || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Availability</p>
                    <p className="text-gray-800">{userData?.isAvailable ? "Available" : "Not Available"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Available From</p>
                    <p className="text-gray-800">{userData?.availableOn ? new Date(userData.availableOn).toLocaleDateString() : "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Willing to Relocate</p>
                    <p className="text-gray-800">{userData?.willingToRelocate ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Willing to Travel</p>
                    <p className="text-gray-800">{userData?.willingToTravel ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {activeTab === "contact" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-gray-800">{userData?.user?.email || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone Number</p>
                    <p className="text-gray-800">{userData?.phoneNumber || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Address Line 1</p>
                    <p className="text-gray-800">{userData?.address1 || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Address Line 2</p>
                    <p className="text-gray-800">{userData?.address2 || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">City</p>
                    <p className="text-gray-800">{userData?.city || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">State/Province</p>
                    <p className="text-gray-800">{userData?.state || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Postal Code</p>
                    <p className="text-gray-800">{userData?.postalCode || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Country</p>
                    <p className="text-gray-800">{userData?.workCountry || "Not specified"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                {userData?.educations && userData.educations.length > 0 ? (
                  <div className="space-y-6">
                    {userData.educations.map((edu, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-medium">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.schoolName}</p>
                        <p className="text-gray-500 text-sm">
                          {edu.startDate && new Date(edu.startDate).getFullYear()} - 
                          {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                        </p>
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No education information available</p>
                )}
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                {userData?.experiences && userData.experiences.length > 0 ? (
                  <div className="space-y-6">
                    {userData.experiences.map((exp, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-medium">{exp.jobTitle}</h3>
                        <p className="text-gray-700">{exp.companyName}</p>
                        <p className="text-gray-500 text-sm">
                          {exp.startDate && new Date(exp.startDate).toLocaleDateString()} - 
                          {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                          {exp.location && ` • ${exp.location}`}
                        </p>
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No experience information available</p>
                )}
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Skills</h2>
                {userData?.specialities && userData.specialities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userData.specialities.map((skill, index) => (
                      <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No skills information available</p>
                )}
              </div>
            )}

            {/* Social Links */}
            {activeTab === "links" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Social Links</h2>
                {userData?.socialLinks && userData.socialLinks.length > 0 ? (
                  <div className="space-y-4">
                    {userData.socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <i className={`fa fa-${link.platform.toLowerCase()}`}></i>
                        </div>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.platform}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No social links available</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => navigate("/dashboard/add-details")}
            className="primary-button text-white px-4 py-2 rounded-md transition duration-150 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 