"use client";
import { useState, useEffect } from "react";
import ConsultList from "../components/ConsultList";
import ChatBox from "../components/Chatbox";

interface Chat {
  id: number;
  title: string;
  description: string;
  pinned: boolean;
}

interface Message {
  id: number;
  text: string;
  user: string;
  chatId: number;
  timestamp: string;
  replyTo?: number | null;
}

export default function ConsultPage() {
  const [chats, setChats] = useState<Chat[]>(() => {
    return JSON.parse(localStorage.getItem("chats") || "[]") || [];
  });

  const [selectedChat, setSelectedChat] = useState<Chat | null>(
    chats[0] || null
  );
  const [messages, setMessages] = useState<Message[]>(() => {
    return JSON.parse(localStorage.getItem("messages") || "[]") || [];
  });

  const postConsult = async () => {
    try {
      const response = await fetch(`http://localhost:1234/consults/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          patient: 1,
          consultId: 0,
          question: "",
          answer: "",
          reply: "",
        },
      });

      if (response.status === 404) {
        console.log("Cannot POST Consult");
        setMessages([]);
        return;
      }
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const addChat = () => {
    const newChat: Chat = {
      id: Date.now(),
      title: `Question ${chats.length + 1}`,
      description: "New supporting text...",
      pinned: false,
    };

    setChats([...chats, newChat]);
    setSelectedChat(newChat);
  };

  const deleteChat = (id: number) => {
    setChats(chats.filter((chat) => chat.id !== id));
    setMessages(messages.filter((msg) => msg.chatId !== id));

    if (selectedChat?.id === id) {
      setSelectedChat(chats.length > 1 ? chats[0] : null);
    }
  };

  const onToggleFavorite = (id: number) => {
    setChats(
      chats.map((chat) =>
        chat.id === id ? { ...chat, pinned: !chat.pinned } : chat
      )
    );
  };

  return (
    <main className="flex min-h-screen bg-white relative">
      <ConsultList
        chats={chats}
        onSelectChat={setSelectedChat}
        onAddChat={addChat}
        onToggleFavorite={onToggleFavorite}
        onDeleteChat={deleteChat}
      />
      {selectedChat && (
        <ChatBox
          selectedChat={selectedChat}
          messages={messages.filter((msg) => msg.chatId === selectedChat.id)}
          setMessages={setMessages}
        />
      )}
    </main>
  );
}
