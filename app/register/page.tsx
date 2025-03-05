'use client'

import React from "react";
import GenericForm from "../components/GenericForm";

const RegisterPatient = () => {
  const handleSuccess = (data: { access_token: string }) => {
    console.log(data.access_token);
    document.cookie = `token=${data.access_token}; path=/; Secure; SameSite=Strict`;
  };  

  const bodyArguments = {
    citizenID: "",
    HN: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    birthDate: "",
    address: "",
    phone: "",
    emergencyContact: "",
    relationship: "",
    bloodType: "",
    occupation: "",
    height: "",
    weight: "",
    chronicDisease: "",
    allergicFood: "",
    allergicMedicine: "",
    password: "",
    role: "",
    imageUrl: ""
  };

  return (
    <GenericForm
      requestPath="/patientAuth/register"
      bodyArguments={bodyArguments}
      onSuccess={handleSuccess}
    />
  );
};

export default RegisterPatient;
