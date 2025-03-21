/* eslint-disable react-hooks/exhaustive-deps */
// (03:46) เหลือดึง CheckedBox กับแผนภูมิมาแสดง

"use client";

import React, { useState, useEffect } from "react";
import "./flipbook.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import DiaryCard from "../components/DiaryCard";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
import { parseCookies } from "../utils/cookies";

interface MessageProps {
  date: string;
  time: string;
  activity: string;
  symptom: string;
  painScore: number;
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
  const [_userInfo, setUserInfo] = useState({ citizenID: '', token: '', role: '' });
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [painData, setPainData] = useState<{ month: string; averagePain: number }[]>([]);
  
  useEffect(() => {
    const cookies = parseCookies();
    setUserInfo({
      citizenID: cookies.citizenID || '',
      token: cookies.token || '',
      role: cookies.role || '',
    });
  }, []);

  const fetchAllDiary = async () => {
    const path = process.env.NEXT_PUBLIC_BACK_END;

    try {
      const response = await fetch(`${path}/diaries/by-patient`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Citizen-ID": _userInfo.citizenID,
          "X-Role": _userInfo.role,
          "X-Token": _userInfo.token,
        },
      });
  
      if (response.status === 404) {
        console.log("No diary found for the date");
        setMessages([]);
        return;
      }
      const data = await response.json();
      const sortedData = data.sort((a: MessageProps, b: MessageProps) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setMessages(sortedData);
      console.log("fetch data", sortedData);
      console.log("fetch messages", messages);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  const fetchPainData = async () => {
    const path = process.env.NEXT_PUBLIC_BACK_END;

    try {
      const response = await fetch(`${path}/diaries/pain-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Citizen-ID": _userInfo.citizenID,
          "X-Role": _userInfo.role,
          "X-Token": _userInfo.token,
        },
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
    }, [_userInfo]);

  console.log(messages);

  const userInfo = {
    profilePic: "/Jud.jpg",
    name: messages.length > 0 ? messages[0].patientName : "Unknown",
    age: messages.length > 0 ? messages[0].patientAge : -1,
    gender: "ชาย",
    weight: "70 kg",
    height: "175 cm",
    bloodPressure: messages.length > 0 ? messages[0].patientHN : 0,
  };

  // const foods = [
  //   "ชา",
  //   "กาแฟ",
  //   "น้ำเย็น",
  //   "บุหรี่",
  //   "เหล้า",
  //   "เบียร์",
  //   "ข้าวเหนียว",
  //   "อาหารหมักดอง",
  //   "ไข่ไก่",
  //   "ปลาเค็ม",
  //   "ปลาร้า",
  //   "ไก่",
  //   "หมู",
  //   "วัว",
  //   "ปลาไม่มีเกล็ด",
  //   "เครื่องในสัตว์",
  //   "อาหารทะเล",
  //   "เส้นก๋วยเตี๋ยว",
  //   "อาหารแปรรูป",
  //   "มาม่า",
  //   "ปลากระป๋อง",
  // ];

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
  
  const today = (() => {
    const now = new Date();
    const yyyy = now.getFullYear(); // ปี ค.ศ. 4 หลัก
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // เดือน 2 หลัก
    const dd = String(now.getDate()).padStart(2, "0"); // วันที่ 2 หลัก
    return `${yyyy}-${mm}-${dd}`;
  })();  
  const todayIndex = adjustedEntries.findIndex(entry => entry?.date === today);
  const summaryPageIndex = adjustedEntries.length;  // Summary หลังหน้าสุดท้ายของ entries
  const chartPageIndex = adjustedEntries.length + 1; // Chart เป็นหน้าสุดท้าย
  
  const [currentPage, setCurrentPage] = useState(
    todayIndex !== -1
      ? todayIndex % 2 === 0
        ? todayIndex
        : Math.max(todayIndex - 1, 0)
      : 0 // Default to first page if today is not found
  );
  
  const canGoPrevious = currentPage > 1;

const handleGoPrevious = () => {
  // ไปหน้าก่อนหน้า (ถ้ามี)
  if (canGoPrevious) {
    setCurrentPage(prev => prev - 2);
  }
};

const handleGoToday = () => {
  // ไปหน้าที่เป็น "วันนี้"
  setCurrentPage(todayIndex % 2 === 0 ? todayIndex : Math.max(todayIndex + 1, 0));
};
  const canGoNext = currentPage < chartPageIndex;
  
  return (
    <div className="center">
      <div className="book-container">
      <button className="clip-marker diary-marker" onClick={handleGoToday}>
          <span className="noto-sans-thai">บันทึกวันนี้</span>
        </button>
        <button className="clip-marker followup-marker" onClick={() => setCurrentPage(chartPageIndex)}>
          <span className="noto-sans-thai">สรุปผล</span>
        </button>
        <div className="book">
          <button
            className="nav-button left"
            onClick={handleGoPrevious}
            disabled={!canGoPrevious}
          >
            <SlArrowLeft />
          </button>
  
          <div className="pages">
            {adjustedEntries.map((_, index) => {
              if (index % 2 !== 0) return null;
              const leftIndex = index;
              const rightIndex = index + 1;
              console.log("leftIndex: ", leftIndex);
              console.log("rightIndex: ", rightIndex);
  
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
