"use client"; // Required for Next.js App Router (if using pages, remove this)

import { UserProvider } from "../../contexts/UserContext";
import AuthForm from "../../components/AuthForm";

const LoginPage: React.FC = () => {
  return (
    <UserProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <AuthForm mode="login" userType="doctor" />
      </div>
    </UserProvider>
  );
};

export default LoginPage;
