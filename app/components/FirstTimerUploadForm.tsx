"use client";

import { FormEvent } from "react";
import { useState } from "react";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
    console.log(e.target.files, "files")
  };

  const postFormData = async (event: FormEvent) => {
    event.preventDefault();

    "use server";
    console.log("data", formData);
    const response = await fetch(
      "http://localhost:6000/api/v1/uploads/firstTimerMessage",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response", response);
  };

  return (
    <div className="max-w-md mx-auto">
      <form className="space-y-6" onSubmit={postFormData}>
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
            className="input"
            value={formData.startDate}
            onChange={handleInputChange}
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
            className="input"
            value={formData.endDate}
            onChange={handleInputChange}
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
            className="input"
            value={formData.date}
            onChange={handleInputChange}
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
                required
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
        </div>
        {/* {formData.file && (
          <p className="input">Selected file: {formData.file.name}</p>
        )} */}
        <div>
          <button type="submit" className="globalBtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
