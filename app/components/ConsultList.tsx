"use client";
import React from "react";
import { Plus } from "lucide-react";

interface Chat {
  id: number;
  title: string;
  description: string;
}
interface ConsultListProps {
    chats: Chat[];
    onSelectChat: (chat: Chat) => void;
    onAddChat: () => void;
  }
  
  const ConsultList: React.FC<ConsultListProps> = ({ chats, onSelectChat, onAddChat }) => {
    return (
      <div className="w-1/3 bg-white p-4 shadow-md h-screen overflow-y-auto relative">
        <h2 className="text-xl font-bold text-black  mb-4">Consult</h2>
        <ul className="space-y-4">
          {chats.map((q) => (
            <li
              key={q.id}
              className="p-4 border rounded-lg text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectChat(q)}
            >
              <h3 className="font-semibold">{q.title}</h3>
              <p className="text-gray-600">{q.description}</p>
            </li>
          ))}
        </ul>
        <button
            className="absolute bottom-4 right-4 w-12 h-12 bg-pink-500 text-white text-xl flex items-center justify-center rounded-full shadow-lg hover:bg-pink-600 transition-all"
            onClick={onAddChat}
            >
            +
            </button>

      </div>
    );
  };
  
  export default ConsultList;
  