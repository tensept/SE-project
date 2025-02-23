"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface MessageProps {
  sender: string;
  time: string;
  isRead: boolean;
  id: number;
}

const MessageItem: React.FC<MessageProps> = ({ sender, time, isRead, id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/history`);
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
  const [messages, setMessages] = useState([]);
  const [isDateChanged, setIsDateChanged] = useState(false);

  useEffect(() => {
    fetchDiary();
  }, [date]);

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

    // ฟังก์ชันเปลี่ยนสีวันที่ชั่วคราว
    const triggerDateChangeEffect = () => {
      setIsDateChanged(true);
      setTimeout(() => setIsDateChanged(false), 1000); // สีจะกลับเป็นปกติหลังจาก 0.5 วินาที
    };

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const date_for_api = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const [isDateChanged, setIsDateChanged] = useState(false);

  const fetchDiary = async () => {
    try {
      const response = await fetch(`http://localhost:1234/diaries/by-date/${date_for_api}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 404) {
        console.log("No diary found for the date");
        setMessages([]);
        return;
      }
      const data = await response.json();
      setMessages(data);
      setShow_Date_Time(data[0].created_at.split("T")[0]);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <div className="flex-1 p-4">
        {/* Date Navigation */}
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

        {/* Divider */}
        <div className="border-b mb-4"></div>

        {/* Messages List */}
        <div className="space-y-1">
          {messages.map((message: any) => (
            <MessageItem key={message.id} sender={message.patient.name} time={message.createdAt} isRead={message.isRead} id={message.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthDiaryMessages;
