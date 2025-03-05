import React, { createContext, useState, useEffect, useContext } from "react";
import { parseCookies } from "../utils/cookies";

interface Message {
  sender: string;
  time: string;
  isRead: boolean;
  id: number;
  date: string;
}

interface DoctorContextProps {
  messages: Message[];
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  markMessageAsRead: (id: number) => void;
  diaryId: number | null;
  setDiaryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);

export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error("useDoctorContext must be used within a DoctorProvider");
  }
  return context;
};

export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ citizenID: '', token: '', role: '' });
  const [date, setDate] = useState<Date|null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [diaryId, setDiaryId] = useState<number | null>(null);

  // Load date and diaryId from localStorage on initial load
  useEffect(() => {
    const cookies = parseCookies();
    setUserInfo({
      citizenID: cookies.citizenID || '',
      token: cookies.token || '',
      role: cookies.role || '',
    });
  
    const storedDiaryId = localStorage.getItem("diaryId");
    const storedDate = localStorage.getItem("date");

    if (storedDiaryId) {
      setDiaryId(Number(storedDiaryId));
    }

    if (storedDate) {
      setDate(new Date(storedDate));
    } else {
      setDate(new Date()); 
    }
  }, []);

  // Save date and diaryId to localStorage when they change
  useEffect(() => {
    if (diaryId !== null) {
      localStorage.setItem("diaryId", diaryId.toString());
    }
  }, [diaryId]);

  useEffect(() => {
    if (date) {
      localStorage.setItem("date", date.toISOString());
    }
  }, [date]);

  // Trigger fetchDiary when `date` changes
  useEffect(() => {
    const fetchDiary = async () => {
      // Format the date only when useEffect is triggered
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      try {
        console.log("date: " + formattedDate);
        const path = process.env.NEXT_PUBLIC_BACK_END;
        const response = await fetch(`${path}/diaries/by-date/${formattedDate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Citizen-ID": userInfo.citizenID,
            "X-Role": userInfo.role,
            "X-Token": userInfo.token,
          },
        });
        console.log("result: " + response);
        if (!response.ok) {
          setMessages([]);
          return;
        }
        const data = await response.json();
        setMessages(
          data.map((message: { patientName: string; createdAt: string | number | Date; isRead: boolean; id: number; }) => ({
            sender: message.patientName || "Unknown",
            time: new Date(message.createdAt).toLocaleString(),
            isRead: message.isRead,
            id: message.id,
            date: formattedDate,
          }))
        );
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };

    console.log("fetching diary...");
    fetchDiary(); // Call fetchDiary when date changes
  }, [date]); // Dependency on `date`

  const markMessageAsRead = (id: number) => {
    setMessages(prev => prev.map(msg => (msg.id === id ? { ...msg, isRead: true } : msg)));
  };

  return (
    <DoctorContext.Provider value={{ messages, date, setDate, markMessageAsRead, diaryId, setDiaryId }}>
      {children}
    </DoctorContext.Provider>
  );
};
