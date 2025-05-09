import { useState, useEffect } from "react";
import fetchApi from "../../../utils/axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AdditionalDetails = ({ details = {}, socialLinks = [], onEdit }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [editedLinks, setEditedLinks] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Certifications state
  const [certifications, setCertifications] = useState([]);
  const [isEditingCertification, setIsEditingCertification] = useState(false);
  const [editedCertification, setEditedCertification] = useState({});
  const [certificationFile, setCertificationFile] = useState(null);
  const [loadingCertifications, setLoadingCertifications] = useState(false);

  const handleEditSocialLinks = () => {
    // Initialize edited links from current links data
    setEditedLinks({
      instagram: links.instagram || "",
      facebook: links.facebook || "",
      linkedin: links.linkedin || "",
      twitter: links.twitter || "",
    });
    setIsEditingLinks(true);
  };

  const handleLinkChange = (platform, value) => {
    setEditedLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handleSaveLinks = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...editedLinks,
        userId: userInfo.userId,
      };

      // If we have an existing ID, update the record, otherwise create a new one
      const endpoint = links.id ? `/SocialLink` : "/SocialLink";
      const method = links.id ? "put" : "post";

      const response = await fetchApi[method](endpoint, payload);
      
      if (response.data.success) {
        toast.success("Social links updated successfully");
        // Update the local state with the new data
        setLinks({
          ...links,
          ...editedLinks,
          id: response.data.data?.id || links.id,
        });
      } else {
        toast.error(response.data.message || "Failed to update social links");
      }
    } catch (error) {
      console.error("Error updating social links:", error);
      toast.error(error.response?.data?.message || "Failed to update social links");
    } finally {
      setLoading(false);
      setIsEditingLinks(false);
    }
  };

  // Certifications functions
  const getCertifications = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    setLoadingCertifications(true);
    try {
      const res = await fetchApi.get(`/CertificationAndTraining?userId=${userInfo.userId}`);
      if (res.data.success) {
        setCertifications(res.data.data || []);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching certifications:", error);
      if (error.response?.status === 404) {
        console.log("No certifications found");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load certifications"
        );
      }
    } finally {
      setLoadingCertifications(false);
    }
  };

  const handleAddCertification = () => {
    setEditedCertification({
      title: "",
      certificationId: "",
      organizationName: "",
      organizationUrl: "",
      issueDate: "",
      expireDate: "",
      score: 0,
      artifactUrl: "",
      userId: userInfo?.userId
    });
    setCertificationFile(null);
    setIsEditingCertification(true);
  };

  const handleEditCertification = (certification) => {
    setEditedCertification({
      ...certification,
      issueDate: certification.issueDate ? new Date(certification.issueDate).toISOString().split('T')[0] : "",
      expireDate: certification.expireDate ? new Date(certification.expireDate).toISOString().split('T')[0] : "",
    });
    setCertificationFile(null);
    setIsEditingCertification(true);
  };

  const handleCertificationChange = (field, value) => {
    setEditedCertification(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // 3MB limit
        toast.error("File size should be less than 3MB");
        return;
      }
      setCertificationFile(file);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleSaveCertification = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    // Basic validation
    if (!editedCertification.title || !editedCertification.organizationName) {
      toast.error("Title and organization name are required");
      return;
    }

    setLoadingCertifications(true);
    try {
      let payload = { ...editedCertification, userId: userInfo.userId };
      
      // If a file is selected, convert it to base64
      if (certificationFile) {
        const base64File = await convertFileToBase64(certificationFile);
        payload.artifactUrl = base64File;
      }

      // Determine if it's an update or create operation
      const method = editedCertification.id ? "put" : "post";
      const endpoint = editedCertification.id 
        ? `/CertificationAndTraining` 
        : "/CertificationAndTraining";

      const response = await fetchApi[method](endpoint, payload);
      
      if (response.data.success) {
        toast.success(`Certification ${editedCertification.id ? 'updated' : 'added'} successfully`);
        // Refresh the list
        getCertifications();
      } else {
        toast.error(response.data.message || "Failed to save certification");
      }
    } catch (error) {
      console.error("Error saving certification:", error);
      toast.error(error.response?.data?.message || "Failed to save certification");
    } finally {
      setLoadingCertifications(false);
      setIsEditingCertification(false);
    }
  };

  const handleDeleteCertification = async (id) => {
    if (!confirm("Are you sure you want to delete this certification?")) {
      return;
    }

    setLoadingCertifications(true);
    try {
      const response = await fetchApi.delete(`/Certification/${id}`);
      
      if (response.data.success) {
        toast.success("Certification deleted successfully");
        // Refresh the list
        setCertifications(prev => prev.filter(cert => cert.id !== id));
      } else {
        toast.error(response.data.message || "Failed to delete certification");
      }
    } catch (error) {
      console.error("Error deleting certification:", error);
      toast.error(error.response?.data?.message || "Failed to delete certification");
    } finally {
      setLoadingCertifications(false);
    }
  };

  const getLinks = async () => {
    if (!userInfo?.userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchApi.get(`/SocialLink/${userInfo.userId}`);
      if (res.data.success) {
        const linkData = res.data.data[0];
        console.log(linkData);
        // Update local state
        setLinks({
          id: linkData.id || 0,
          facebook: linkData.facebook || "",
          twitter: linkData.twitter || "",
          linkedin: linkData.linkedin || "",
          instagram: linkData.instagram || "",
          userId: userInfo.userId,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
      // Handle case when no links exist yet
      if (error.response?.status === 404) {
        console.log("No links found, will create new ones on submission");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load social links"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLinks();
    getCertifications();
  }, [userInfo]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      {/* Additional Details Section */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Additional Details
          </h2>
          <button className="text-blue-600" onClick={() => onEdit("details")}>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">Email</p>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-800">
                {details.email || "exampleuser@gmail.com"}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Phone</p>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <p className="text-gray-800">
                {details.phone || "+44 1234 567 890"}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Languages</p>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <p className="text-gray-800">
                {details.languages || "English, French"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Links Section */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
          <button className="text-blue-600" onClick={handleEditSocialLinks}>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Instagram */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-pink-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 text-sm">Instagram</p>
              <a 
                href={links.instagram || "https://www.instagram.com/william"}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {links.instagram || "https://www.instagram.com/william"}
              </a>
            </div>
          </div>
          
          {/* LinkedIn */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-blue-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 text-sm">LinkedIn</p>
              <a 
                href={links.linkedin || "https://www.linkedin.com/in/william"}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {links.linkedin || "https://www.linkedin.com/in/william"}
              </a>
            </div>
          </div>
          
          {/* Facebook */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 text-sm">Facebook</p>
              <a 
                href={links.facebook || "https://www.facebook.com/william"}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {links.facebook || "https://www.facebook.com/william"}
              </a>
            </div>
          </div>
          
          {/* Twitter */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 text-sm">Twitter</p>
              <a 
                href={links.twitter || "https://twitter.com/william"}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {links.twitter || "https://twitter.com/william"}
              </a>
            </div>
          </div>
          
          {/* GitHub */}
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700 text-sm">GitHub</p>
              <a 
                href={links.github || "https://github.com/williamjames"}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {links.github || "https://github.com/williamjames"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Training Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Certifications & Training</h2>
          <button 
            className="text-blue-600"
            onClick={handleAddCertification}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        
        {loadingCertifications ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : certifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No certifications found. Click the + button to add your first certification.
          </div>
        ) : (
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Certificate Thumbnail */}
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {cert.artifactUrl ? (
                        <img 
                          src={`data:image/jpeg;base64,${cert.artifactUrl}`} 
                          alt="Certificate" 
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/64x64?text=Certificate";
                          }}
                        />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Certificate Details */}
                    <div>
                      <h3 className="font-medium text-gray-900">{cert.title}</h3>
                      <p className="text-sm text-gray-600">{cert.organizationName}</p>
                      {cert.issueDate && (
                        <p className="text-xs text-gray-500">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                          {cert.expireDate && ` • Expires: ${new Date(cert.expireDate).toLocaleDateString()}`}
                        </p>
                      )}
                      {cert.certificationId && (
                        <p className="text-xs text-gray-500 mt-1">ID: {cert.certificationId}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditCertification(cert)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteCertification(cert.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Social Links Modal */}
      {isEditingLinks && (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Social Links</h3>
              <button 
                onClick={() => setIsEditingLinks(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <input
                  type="url"
                  value={editedLinks.instagram || ""}
                  onChange={(e) =>
                    handleLinkChange("instagram", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://instagram.com/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <input
                  type="url"
                  value={editedLinks.facebook || ""}
                  onChange={(e) => handleLinkChange("facebook", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://facebook.com/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={editedLinks.linkedin || ""}
                  onChange={(e) => handleLinkChange("linkedin", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <input
                  type="url"
                  value={editedLinks.twitter || ""}
                  onChange={(e) => handleLinkChange("twitter", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditingLinks(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLinks}
                className="px-4 py-2 primary-button rounded-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Certification Modal */}
      {isEditingCertification && (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editedCertification.id ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button 
                onClick={() => setIsEditingCertification(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Title *
                </label>
                <input
                  type="text"
                  value={editedCertification.title || ""}
                  onChange={(e) => handleCertificationChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Amazon Web Services Solutions Architect"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification ID
                </label>
                <input
                  type="text"
                  value={editedCertification.certificationId || ""}
                  onChange={(e) => handleCertificationChange("certificationId", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. AWS-ASA-12345"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editedCertification.score || ""}
                  onChange={(e) => handleCertificationChange("score", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 95"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={editedCertification.organizationName || ""}
                  onChange={(e) => handleCertificationChange("organizationName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Amazon Web Services"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization URL
                </label>
                <input
                  type="url"
                  value={editedCertification.organizationUrl || ""}
                  onChange={(e) => handleCertificationChange("organizationUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. https://aws.amazon.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={editedCertification.issueDate || ""}
                  onChange={(e) => handleCertificationChange("issueDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={editedCertification.expireDate || ""}
                  onChange={(e) => handleCertificationChange("expireDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Image
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                    className="w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Upload your certificate (max 3MB). Supported formats: Images, PDF, Word documents.
                </p>
                
                {/* Preview */}
                {(certificationFile || editedCertification.artifactUrl) && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Preview</p>
                    <div className="h-24 w-24 border rounded-md overflow-hidden bg-gray-100">
                      {certificationFile ? (
                        <img 
                          src={URL.createObjectURL(certificationFile)} 
                          alt="Certificate preview" 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100x100?text=Preview";
                          }}
                        />
                      ) : editedCertification.artifactUrl ? (
                        <img 
                          src={`data:image/jpeg;base64,${editedCertification.artifactUrl}`} 
                          alt="Certificate preview" 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/100x100?text=Preview";
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditingCertification(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                disabled={loadingCertifications}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCertification}
                className="px-4 py-2 primary-button rounded-md"
                disabled={loadingCertifications}
              >
                {loadingCertifications ? "Saving..." : "Save Certification"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalDetails;
