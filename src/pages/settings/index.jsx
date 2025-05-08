import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import fetchApi from "../../utils/axios";
import Header from "../../layout/DashBoardNavbar";

// Component imports
import ProfileHeader from "./components/ProfileHeader";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import PortfolioSection from "./components/PortfolioSection";
import AdditionalDetails from "./components/AdditionalDetails";

// Modal imports
import ExperienceModal from "../profile/form/components/ExperienceModal";
import EducationModal from "../profile/form/components/EducationModal";
import SkillModal from "../profile/form/components/SkillModal";
import PortfolioModal from "../profile/form/components/PortfolioModal";
import AboutModal from "./components/AboutModal";
import ProfileInfoModal from "./components/ProfileInfoModal";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo, isLogin } = useSelector((state) => state.auth);
  const [portfolios, setPortfolios] = useState([])
  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])
  const [softSkills, setSoftSkills] = useState([])
  const [technicalSkills, setTechnicalSkills] = useState([])
  const [overview, setOverview] = useState([])
  const navigate = useNavigate();

  // Modal states
  const [experienceModal, setExperienceModal] = useState({ isOpen: false, data: null, index: -1 });
  const [educationModal, setEducationModal] = useState({ isOpen: false, data: null, index: -1 });
  const [skillModal, setSkillModal] = useState({ isOpen: false, type: 'technical' });
  const [portfolioModal, setPortfolioModal] = useState({ isOpen: false, data: null, index: -1 });
  const [profileEditModal, setProfileEditModal] = useState({ isOpen: false, section: null });
  const [aboutModal, setAboutModal] = useState({ isOpen: false, data: null });
  const [profileInfoModal, setProfileInfoModal] = useState({ isOpen: false, data: null });

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
    getPortfolio()
    fetchOvereView()
  }, [isLogin, navigate, userInfo?.userId]);

  const getPortfolio = async () => {
    try{
    const res = await fetchApi.get(`/Portfolio?userId=${userInfo.userId}`);
    if (res.data && res.data.success) {
      setPortfolios(res.data.data)
    }

  }catch(error){
    toast.error(error.message || "An error occurred while fetching portfolio data");
  }
}

  // Handlers for opening modals
  const handleEditExperience = (experience, index) => {
    setExperienceModal({
      isOpen: true,
      data: experience,
      index: index
    });
  };

  const fetchOvereView = async ()=>{
    try{
const res=await fetchApi.get(`/Overview?userId=${userInfo.userId}`)
if(res.data && res.data.success){
  setOverview(res.data.data)
}
    }catch(error){
      toast.error(error.message || "An error occurred while fetching overview data");
    }
  }
  const handleAddExperience = () => {
    setExperienceModal({
      isOpen: true,
      data: null,
      index: -1
    });
  };

  const handleEditEducation = (education, index) => {
    setEducationModal({
      isOpen: true,
      data: education,
      index: index
    });
  };

  const handleAddEducation = () => {
    setEducationModal({
      isOpen: true,
      data: null,
      index: -1
    });
  };

  const handleAddSkill = (type = 'technical') => {
    setSkillModal({
      isOpen: true,
      type: type
    });
  };

  const handleEditPortfolio = (portfolio, index) => {
    setPortfolioModal({
      isOpen: true,
      data: portfolio,
      index: index
    });
  };

  const handleAddPortfolio = () => {
    setPortfolioModal({
      isOpen: true,
      data: null,
      index: -1
    });
  };

  const handleEditProfile = (section) => {
    // Open the appropriate modal based on the section
   if(section === 'about'){
    setAboutModal({
      isOpen: true,
      data: userData
    });
   }
   if(section === 'info'){
    setProfileInfoModal({
      isOpen: true,
      data: userData
    });
   }
  };

  // Handler for editing additional details
  const handleEditAdditionalDetails = (section) => {
    // For demo purposes, navigate to the edit details page
    if (section === 'details' || section === 'social') {
      navigate("/dashboard/add-details");
    }
  };

  // Handler for refreshing data after modal actions
  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi.get(`/Profile?userId=${userInfo.userId}`);
      if (res.data && res.data.success) {
        setUserData(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to refresh profile data");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Profile Header Component */}
        <ProfileHeader 
          userData={userData} 
          onEditProfile={handleEditProfile}
          bio={overview} setBio={setOverview}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Section */}
            <ExperienceSection
              experiences={userData?.experiences || []}
              onEdit={handleEditExperience}
              onAdd={handleAddExperience}
            />

            {/* Education Section */}
            <EducationSection
              educations={userData?.educations || []}
              onEdit={handleEditEducation}
              onAdd={handleAddEducation}
            />

            {/* Skills Section */}
            <SkillsSection
              skills={userData?.specialities || []}
              onAdd={() => handleAddSkill('technical')}
            />

            {/* Portfolio Section */}
            <PortfolioSection
              portfolios={portfolios}
              onEdit={handleEditPortfolio}
              onAdd={handleAddPortfolio}
            />
          </div>

          <div className="lg:col-span-1">
            {/* Additional Details Component */}
            <AdditionalDetails
              details={{
                email: userData?.user?.email,
                phone: userData?.phoneNumber,
                languages: userData?.language || "English, French"
              }}
              socialLinks={userData?.socialLinks || []}
              onEdit={handleEditAdditionalDetails}
            />
          </div>
        </div>

        {/* Modals */}
        {experienceModal.isOpen && (
          <ExperienceModal
            isOpen={experienceModal.isOpen}
            onClose={() => setExperienceModal({ isOpen: false, data: null, index: -1 })}
            initialData={experienceModal.data}
            editIndex={experienceModal.index}
            onSuccess={refreshData}
          />
        )}

        {educationModal.isOpen && (
          <EducationModal
            isOpen={educationModal.isOpen}
            onClose={() => setEducationModal({ isOpen: false, data: null, index: -1 })}
            initialData={educationModal.data}
            editIndex={educationModal.index}
            onSuccess={refreshData}
          />
        )}

        {skillModal.isOpen && (
          <SkillModal
            isOpen={skillModal.isOpen}
            onClose={() => setSkillModal({ isOpen: false, type: 'technical' })}
            skillType={skillModal.type}
            userId={userInfo?.userId}
            onSuccess={refreshData}
          />
        )}

        {portfolioModal.isOpen && (
          <PortfolioModal
            isOpen={portfolioModal.isOpen}
            onClose={() => setPortfolioModal({ isOpen: false, data: null, index: -1 })}
            initialData={portfolioModal.data}
            editIndex={portfolioModal.index}
            onSuccess={refreshData}
          />
        )}

        {aboutModal.isOpen && (
          <AboutModal
            isOpen={aboutModal.isOpen}
            onClose={() => setAboutModal({ isOpen: false, data: null })}
            initialData={aboutModal.data}
            onSuccess={refreshData}
            bio={overview}
            setBio={setOverview}
          />
        )}

        {profileInfoModal.isOpen && (
          <ProfileInfoModal
            isOpen={profileInfoModal.isOpen}
            onClose={() => setProfileInfoModal({ isOpen: false, data: null })}
            initialData={profileInfoModal.data}
            onSuccess={refreshData}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPage; 