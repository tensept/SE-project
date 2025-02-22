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
      className="relative py-4 px-4 my-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        <div className="ml-4 flex-grow">
          <div className="font-medium text-gray-800">{sender}</div>
          <div className="text-sm text-gray-500">{time}</div>
        </div>
        <div className="text-sm text-gray-400">{isRead ? "read" : "unread"}</div>
      </div>
      {!isRead && <div className="absolute -left-1 inset-y-0 w-0.5 bg-pink-500 rounded-full my-2"></div>}
    </div>
  );
};

const HealthDiaryMessages: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchDiary();
  }, [date]);

  const handlePreviousDate = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDate = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const fetchDiary = async () => {
    try {
      const response = await fetch(`http://localhost:1234/diaries/by-date/${formattedDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 404) {
        console.log("No diary found for the date");
        setMessages([]);
        return;
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar Navigation */}
      <div className="w-16 bg-white border-r flex flex-col items-center">
        <div className="mt-6 mb-8">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" fill="#EC4899" />
              <path d="M18 16H6c-1.1 0-2 .9-2 2v4h16v-4c0-1.1-.9-2-2-2z" fill="#EC4899" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col space-y-6 items-center">
          <button className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-pink-500 relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" fill="#EC4899" />
            </svg>
            <span className="text-xs mt-1 font-medium">List</span>
          </button>

          <button className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center text-pink-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" fill="#EC4899" />
            </svg>
            <span className="text-xs mt-1 font-medium">Consult</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button className="p-2 text-gray-600" onClick={handlePreviousDate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="font-medium text-gray-800 mx-4">{formattedDate}</span>
            <button className="p-2 text-gray-600" onClick={handleNextDate}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b mb-4"></div>

        {/* Messages List */}
        <div className="space-y-1">
          {messages.map(message => (
            <MessageItem key={message.id} sender={message.symptom} time={message.createdAt} isRead={message.isRead} id={0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthDiaryMessages;
