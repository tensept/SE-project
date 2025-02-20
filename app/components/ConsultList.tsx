"use client";
import React from "react";
import { Plus, Heart, Trash2 } from "lucide-react";

interface Chat {
  id: number;
  title: string;
  description: string;
  pinned: boolean;
}

interface ConsultListProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  onAddChat: () => void;
  onToggleFavorite: (id: number) => void;
  onDeleteChat: (id: number) => void;
}

const ConsultList: React.FC<ConsultListProps> = ({ chats, onSelectChat, onAddChat, onToggleFavorite, onDeleteChat }) => {
  return (
    <div className="w-1/3 bg-white p-4 shadow-md h-screen overflow-y-auto relative">
      <h2 className="text-xl font-bold text-black mb-4">Consult</h2>
      <ul className="space-y-4">
        {chats.map((q) => (
          <li
            key={q.id}
            className="p-4 border rounded-lg text-black hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            onClick={() => onSelectChat(q)}
          >
            <div>
              <h3 className="font-semibold">{q.title}</h3>
              <p className="text-gray-600">{q.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(q.id); }}
                className={`p-2 rounded-full hover:bg-gray-200 ${q.pinned ? "text-red-500" : "text-gray-400"}`}
              >
                <Heart size={20} fill={q.pinned ? "currentColor" : "none"} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); onDeleteChat(q.id); }}
                className="p-2 rounded-full text-red-500 hover:bg-gray-200"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <button
        className="absolute bottom-4 right-4 w-12 h-12 bg-pink-500 text-white text-xl flex items-center justify-center rounded-full shadow-lg hover:bg-pink-600 transition-all"
        onClick={onAddChat}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default ConsultList;
