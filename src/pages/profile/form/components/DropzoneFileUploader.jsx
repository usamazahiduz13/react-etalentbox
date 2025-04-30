import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneFileUploader = ({ label, onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const removeFile = (event) => {
    event.stopPropagation(); // Prevents opening file chooser
    setUploadedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-4 w-full md:w-[300px] text-center cursor-pointer border-2 border-dashed ${
        isDragActive ? "border-primary bg-gray-100" : "border-gray-300"
      } rounded-md`}
    >
      <input {...getInputProps()} />
      {!uploadedFile ? (
        <div className="flex flex-col items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-primary mb-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="text-gray-500">
            {isDragActive ? "Drop the file here..." : label}
          </p>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-sm truncate max-w-[200px]">{uploadedFile.name}</p>
          <button onClick={removeFile} className="text-red-500 p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropzoneFileUploader; 