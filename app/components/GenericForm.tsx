"use client";

import React, { useState, useEffect } from "react";

interface GenericFormProps {
  requestPath: string; // Full request path for the API (e.g., "/auth/submit")
  bodyArguments: { [key: string]: string }; // Key-value pairs for the body arguments in the POST request
  onSuccess?: (result: any) => void; // Callback function to execute on success
}

const GenericForm: React.FC<GenericFormProps> = ({
  requestPath,
  bodyArguments,
  onSuccess,
}) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Initialize form data fields based on bodyArguments keys
  useEffect(() => {
    const initialFormData: { [key: string]: string } = {};
    Object.keys(bodyArguments).forEach((key) => {
      initialFormData[key] = ""; // Set empty string for each field
    });
    setFormData(initialFormData);
  }, [bodyArguments]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const path = process.env.NEXT_PUBLIC_BACK_END;
    const url = `${path}${requestPath}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData as body of the request
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      // Call the onSuccess function if provided
      if (onSuccess) {
        onSuccess(data);
      }

      setError(""); // Clear any previous errors
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Form for {requestPath.split("/").pop()}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(bodyArguments).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key] || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GenericForm;
