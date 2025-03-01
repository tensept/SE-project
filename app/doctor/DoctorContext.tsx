import React, { createContext, useState, useEffect, useContext } from "react";

interface Message {
  sender: string;
  time: string;
  isRead: boolean;
  id: number;
  date: string;
  patientId: number;
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
  const [date, setDate] = useState<Date>(new Date());
  const [messages, setMessages] = useState<Message[]>([]);
  const [diaryId, setDiaryId] = useState<number | null>(null);

  // Load date and diaryId from localStorage on initial load
  useEffect(() => {
    const storedDiaryId = localStorage.getItem("diaryId");
    const storedDate = localStorage.getItem("date");

    if (storedDiaryId) {
      setDiaryId(Number(storedDiaryId));
    }

    if (storedDate) {
      setDate(new Date(storedDate));
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
        const response = await fetch(`http://localhost:1234/diaries/by-date/${formattedDate}`);
        console.log("result: " + response);
        if (!response.ok) {
          setMessages([]);
          return;
        }
        const data = await response.json();
        setMessages(
          data.map((message: { patient: { name: string; id: number; }; createdAt: string | number | Date; isRead: boolean; id: number; }) => ({
            sender: message.patient?.name || "Unknown",
            time: new Date(message.createdAt).toLocaleString(),
            isRead: message.isRead,
            id: message.id,
            date: formattedDate,
            patientId: message.patient?.id || 0,
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
