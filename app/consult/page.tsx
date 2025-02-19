"use client";
import { useState } from "react";
import ConsultList from "../components/ConsultList";
import ChatBox from "../components/Chatbox";

interface Chat {
  id: number;
  title: string;
  description: string;
}

interface Message {
  id: number;
  text: string;
  user: string;
  chatId: number; // เก็บว่าเป็นของแชทไหน
  replyTo?: number | null;
}

export default function ConsultPage() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, title: "Question 1", description: "Description" },
  ]);
  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);
  const [messages, setMessages] = useState<Message[]>([]);

  const addChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: `Question ${chats.length + 1}`,
    //   description: "New supporting text...",
    };

    setChats([...chats, newChat]);
    setMessages([...messages]); // ให้แชทใหม่ไม่มีข้อความ
    setSelectedChat(newChat);
  };

  return (
    <main className="flex min-h-screen bg-white relative">
      <ConsultList chats={chats} onSelectChat={setSelectedChat} onAddChat={addChat} />
      <ChatBox selectedChat={selectedChat} messages={messages} setMessages={setMessages} />
    </main>
  );
}
