"use client";
import React from "react";

interface DoctorConsult {
  id: number;
  patientName: string;
  patientAvatar?: string;
  date: string;
  time: string;
  status: "read" | "unread";
}

interface DoctorConsultListProps {
  consults: DoctorConsult[];
  onSelectConsult: (consult: DoctorConsult) => void;
}

const DoctorConsultList: React.FC<DoctorConsultListProps> = ({
  consults,
  onSelectConsult,
}) => {
  // 1) จัดกลุ่ม consult ตามวันที่ (เผื่อจะแสดง "19 Feb 2025" แล้วลิสต์)
  const consultsByDate = consults.reduce<Record<string, DoctorConsult[]>>(
    (acc, c) => {
      if (!acc[c.date]) {
        acc[c.date] = [];
      }
      acc[c.date].push(c);
      return acc;
    },
    {}
  );

  return (
    <div className="w-1/4 bg-white p-4 shadow-md h-screen overflow-y-auto">
      <h2 className="text-xl font-bold text-black mb-4">Consult</h2>

      {/* วนลูปตามวันที่ */}
      {Object.entries(consultsByDate).map(([date, items]) => (
        <div key={date} className="mb-6">
          {/* แสดงวันที่ */}
          <div className="text-gray-500 font-semibold mb-2">{date}</div>
          
          {/* วนลูป consult ของวันนั้น */}
          {items.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectConsult(c)}
              className="p-4 bg-pink-50 rounded-lg mb-3 cursor-pointer hover:bg-pink-100 transition-colors flex items-center justify-between"
            >
              {/* ซีกซ้าย: รูป + ชื่อ + เวลา */}
              <div className="flex items-center">
                {/* ถ้ามี avatar ให้แสดง ไม่มีก็เป็นวงกลมเทา + ? */}
                {c.patientAvatar ? (
                  <img
                    src={c.patientAvatar}
                    alt={c.patientName}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-500">?</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-black font-semibold">{c.patientName}</span>
                  <span className="text-xs text-gray-500">{c.time}</span>
                </div>
              </div>

              {/* ซีกขวา: สถานะ (read/unread) */}
              <div className="text-xs text-gray-500 ml-4">
                {c.status === "read" ? (
                  <span className="text-blue-500">read</span>
                ) : (
                  <span className="text-red-500">unread</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DoctorConsultList;
