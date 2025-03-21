import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the Patient profile interface to match the entity
interface PatientProfile {
  citizenID: string;
  HN: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  birthDate: string;
  address: string;
  phone: string;
  emergencyContact: string;
  relationship: string;
  bloodType: string;
  occupation: string;
  height: number;
  weight: number;
  chronicDisease: string;
  allergicFood: string;
  allergicMedicine: string;
  password: string;
  role: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextType {
  user: PatientProfile | null;
  setUser: (user: PatientProfile | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

// Define props to accept children
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const getToken = (): string | null => {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return match ? match[2] : null;
};

// Update UserProvider to accept children
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<PatientProfile | null>(null);
  const [token, setToken] = useState<string | null>(getToken());

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
