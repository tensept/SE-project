"use client"; // Required for Next.js App Router (if using pages, remove this)

import { UserProvider } from "../contexts/UserContext";
import UsernamePasswordForm from "../components/UsernamePasswordForm";

const RegisterPage: React.FC = () => {
  return (
    <UserProvider>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <UsernamePasswordForm mode="register" />
      </div>
    </UserProvider>
  );
};

export default RegisterPage;
