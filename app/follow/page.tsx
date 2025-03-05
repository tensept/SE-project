// (03:46) เหลือดึง CheckedBox กับแผนภูมิมาแสดง

"use client";

import React, { useState, useEffect } from "react";
import "./flipbook.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import DiaryCard from "../components/DiaryCard";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";

interface MessageProps {
  date: string;
  time: string;
  activity: string;
  symptom: string;
  painLevel: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  food: boolean[];
  patientName: string;
  patientAge: string;
  patientHN: string;
}

interface DiaryEntry {
  date: string;
  time: string;
  activity: string;
  symptom: string;
  painLevel: number;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  selectedFoods: string[]; // ✅ เพิ่ม prop นี้
}

const FlipBook: React.FC = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [painData, setPainData] = useState<{ month: string; averagePain: number }[]>([]);
  
  const fetchAllDiary = async () => {

    const path = process.env.NEXT_PUBLIC_BACK_END;
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${path}/diaries/by-patient`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        }
      });
  
      if (response.status === 404) {
        console.log("No diary found for the date");
        setMessages([]);
        return;
      }
      const data = await response.json();
      setMessages(data);
      console.log("fetch data", data);
      console.log("fetch messages", messages);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
    
  };

  const fetchPainData = async () => {
    const path = process.env.NEXT_PUBLIC_BACK_END;
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${path}/diaries/pain-data`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        }
      });

      if (response.status === 404) {
        console.log("No pain data found for the date");
        setPainData([]);
        return;
      }

      const data = await response.json();
      console.log("fetch pain data", data);
      setPainData(data);
    } catch (error) {
      console.error("Error fetching pain data:", error);
    }
  };

  useEffect(() => {
      fetchAllDiary();
      fetchPainData();
    }, []);

  console.log(messages);

  const userInfo = {
    profilePic: "/Jud.jpg",
    name: messages.length > 0 ? messages[0].patientName : "Unknown",
    age: messages.length > 0 ? messages[0].patientAge : -1,
    gender: "Male",
    weight: "70 kg",
    height: "175 cm",
    bloodPressure: messages.length > 0 ? messages[0].patientHN : 0,
  };

  const foods = [
    "ชา",
    "กาแฟ",
    "น้ำเย็น",
    "บุหรี่",
    "เหล้า",
    "เบียร์",
    "ข้าวเหนียว",
    "อาหารหมักดอง",
    "ไข่ไก่",
    "ปลาเค็ม",
    "ปลาร้า",
    "ไก่",
    "หมู",
    "วัว",
    "ปลาไม่มีเกล็ด",
    "เครื่องในสัตว์",
    "อาหารทะเล",
    "เส้นก๋วยเตี๋ยว",
    "อาหารแปรรูป",
    "มาม่า",
    "ปลากระป๋อง",
  ];

  const entries: (DiaryEntry | null)[] = Array.isArray(messages) ? messages.map((message) => ({
    date: message.date,
    time: message.time,
    activity: message.activity,
    symptom: message.symptom,
    painLevel: message.painScore,
    meals: {
      breakfast: message.breakfast,
      lunch: message.lunch,
      dinner: message.dinner,
    },
    selectedFoods: [],
  })) : [];
  
  const adjustedEntries = [...entries];

  // เช็คว่าจำนวน entries เป็น "คู่" หรือไม่
  const isEven = adjustedEntries.length % 2 === 0;
  
  // ถ้าเป็นคู่ → เพิ่ม null ชั่วคราว
  if (isEven) {
    adjustedEntries.unshift(null);
  }
  
  const today = "26 February 2025";
  const todayIndex = adjustedEntries.findIndex(entry => entry?.date === today);
  const summaryPageIndex = adjustedEntries.length;  // Summary หลังหน้าสุดท้ายของ entries
  const chartPageIndex = adjustedEntries.length + 1; // Chart เป็นหน้าสุดท้าย
  
  const [currentPage, setCurrentPage] = useState(
    todayIndex % 2 === 0 ? todayIndex : Math.max(todayIndex - 1, 0)
  );
  
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < chartPageIndex;
  // const calculatePainData = () => {
  //   const monthlyData: { [key: string]: { total: number; days: number } } = {};
  
  //   entries.forEach((entry) => {
  //     if (!entry) return;
  //     const [, month] = entry.date.split(" "); // ดึงเฉพาะชื่อเดือน
  //     if (!monthlyData[month]) monthlyData[month] = { total: 0, days: 0 };
  
  //     monthlyData[month].total += entry.painLevel;
  //     monthlyData[month].days += 1;
  //   });
  
  //   return Object.keys(monthlyData).map((month) => ({
  //     month,
  //     averagePain:
  //       (monthlyData[month].total / (monthlyData[month].days * 10)) * 100, // คำนวณเป็นเปอร์เซ็นต์
  //   }));
  // };
  
  
  
  return (
    <div className="center">
      <div className="book-container">
      <button className="clip-marker diary-marker" onClick={() => setCurrentPage(todayIndex)}>
          <span>Diary</span>
        </button>
        <button className="clip-marker followup-marker" onClick={() => setCurrentPage(chartPageIndex)}>
          <span>Follow-up</span>
        </button>
        <div className="book">
          <button
            className="nav-button left"
            onClick={() => setCurrentPage((prev) => prev - 2)}
            disabled={!canGoPrevious}
          >
            <SlArrowLeft />
          </button>
  
          <div className="pages">
            {adjustedEntries.map((_, index) => {
              if (index % 2 !== 0) return null;
              const leftIndex = index;
              const rightIndex = index + 1;
  
              return (
                <div
                  key={index}
                  className={`page ${index === currentPage ? "active" : ""}`}
                  style={{
                    transform: index < currentPage ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.5s ease-in-out",
                    zIndex: index === currentPage ? "9999" : "9998",
                  }}
                >
                  {/* Left Page */}
                  <div className="page-side front w-full h-full flex items-center justify-center">
                    {adjustedEntries[leftIndex] ? (
                      <DiaryCard key={`left-${leftIndex}`} {...adjustedEntries[leftIndex]} />
                    ) : (
                      <div className="empty-page"></div>
                    )}
                  </div>
  
                  {/* Right Page */}
                  <div className="page-side back w-full h-full flex items-center justify-center">
                    {adjustedEntries[rightIndex] ? (
                      <DiaryCard key={`right-${rightIndex}`} {...adjustedEntries[rightIndex]} />
                    ) : rightIndex === summaryPageIndex ? (
                      <SummaryCard
                        user={{
                          name: userInfo.name,
                          age: userInfo.age,
                          gender: userInfo.gender,
                          weight: parseInt(userInfo.weight),
                          height: parseInt(userInfo.height),
                          bloodPressure: userInfo.bloodPressure,
                          profileImage: userInfo.profilePic,
                        }}
                        painData = {painData}
                      />
                    ) : (
                      <div className="empty-page">Empty Page</div>
                    )}
                  </div>
                </div>
              );
            })}
  
            {/* แสดง Chart ถ้าถึงหน้าสุดท้าย */}
            {currentPage >= chartPageIndex && (
              <div className="page active">
                <div className="page-side front w-full h-full flex items-center justify-center">
                <ChartCard painData = {painData} />
                </div>
              </div>
            )}
          </div>
  
          <button
            className="nav-button right"
            onClick={() => setCurrentPage((prev) => prev + 2)}
            disabled={!canGoNext}
          >
            <SlArrowRight />
          </button>
        </div>
      </div>
    </div>
  );

};

export default FlipBook;