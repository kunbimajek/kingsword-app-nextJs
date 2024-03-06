"use client"; // This is a client component

// components/RegisterForm.tsx

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "../styles/requisitionFormStyles.module.css"; // Import CSS module
import { stripIndexFromString } from "../util/requisitionForm";

interface FormData {
  description: string;
  quantity: number;
  amount: number;
}

export default function RegisterForm() {
  const [formDataList, setFormDataList] = useState<FormData[]>([
    {
      description: "Place",
      quantity: 0,
      amount: 0,
    },
  ]);

  const handleChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    const cleanedName = stripIndexFromString(name);
    console.log(cleanedName)
    setFormDataList((prevState) => {
      const updatedFormDataList = [...prevState];
      updatedFormDataList[index] = {
        ...updatedFormDataList[index],
        [cleanedName]:
        cleanedName === `quantity` || cleanedName === `amount` ? parseFloat(value) : value,
      };
      return updatedFormDataList;
    });
  };

  const handleAddForm = () => {
    setFormDataList((prevState) => [
      ...prevState,
      { description: "", quantity: 0, amount: 0 },
    ]);
  };

  const handleRemoveForm = (index: number) => {
    setFormDataList((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formDataList);
  };

  return (
    <div className="max-w-md my-4 mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Requisition</h2>
      <form onSubmit={handleSubmit}>
        {formDataList.map((formData, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`description-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id={`description-${index}`}
              name={`description-${index}`}
              value={formData.description}
              onChange={(e) => handleChange(index, e)}
              className={styles.input}
            />
            <label
              htmlFor={`quantity-${index}`}
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Quantity
            </label>
            <input
              type="number"
              id={`quantity-${index}`}
              name={`quantity-${index}`}
              value={formData.quantity}
              onChange={(e) => handleChange(index, e)}
              className={styles.input}
            />
            <label
              htmlFor={`amount-${index}`}
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Amount
            </label>
            <input
              type="number"
              id={`amount-${index}`}
              name={`amount-${index}`}
              value={formData.amount}
              onChange={(e) => handleChange(index, e)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => handleRemoveForm(index)}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddForm} className={styles.addBtn}>
          Add Another
        </button>
        <div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
