"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "../utils/cookies";

interface MessageProps {
  sender: string;
  time: string;
  isRead: boolean;
  id: number;
  date: string;
  patientId: number;
}

const MessageItem: React.FC<
  MessageProps & {
    markAsRead: (id: number) => void;
    onClick: React.Dispatch<React.SetStateAction<number | null>>;
  }
> = ({ sender, time, isRead, id, date, patientId, markAsRead, onClick }) => {
  const [userInfo, setUserInfo] = useState({ citizenID: '', token: '', role: '' });
  const router = useRouter();
  
  useEffect(() => {
    const cookies = parseCookies();
    setUserInfo({
      citizenID: cookies.citizenID || '',
      token: cookies.token || '',
      role: cookies.role || '',
    });
  }, []);

  const isReaded = async () => {
    try {
      const path = process.env.NEXT_PUBLIC_BACK_END;
      const response = await fetch(`${path}/diaries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Citizen-ID": userInfo.citizenID,
          "X-Role": userInfo.role,
          "X-Token": userInfo.token,
        },
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

  // อยากได้ให้ส่งข้อมูล diaryId ไปหน้า history ด้วย
  const handleClick = async () => {
    if (!isRead) {
      await isReaded();
    }
    onClick(id);
    router.push(`/doctor/history`);
    //   router.push({
    //     pathname: '/history',
    //     query: { name: 'Someone' }
    // })
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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <divath
            d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
            fill="#FFFFFF"
          />
          <divath
            d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
      <div className="ml-4 flex-grow">
        <div className="font-medium text-gray-900 text-lg">{sender}</div>
        <div className="text-sm text-gray-600">{time}</div>
      </div>
      <div
        className={`text-sm font-medium ${
          isRead ? "text-gray-400" : "text-[#FB6F92]"
        }`}
      >
        {isRead ? "Read" : "Unread"}
      </div>
    </div>
  );
};

export default MessageItem;
