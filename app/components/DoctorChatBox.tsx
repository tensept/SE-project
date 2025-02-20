"use client";
import React, { useState } from "react";
import { CornerDownLeft } from "lucide-react";

interface DoctorConsult {
  id: number;
  patientName: string;
  patientAvatar?: string;
  date: string;
  time: string;
  status: "read" | "unread";
}

interface Message {
  id: number;
  user: string;       // "Doctor" หรือชื่อผู้ป่วย
  text: string;
  timestamp: string;  // เช่น "5:48 PM"
  consultId: number;
  replies?: Message[];
}

interface DoctorChatBoxProps {
  consult: DoctorConsult;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const DoctorChatBox: React.FC<DoctorChatBoxProps> = ({
  consult,
  messages,
  setMessages,
}) => {
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const currentUser = "Doctor"; // ฝั่งหมอ

  // ส่งข้อความ
  const handleSend = () => {
    if (!message.trim()) return;

    // สร้าง message ใหม่
    const newMessage: Message = {
      id: Date.now(),
      user: currentUser,
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      consultId: consult.id,
      replies: [],
    };

    // ถ้ามี replyTo อยู่ แทรกลงใน replies
    if (replyTo) {
      setMessages((prev) => {
        return prev.map((m) => {
          if (m.id === replyTo.id) {
            return {
              ...m,
              replies: [...(m.replies || []), newMessage],
            };
          }
          return m;
        });
      });
      setReplyTo(null);
    } else {
      // ถ้าไม่มี replyTo ก็ push ปกติ
      setMessages((prev) => [...prev, newMessage]);
    }
    setMessage("");
  };

  // กด Enter เพื่อส่ง
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ฟังก์ชันแสดงข้อความ (ซ้อน replies)
  const renderMessages = (msgList: Message[]) => {
    return msgList.map((msg) => (
      <div key={msg.id} className="p-3 bg-white rounded-lg mb-3 border border-gray-200">
        <div className="flex justify-between">
          <p className="font-semibold text-black">{msg.user}</p>
          <p className="text-xs text-gray-500">{msg.timestamp}</p>
        </div>
        <p className="text-black mt-1">{msg.text}</p>
        {/* ปุ่ม reply */}
        <button
          className="mt-2 text-sm text-pink-500 hover:underline flex items-center gap-1"
          onClick={() => setReplyTo(msg)}
        >
          <CornerDownLeft size={16} /> Reply
        </button>
        {/* ถ้ามี replies ซ้อนอยู่ */}
        {msg.replies && msg.replies.length > 0 && (
          <div className="ml-4 border-l border-pink-300 pl-3 mt-2">
            {renderMessages(msg.replies)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg text-pink-800">
            Question: Consult #{consult.id}
          </h2>
          <p className="text-sm text-gray-500">Patient: {consult.patientName}</p>
        </div>
        {/* ตัวอย่างแสดง Avatar ผู้ป่วย (ถ้ามี) */}
        {consult.patientAvatar && (
          <img
            src={consult.patientAvatar}
            alt={consult.patientName}
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>

      {/* ส่วนแสดงข้อความ */}
      <div className="flex-1 overflow-y-auto bg-pink-50 p-4 rounded-lg shadow-inner border border-pink-100">
        {messages.length > 0 ? (
          renderMessages(messages)
        ) : (
          <p className="text-gray-500">No messages yet...</p>
        )}
      </div>

      {/* แถบ Reply */}
      {replyTo && (
        <div className="bg-pink-100 p-2 mt-2 rounded-md flex items-center justify-between">
          <span className="text-sm text-black">
            Replying to <b>{replyTo.user}</b>: {replyTo.text}
          </span>
          <button
            className="text-red-500 text-sm font-bold"
            onClick={() => setReplyTo(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* ช่องพิมพ์ข้อความ */}
      <div className="mt-4">
        <textarea
          className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Type your message..."
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DoctorChatBox;
