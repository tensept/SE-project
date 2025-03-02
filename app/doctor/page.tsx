"use client";

import React, { useState, useEffect } from "react";
import { useDoctorContext } from "../contexts/DoctorContext";
import MessageItem from "../components/MessageItem";

const Page: React.FC = () => {
  const { messages, date, setDate, markMessageAsRead, setDiaryId } =
    useDoctorContext();
  const [isDateChanged, setIsDateChanged] = useState(false);

  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const handlePreviousDate = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
    setIsDateChanged(true);
  };

  const handleNextDate = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
    setIsDateChanged(true);
  };

  useEffect(() => {
    console.log(date);
    if (isDateChanged) {
      setIsDateChanged(false);
    }
  }, [date]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg"
              onClick={handlePreviousDate}
            >
              ◀
            </button>
            <span
              className={`font-medium text-lg transition-colors duration-500 ${
                isDateChanged ? "text-[#FB6F92]" : "text-gray-800"
              } mx-6`}
            >
              {formattedDate}
            </span>
            <button
              className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg"
              onClick={handleNextDate}
            >
              ▶
            </button>
          </div>
        </div>

        <div className="border-b mb-4"></div>

        <div className="space-y-1">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              sender={message.sender}
              time={message.time}
              isRead={message.isRead}
              id={message.id}
              date={message.date}
              markAsRead={markMessageAsRead} // Send function to MessageItem
              onClick={setDiaryId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
