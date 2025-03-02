"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDoctorContext } from "./DoctorContext";
import MessageItem from "../components/MessageItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../doctor/datepicker.css";

const Page: React.FC = () => {
  const { messages, date, setDate, markMessageAsRead, setDiaryId } = useDoctorContext();
  const [isDateChanged] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null); // ใช้ ref อ้างอิงปฏิทิน

  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  // 📌 ฟังก์ชันตรวจจับการคลิกข้างนอก แล้วปิดปฏิทิน
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center relative">
            <button
              className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg"
              onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
            >
              ◀
            </button>

            {/* 📌 คลิกเพื่อเปิดปฏิทิน */}
            <span
              className={`font-medium text-lg transition-colors duration-500 cursor-pointer ${
                isDateChanged ? "text-[#FB6F92]" : "text-gray-800"
              } mx-6`}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {formattedDate}
            </span>

            {/* 📌 ปฏิทิน */}
            {showCalendar && (
              <div
                ref={calendarRef} // ใช้ ref เพื่อเช็คการคลิกข้างนอก
                className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-2 rounded-md z-10"
              >
                <DatePicker
                  selected={date}
                  onChange={(newDate) => {
                    if (newDate) {
                      setDate(newDate);
                      setShowCalendar(false); // ✅ ปิดปฏิทินเมื่อเลือกวัน
                    }
                  }}
                  inline
                  calendarClassName="custom-calendar"
                  showMonthDropdown
                   showYearDropdown
                   dropdownMode="select" // ทำให้สามารถเลือกเดือน/ปีได้ง่ายขึ้น
                />
              </div>
            )}

            <button
              className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg"
              onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
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
              patientId={message.patientId}
              markAsRead={markMessageAsRead}
              onClick={setDiaryId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;






// "use client";

// import React, { useState, useEffect } from "react";
// import { useDoctorContext } from "./DoctorContext";
// import MessageItem from "../components/MessageItem";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../doctor/datepicker.css"; 

// const Page: React.FC = () => {
//   const { messages, date, setDate, markMessageAsRead, setDiaryId } = useDoctorContext();
//   const [isDateChanged, setIsDateChanged] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

//   const handlePreviousDate = () => {
//     const newDate = new Date(date);
//     newDate.setDate(date.getDate() - 1);
//     setDate(newDate);
//     setIsDateChanged(true);
//   };

//   const handleNextDate = () => {
//     const newDate = new Date(date);
//     newDate.setDate(date.getDate() + 1);
//     setDate(newDate);
//     setIsDateChanged(true);
//   };

//   useEffect(() => {
//     if (isDateChanged) {
//       setIsDateChanged(false);
//     }
//   }, [date]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <div className="flex-1 p-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center relative">
//             <button
//               className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg"
//               onClick={handlePreviousDate}
//             >
//               ◀
//             </button>

//             // กดที่วันที่เพื่อเปิดปฏิทิน 
//             <span
//               className={`font-medium text-lg transition-colors duration-500 cursor-pointer ${
//                 isDateChanged ? "text-[#FB6F92]" : "text-gray-800"
//               } mx-6`}
//               onClick={() => setShowCalendar(!showCalendar)}
//             >
//               {formattedDate}
//             </span>

//             // แสดงปฏิทินเมื่อกดวันที่ */
//             {showCalendar && (
//               <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg- shadow-lg p-2 rounded-md z-10">
//                 <DatePicker
//                   selected={date}
//                   onChange={(newDate) => {
//                     if (newDate) {
//                       setDate(newDate);
//                       setShowCalendar(false); // ปิดปฏิทินเมื่อเลือกวันแล้ว
//                     }
//                   }}
//                   inline
//                   calendarClassName="custom-calendar" // ใช้ className ที่กำหนดใน CSS
//                   showMonthDropdown
//                   showYearDropdown
//                   dropdownMode="select" // ทำให้สามารถเลือกเดือน/ปีได้ง่ายขึ้น
//                 />
//               </div>
//             )}

//             <button
//               className="p-3 bg-gray-200 rounded-full shadow-md hover:shadow-lg"
//               onClick={handleNextDate}
//             >
//               ▶
//             </button>
//           </div>
//         </div>

//         <div className="border-b mb-4"></div>

//         <div className="space-y-1">
//           {messages.map((message) => (
//             <MessageItem
//               key={message.id}
//               sender={message.sender}
//               time={message.time}
//               isRead={message.isRead}
//               id={message.id}
//               date={message.date}
//               patientId={message.patientId}
//               markAsRead={markMessageAsRead}
//               onClick={setDiaryId}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;


// showMonthDropdown
//                   showYearDropdown
//                   dropdownMode="select" // ทำให้สามารถเลือกเดือน/ปีได้ง่ายขึ้น