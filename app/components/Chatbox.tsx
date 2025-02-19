"use client";

import { useState } from "react";
import { Bell, MoreVertical, CornerDownLeft, Plus } from "lucide-react";

interface Message {
  id: number;
  text: string;
  user: string;
  chatId: number; // ผูกกับแชทที่เลือก
  replyTo?: number | null;
  replies?: Message[];
}

interface ChatBoxProps {
  selectedChat: { id: number; title: string; description: string };
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  currentUser?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedChat, messages, setMessages, currentUser = "Anna" }) => {
  const [message, setMessage] = useState<string>("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const maxLength = 250;

  const addMessage = (msgList: Message[], newMessage: Message, parentId: number): Message[] => {
    return msgList.map((msg) => {
      if (msg.id === parentId) {
        return { ...msg, replies: [...(msg.replies || []), newMessage] };
      } else if (msg.replies) {
        return { ...msg, replies: addMessage(msg.replies, newMessage, parentId) };
      }
      return msg;
    });
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        user: currentUser,
        chatId: selectedChat.id,
        replyTo: replyTo ? replyTo.id : null,
        replies: [],
      };

      setMessages((prev) =>
        replyTo ? addMessage(prev, newMessage, replyTo.id) : [...prev, newMessage]
      );

      setMessage("");
      setReplyTo(null);
    }
  };

  const handleReply = (msg: Message) => {
    setReplyTo(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessages = (msgList: Message[], depth = 0): JSX.Element[] => {
    return msgList
      .filter((msg) => msg.chatId === selectedChat.id) // แสดงเฉพาะข้อความของแชทที่เลือก
      .map((msg) => (
        <div key={msg.id} className={`p-3 text-black bg-gray-${100 + depth * 50} rounded-lg mb-3 ml-${depth * 4} shadow-sm border border-gray-300`}>
          <p className="text-sm font-bold text-black">{msg.user}:</p>
          <p>{msg.text}</p>
          <button className="mt-2 flex items-center gap-1 text-pink-500 text-sm font-semibold hover:bg-pink-100 px-2 py-1 rounded-md transition-all"
            onClick={() => handleReply(msg)}>
            <CornerDownLeft size={16} /> Reply
          </button>
          {msg.replies && msg.replies.length > 0 && (
            <div className="ml-4 border-l-2 text-black border-pink-300 pl-2 mt-2">
              {renderMessages(msg.replies, depth + 1)}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="w-[60%] bg-pink-100 h-screen p-6 flex flex-col ml-[5%] rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <h2 className="font-bold text-black text-lg">{currentUser}</h2>
            <p className="text-sm text-black">User</p>
          </div>
        </div>
        <div className="flex space-x-3 text-black">
          <Bell className="cursor-pointer" size={20} />
          <MoreVertical className="cursor-pointer" size={20} />
          <Plus className="cursor-pointer" size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-inner border border-black">
        {messages.length > 0 ? renderMessages(messages) : (
          <p className="text-gray-500 text-sm">Start typing your message...</p>
        )}
      </div>

      {replyTo && (
        <div className="p-3 bg-pink-200 rounded-md mt-2 text-sm flex justify-between items-center border-l-4 border-pink-500">
          <span className="font-medium">Replying to {replyTo.user}: {replyTo.text}</span>
          <button className="text-red-500 text-xs font-bold" onClick={() => setReplyTo(null)}>Cancel</button>
        </div>
      )}

      <div className="mt-4 relative">
        <textarea
          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Type here..."
          maxLength={maxLength}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Chat message input"
        />
        <div className="text-right text-black text-sm">{message.length}/{maxLength}</div>
        {message.trim() && (
          <button
            onClick={handleSend}
            className="w-full mt-3 py-2 rounded-full text-lg font-semibold bg-pink-500 text-white hover:bg-pink-600 transition-all"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
