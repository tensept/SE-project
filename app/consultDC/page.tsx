"use client";
import { useState } from "react";
import DoctorChatBox from "../components/DoctorChatBox";
import DoctorConsultList from "../components/DoctorConsultList";  
import Image from "next/image";      

// ประเภทข้อมูล Consult
interface DoctorConsult {
  id: number;
  patientName: string;
  patientAvatar?: string; // URL รูปโปรไฟล์ผู้ป่วย
  date: string;           // เช่น "19 Feb 2025"
  time: string;           // เช่น "5:48 PM"
  status: "read" | "unread";
}

// ประเภทข้อมูลข้อความ (ในแชท)
interface Message {
  id: number;
  user: string;       // "Doctor" หรือชื่อคนไข้
  text: string;
  timestamp: string;  // "5:48 PM"
  consultId: number;  // ผูกกับ consult ไหน
  replies?: Message[];
}

// ตัวอย่าง mock data รายการ Consult ที่มีวัน/เวลา/ชื่อผู้ป่วย/สถานะ
const mockConsults: DoctorConsult[] = [
  {
    id: 1,
    patientName: "Guillermo Rauch",
    patientAvatar: "/Chang.jpg",
    date: "19 Feb 2025",
    time: "5:48 PM",
    status: "read",
  },
  {
    id: 2,
    patientName: "Anna",
    patientAvatar: "/Jew.jpg",
    date: "19 Feb 2025",
    time: "6:10 PM",
    status: "unread",
  },
  {
    id: 3,
    patientName: "John Doe",
    patientAvatar: "/Jud.jpg",
    date: "18 Feb 2025",
    time: "2:15 PM",
    status: "read",
  },
];

// ตัวอย่าง mock data ข้อความในแชท
const mockMessages: Message[] = [
  {
    id: 101,
    user: "Anna",
    text: "สวัสดีค่ะ คุณหมอ",
    timestamp: "6:10 PM",
    consultId: 2,
  },
  {
    id: 102,
    user: "Doctor",
    text: "สวัสดีครับ มีอาการเป็นอย่างไรบ้าง?",
    timestamp: "6:12 PM",
    consultId: 2,
  },
  {
    id: 201,
    user: "Guillermo Rauch",
    text: "Hello doctor, I have a headache.",
    timestamp: "5:48 PM",
    consultId: 1,
  },
];

export default function DoctorConsultPage() {
  // state เก็บ consult ทั้งหมด (mock)
  const [consults, setConsults] = useState<DoctorConsult[]>(mockConsults);

  // state เก็บข้อความทั้งหมด (mock)
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // เลือก consult ปัจจุบัน (เริ่มต้นเป็นอันแรก)
  const [selectedConsult, setSelectedConsult] = useState<DoctorConsult | null>(
    consults.length > 0 ? consults[0] : null
  );

  // ฟังก์ชันสำหรับคลิกเลือก consult
  const handleSelectConsult = (consult: DoctorConsult) => {
    setSelectedConsult(consult);
    // อาจเปลี่ยนสถานะ consult เป็น read หากยัง unread
    if (consult.status === "unread") {
      setConsults((prev) =>
        prev.map((c) =>
          c.id === consult.id ? { ...c, status: "read" } : c
        )
      );
    }
  };

  return (
    <div className="flex h-screen bg-pink-50">

      {/* Consult List (รายการ consult) */}
      <DoctorConsultList
        consults={consults}
        onSelectConsult={handleSelectConsult}
      />

      {/* ChatBox (ถ้าเลือก consult แล้ว) */}
      {selectedConsult && (
        <DoctorChatBox
          consult={selectedConsult}
          messages={messages.filter((m) => m.consultId === selectedConsult.id)}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}
