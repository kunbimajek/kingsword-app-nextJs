"use client";

import { FormEvent, useState } from "react";

interface UploadData {
  startDate: string;
  endDate: string;
  date: string;
  file: File | null;
}

export const FirstTimerUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<UploadData>({
    startDate: "",
    endDate: "",
    date: "",
    file: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'file' ? (files ? files[0] : null) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:6000/api/v1/uploads/firstTimerMessage";
      const formDataToSend = new FormData();
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("date", formData.date);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Failed to send:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            value={formData.startDate}
            onChange={handleInputChange}
            className="input"
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
            value={formData.endDate}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Actual Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
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
                name="file"
                type="file"
                className="sr-only"
                onChange={handleInputChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
        {formData.file && (
          <p className="input">Selected file: {formData.file.name}</p>
        )}
        <div>
          <button type="submit" className="globalBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
