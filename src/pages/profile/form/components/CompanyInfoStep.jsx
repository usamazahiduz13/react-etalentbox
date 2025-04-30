import { useTranslation } from 'react-i18next';
import FormikDatePicker from '@/components/form/FormikDatepicker';
import FormikField from '@/components/form/FormikField';
import FormikRadio from '@/components/form/FormikRadio';
import FormikAutoCompleteSelect from '@/components/form/FormikSelect';
import AvatarImg from '@/assets/imgs/avatar-1.jpg';
import { useState } from 'react';
import { countriesOptions } from '@/utilis/helpers';
import DropzoneFileUploader from './DropzoneFileUploader';
import mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist';
import { useFormikContext } from 'formik';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const CompanyInfoStep = () => {
  const { t } = useTranslation(); // Hook for translations
  const { setFieldValue } = useFormikContext();
  const [profileLevelDesp, setProfileLevelDesp] = useState('{Description}');

  const handleFileUpload = async (file) => {
    console.log('File upload started:', file.name, file.type);
  
    if (file.type === 'application/pdf') {
      console.log('Processing PDF file');
      await extractTextFromPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      console.log('Processing DOCX file');
      await extractTextFromDocx(file);
    } else {
      console.log('Unsupported file type:', file.type);
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument({ data: typedarray }).promise;
        let extractedText = '';
    
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((item) => 'str' in item ? item.str : '').join(' ') + '\n';
        }
    
        console.log('Extracted PDF text:', extractedText);
        parseCVText(extractedText, setFieldValue);
      } catch (error) {
        console.error('Error processing PDF:', error);
      }
    };
  
    reader.readAsArrayBuffer(file);
  };

  const extractTextFromDocx = async (file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const result = await mammoth.extractRawText({ arrayBuffer: reader.result });
        console.log('Extracted DOCX text:', result.value);
        parseCVText(result.value, setFieldValue);
      } catch (error) {
        console.error('Error processing DOCX:', error);
      }
    };
  
    reader.readAsArrayBuffer(file);
  };

  const parseCVText = (text, setFieldValue) => {  
    console.log('Starting CV text parsing');
    
    // Name extraction with multiple patterns
    let nameMatch = text.match(/(?:First Name|Full Name|Given Name)\s*([\w\s]+)/i);
    if (!nameMatch) {
        nameMatch = text.match(/^([A-Za-z]+(?:\s[A-Za-z]+){1,2})/m);
    }
    if (!nameMatch) {
        nameMatch = text.match(/Name:\s*([\w\s]+)/i);
    }

    // Date of birth extraction
    const dobMatch = text.match(/(?:Date of Birth|DOB|Birth Date):\s*(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/i);
    
    // Passport extraction
    const passportMatch = text.match(/(?:Passport|Passport Number):\s*([\w\d]+)/i);
    
    // Nationality extraction
    const nationalityMatch = text.match(/(?:Nationality|Country of Origin):\s*([^\n]+)/i);
    
    // Work Country extraction
    const workCountryMatch = text.match(/(?:Country|Work Country|Current Country):\s*([\w\s]+)/i);
    
    // Language extraction
    const languageMatch = text.match(/(?:Languages|Language):\s*([^\n]+)/i);
    
    // ID Number extraction
    const idNumberMatch = text.match(/(?:ID Number|ID|National ID):\s*([\w\d]+)/i);

    console.log('Parsed matches:', {
      nameMatch: nameMatch?.[1],
      dobMatch: dobMatch?.[1],
      passportMatch: passportMatch?.[1],
      nationalityMatch: nationalityMatch?.[1],
      workCountryMatch: workCountryMatch?.[1],
      languageMatch: languageMatch?.[1],
      idNumberMatch: idNumberMatch?.[1]
    });

    // Set form values if matches found
    if (nameMatch) {
      const [firstName, ...lastName] = nameMatch[1].trim().split(' ');
      console.log('Setting name fields:', { firstName, lastName: lastName.join(' ') });
      setFieldValue('firstName', firstName || '');
      setFieldValue('lastName', lastName.join(' ') || '');
    }

    if (dobMatch) {
      console.log('Setting date of birth:', dobMatch[1]);
      setFieldValue('dateOfBirth', dobMatch[1]);
    }

    if (passportMatch) {
      console.log('Setting passport number:', passportMatch[1]);
      setFieldValue('passportNumber', passportMatch[1]);
    }

    if (nationalityMatch) {
      const nationalityValue = nationalityMatch[1]?.trim();
      const matchedNationality = countriesOptions.find(
        (country) => country.label.trim().toLowerCase() === nationalityValue.toLowerCase()
      );
      console.log('Setting nationality:', { nationalityValue, matchedNationality });
      setFieldValue('nationality', matchedNationality || { label: nationalityValue, value: '' });
    }

    if (workCountryMatch) {
      const workCountryValue = workCountryMatch[1].trim();
      const matchedWorkCountry = countriesOptions.find(
        (country) => country.label.toLowerCase() === workCountryValue.toLowerCase()
      );
      console.log('Setting work country:', { workCountryValue, matchedWorkCountry });
      setFieldValue('workCountry', matchedWorkCountry || null);
    }

    if (languageMatch) {
      console.log('Setting language:', languageMatch[1].trim());
      setFieldValue('language', languageMatch[1].trim());
    }

    if (idNumberMatch) {
      console.log('Setting ID number:', idNumberMatch[1]);
      setFieldValue('idNumber', idNumberMatch[1]);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">{t('company_info')}</h2>
      <div className="flex gap-4 my-6">
        <img 
          src={AvatarImg} 
          alt="Avatar" 
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="space-y-4">
          <p className="text-base">{t('profile_level')}*</p>

          <FormikRadio
            name="profileLevel"
            options={[
              { value: 'Student', label: t('student'), selectedValue: 'Student profile is for students' },
              { value: 'Professional', label: t('skilled'), selectedValue: 'Professional profile is related to professional life' },
              { value: 'Non Professional', label: t('non_skilled'), selectedValue: 'Non Professional profile is like laborers, electricians, etc.' },
            ]}
            onChange={(_, __, value) => {
              console.log('value?.selectedValue ==> ', value?.selectedValue)
              setProfileLevelDesp(value?.selectedValue)
            }}
          />
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-2 mb-4 text-blue-700">
        {profileLevelDesp}
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-4">
        <DropzoneFileUploader label="Upload your Resume" onFileUpload={handleFileUpload} />
        <DropzoneFileUploader label="Upload your LinkedIn Profile" onFileUpload={handleFileUpload} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <FormikField name="firstName" label={t('first_name')} isRequired />
          <FormikDatePicker name="dateOfBirth" label={t('dob')} isRequired />
          <FormikField name="language" label={t('language')} isRequired />
          <FormikField name="passportNumber" label={t('passport')} isRequired />
        </div>
        <div className="space-y-4">
          <FormikField name="lastName" label={t('last_name')} isRequired />
          <FormikAutoCompleteSelect name="nationality" label={t('nationality')} options={countriesOptions} isRequired />
          <FormikAutoCompleteSelect name="workCountry" label={t('work_country')} options={countriesOptions} isRequired />
          <FormikField name="idNumber" label={t('id_number')} isRequired />
        </div>
      </div>
    </>
  );
};

export default CompanyInfoStep; 