"use client";

import { useState } from "react";

interface UploadData {
    startDate: string|null;
    endDate: string|null;
    date: string|null;
    file: File|null;
  }

export const FirstTimerUploadForm: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  
  const [formData, setFileData] = useState <UploadData> ({
    startDate: null,
    endDate: null,
    date: null,
    file: null,
  })

    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form className="space-y-6">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className={"input"}
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            Actual Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <div className="mt-1 flex justify-center items-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Choose a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
        {file && <p>Selected file: {file.name}</p>}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
