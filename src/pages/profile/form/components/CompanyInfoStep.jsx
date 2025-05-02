import AvatarImg from "../../../../assets/imgs/avatar-1.jpg";
import { useState } from "react";
import { countries } from "../../utilis/helpers";
import DropzoneFileUploader from "./DropzoneFileUploader";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateProfileData } from "../../../../Redux/user-slice";

// Initialize PDF.js worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).href;

const CompanyInfoStep = ({ formData, onInputChange }) => {
  const dispatch = useDispatch();
  const [profileLevelDesp, setProfileLevelDesp] = useState("{Description}");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [avatar, setAvatar] = useState(AvatarImg);

  console.log(formData);
  const handleFileUpload = async (file) => {
    console.log("File upload started:", file.name, file.type);

    if (file.type === "application/pdf") {
      console.log("Processing PDF file");
      await extractTextFromPDF(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      console.log("Processing DOCX file");
      await extractTextFromDocx(file);
    } else {
      console.log("Unsupported file type:", file.type);
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText +=
            textContent.items
              .map((item) => ("str" in item ? item.str : ""))
              .join(" ") + "\n";
        }

        parseCVText(extractedText);
      } catch (error) {
        console.error("Error processing PDF:", error);
      } finally {
        setIsParsing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const extractTextFromDocx = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const result = await mammoth.extractRawText({
          arrayBuffer: reader.result,
        });
        console.log("Extracted DOCX text:", result.value);
        parseCVText(result.value);
      } catch (error) {
        console.error("Error processing DOCX:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const parseCVText = (text) => {
    console.log("Starting CV text parsing");

    // Name extraction with multiple patterns
    let nameMatch = text.match(
      /(?:First Name|Full Name|Given Name)[:\s]*([^\n\r]+)/i
    );
    if (!nameMatch) {
      nameMatch = text.match(/^([A-Za-z]+(?:\s[A-Za-z]+){1,2})/m);
    }
    if (!nameMatch) {
      nameMatch = text.match(/Name[:\s]*([^\n\r]+)/i);
    }

    // Date of birth extraction
    const dobMatch = text.match(
      /(?:Date of Birth|DOB|Birth Date)[:\s]*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i
    );

    // Passport extraction
    const passportMatch = text.match(
      /(?:Passport|Passport Number)[:\s]*([^\n\r]+)/i
    );

    // Nationality extraction
    const nationalityMatch = text.match(
      /(?:Nationality|Country of Origin)[:\s]*([^\n\r]+)/i
    );

    // Work Country extraction
    const workCountryMatch = text.match(
      /(?:Country|Work Country|Current Country)[:\s]*([^\n\r]+)/i
    );

    // Language extraction
    const languageMatch = text.match(/(?:Languages|Language)[:\s]*([^\n\r]+)/i);

    // ID Number extraction
    const idNumberMatch = text.match(
      /(?:ID Number|ID|National ID)[:\s]*([^\n\r]+)/i
    );

    // Set form values if matches found
    if (nameMatch) {
      const [firstName, ...lastName] = nameMatch[1].trim().split(/\s+/);
      onInputChange({ target: { name: "firstName", value: firstName || "" } });
      onInputChange({
        target: { name: "lastName", value: lastName.join(" ") || "" },
      });
    }

    if (dobMatch) {
      onInputChange({ target: { name: "dateOfBirth", value: dobMatch[1] } });
    }

    if (passportMatch) {
      onInputChange({
        target: { name: "passportNumber", value: passportMatch[1].trim() },
      });
    }

    if (nationalityMatch) {
      const nationalityValue = nationalityMatch[1].trim();
      const matchedNationality = countries.find(
        (country) =>
          country.label.trim().toLowerCase() === nationalityValue.toLowerCase()
      );
      onInputChange({
        target: {
          name: "nationality",
          value: matchedNationality ? matchedNationality.label : "",
        },
      });
    }

    if (workCountryMatch) {
      const workCountryValue = workCountryMatch[1].trim();
      const matchedWorkCountry = countries.find(
        (country) =>
          country.label.toLowerCase() === workCountryValue.toLowerCase()
      );
      onInputChange({
        target: {
          name: "workCountry",
          value: matchedWorkCountry ? matchedWorkCountry.label : "",
        },
      });
    }

    if (languageMatch) {
      onInputChange({
        target: { name: "language", value: languageMatch[1].trim() },
      });
    }

    if (idNumberMatch) {
      onInputChange({
        target: { name: "idNumber", value: idNumberMatch[1].trim() },
      });
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        // Update Redux store with the image data
        dispatch(updateProfileData({ artifactUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="md:px-8 px-4 py-6">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <FaRegEdit className="w-5 h-5 text-gray-600" />
          </label>
        </div>
      </div>

      <div className="bg-blue-50 p-4 mb-6 text-blue-700 rounded-lg">
        Please fill all fields to continue
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <DropzoneFileUploader
          label="Upload your Resume"
          onFileUpload={handleFileUpload}
        />
        <DropzoneFileUploader
          label="Upload your LinkedIn Profile"
          onFileUpload={handleFileUpload}
        />
      </div>

      <div className="space-y-6">
        <div className="relative">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Profile Level <span className="text-red-500 text-lg">*</span>
          </p>
          <div
            className="border px-4 py-3 border-[#D8D8D8] rounded-lg flex items-center justify-between w-full cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <span className="text-gray-700">{formData.profileLevel || "Select Profile Level"}</span>
            <FaChevronDown className="w-5 h-5 text-gray-500" />
          </div>

          {isProfileDropdownOpen && (
            <div className="bg-white shadow-lg rounded-lg p-2 absolute top-full left-0 w-full z-10 mt-1 border border-gray-200">
              {[
                {
                  value: "Student",
                  label: "Student",
                  selectedValue: "Student profile is for students",
                },
                {
                  value: "Professional",
                  label: "Professional",
                  selectedValue: "Professional profile is related to professional life",
                },
                {
                  value: "Non Professional",
                  label: "Non Professional",
                  selectedValue: "Non Professional profile is like laborers, electricians, etc.",
                },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-3 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    id={option.value}
                    name="profileLevel"
                    value={option.value}
                    checked={formData.profileLevel === option.value}
                    onChange={(e) => {
                      onInputChange(e);
                      setProfileLevelDesp(option.selectedValue);
                      setIsProfileDropdownOpen(false);
                    }}
                    className="mr-3"
                  />
                  <label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName || ""}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                Language <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language || ""}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Passport Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber || ""}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName || ""}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality || ""}
                onChange={(e) => {
                  onInputChange({
                    target: {
                      name: "nationality",
                      value: e.target.value,
                    },
                  });
                }}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              >
                <option value="">Select Nationality</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="workCountry" className="block text-sm font-medium text-gray-700 mb-2">
                Work Country <span className="text-red-500">*</span>
              </label>
              <select
                id="workCountry"
                name="workCountry"
                value={formData.workCountry || ""}
                onChange={(e) => {
                  onInputChange({
                    target: {
                      name: "workCountry",
                      value: e.target.value,
                    },
                  });
                }}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              >
                <option value="">Select Work Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                ID Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber || ""}
                onChange={onInputChange}
                className="mt-1 block w-full rounded-lg py-2.5 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoStep;
