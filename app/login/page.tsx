'use client';

import React from 'react';
import GenericForm from '../components/GenericForm';

const PatientLoginPage: React.FC = () => {
  const requestPath = '/patientAuth/login';
  const bodyArguments = {
    citizenID: '',
    password: '',
  };

  const handleSuccess = (data: { access_token: string }) => {
    console.log(data.access_token);
    document.cookie = `token=${data.access_token}; path=/; Secure; SameSite=Strict`;
  };  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Patient Login</h1>
        <GenericForm requestPath={requestPath} bodyArguments={bodyArguments} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default PatientLoginPage;
