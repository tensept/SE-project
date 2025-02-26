"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface MessageProps {
  sender: string;
  time: string;
  isRead: boolean;
  id: number;
  date: string;
  patientId: number;
}

const MessageItem: React.FC<MessageProps & { markAsRead: (id: number) => void }> = ({ sender, time, isRead, id, date, patientId, markAsRead }) => {
  const router = useRouter();

  const isReaded = async () => {
    try {
      const response = await fetch(`http://localhost:1234/diaries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        markAsRead(id); // ✅ อัปเดต UI โดยไม่ต้อง fetch ใหม่
      } else {
        console.log("Failed to update isRead status");
      }
    } catch (error) {
      console.error("Error updating diary:", error);
    }
  };

  const handleClick = async () => {
    if (!isRead) {
      await isReaded();
    }
    router.push(`/history/${date}/${patientId}`);
  };

  return (
    <div
      className={`relative py-4 px-6 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center border-l-4 ${
        isRead ? "border-gray-300" : "border-[#FB6F92]"
      }`}
      onClick={handleClick}
      style={{ margin: "8px 0" }}
    >
      <div className="w-12 h-12 rounded-full bg-[#FFC2D1] flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#FFFFFF"/>
          <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#FFFFFF"/>
        </svg>
      </div>
      <div className="ml-4 flex-grow">
        <div className="font-medium text-gray-900 text-lg">{sender}</div>
        <div className="text-sm text-gray-600">{time}</div>
      </div>
      <div className={`text-sm font-medium ${isRead ? "text-gray-400" : "text-[#FB6F92]"}`}>
        {isRead ? "Read" : "Unread"}
      </div>
    </div>
  );
};

const HealthDiaryMessages: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isDateChanged, setIsDateChanged] = useState(false);

  useEffect(() => {
    fetchDiary();
  }, [date]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handlePreviousDate = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
    triggerDateChangeEffect();
  };

  const handleNextDate = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
    triggerDateChangeEffect();
  };

  const triggerDateChangeEffect = () => {
    setIsDateChanged(true);
    setTimeout(() => setIsDateChanged(false), 1000);
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const date_for_api = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const fetchDiary = async () => {
    try {
      const response = await fetch(`http://localhost:1234/diaries/by-date/${date_for_api}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        console.log("No diary found for the date");
        setMessages([]);
        return;
      }

      const data = await response.json();

      // ตรวจสอบว่าข้อมูลที่ดึงมามีฟิลด์ที่ต้องการหรือไม่
      const formattedMessages = data.map((message: any) => ({
        sender: message.patient?.name || "Unknown",  // ชื่อผู้ป่วย
        time: new Date(message.createdAt).toLocaleString(),  // เวลา
        isRead: message.isRead,
        id: message.id,
        date: date_for_api,
        patientId: message.patient?.id || 0,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  const markMessageAsRead = (id: number) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg" onClick={handlePreviousDate}>
              ◀
            </button>
            <span className={`font-medium text-lg transition-colors duration-500 ${isDateChanged ? "text-[#FB6F92]" : "text-gray-800"} mx-6`}>
              {formattedDate}
            </span>
            <button className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg" onClick={handleNextDate}>
              ▶
            </button>
          </div>
        </div>

        <div className="border-b mb-4"></div>

        <div className="space-y-1">
          {messages.map(message => (
            <MessageItem
              key={message.id}
              sender={message.sender}
              time={message.time}
              isRead={message.isRead}
              id={message.id}
              date={message.date}
              patientId={message.patientId}
              markAsRead={markMessageAsRead} // ✅ ส่งฟังก์ชันไปยัง MessageItem
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthDiaryMessages;
