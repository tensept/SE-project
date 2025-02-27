// (03:46) เหลือดึง CheckedBox กับแผนภูมิมาแสดง

"use client";

import React, { useState, useEffect } from "react";
import "../follow/flipbook.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import DiaryCard from "../components/DiaryCard";
import SummaryCard from "../components/SummaryCard";
import ChartCard from "../components/ChartCard";
<<<<<<< HEAD
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
=======

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
  patient: {
    name: string;
  };
}
>>>>>>> 5d2e05e79a56747bd84e44b2da5264d5bc9856df

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
<<<<<<< HEAD
  const userInfo = {
    profilePic: "/Jud.jpg",
    name: "John Doe",
    age: 30,
=======
  const [messages, setMessages] = useState<MessageProps[]>([]);
  
  const fetchAllDiary = async () => {
    try {
      const response = await fetch(`http://localhost:1234/diaries/1`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 404) {
        console.log("No diary found for the date");
        setMessages([]);
        return;
      }
      const data = await response.json();
      setMessages(data);
      console.log("data", data);
      console.log("messages", messages);
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
    
  };

  useEffect(() => {
      fetchAllDiary();
    }, []);

  const userInfo = {
    profilePic: "/Jud.jpg",
    name: messages.length > 0 ? messages[0].patient.name : "Unknown",
    age: messages.length > 0 ? messages[0].patient.age : -1,
>>>>>>> 5d2e05e79a56747bd84e44b2da5264d5bc9856df
    gender: "Male",
    weight: "70 kg",
    height: "175 cm",
    bloodPressure: messages.length > 0 ? messages[0].patient.HN : 0,
  };

<<<<<<< HEAD
  const entries: (DiaryEntry | null)[] = [
      // ✅ November 2024
      { "date": "05 November 2024", "time": "6:45 AM", "activity": "Jogging", "symptom": "Slight Knee Pain", "painLevel": 2, "meals": { "breakfast": "Omelet", "lunch": "Grilled Chicken", "dinner": "Soup" }, "selectedFoods": ["Omelet", "Grilled Chicken"] },  
      { "date": "10 November 2024", "time": "7:30 PM", "activity": "Yoga", "symptom": "Relaxed", "painLevel": 1, "meals": { "breakfast": "Smoothie", "lunch": "Quinoa Salad", "dinner": "Grilled Fish" }, "selectedFoods": ["Smoothie", "Quinoa Salad"] },  
      { "date": "15 November 2024", "time": "5:00 PM", "activity": "Swimming", "symptom": "Sore Shoulders", "painLevel": 3, "meals": { "breakfast": "Toast", "lunch": "Pasta", "dinner": "Roast Beef" }, "selectedFoods": ["Toast", "Pasta"] },  
      { "date": "20 November 2024", "time": "6:15 PM", "activity": "Cycling", "symptom": "Tired", "painLevel": 2, "meals": { "breakfast": "Yogurt", "lunch": "Rice & Chicken", "dinner": "Steak" }, "selectedFoods": ["Yogurt", "Rice & Chicken"] },  
      { "date": "25 November 2024", "time": "8:00 AM", "activity": "Hiking", "symptom": "None", "painLevel": 1, "meals": { "breakfast": "Oatmeal", "lunch": "Sandwich", "dinner": "Grilled Vegetables" }, "selectedFoods": ["Oatmeal", "Sandwich"] },  
      
      { "date": "05 December 2024", "time": "6:30 PM", "activity": "Weight Training", "symptom": "Sore Arms", "painLevel": 4, "meals": { "breakfast": "Eggs", "lunch": "Salad", "dinner": "Fish & Rice" }, "selectedFoods": ["Eggs", "Salad"] },  
      { "date": "12 December 2024", "time": "7:00 AM", "activity": "Running", "symptom": "Ankle Pain", "painLevel": 3, "meals": { "breakfast": "Pancakes", "lunch": "Chicken Wrap", "dinner": "Soup" }, "selectedFoods": ["Pancakes", "Chicken Wrap"] },  
      { "date": "18 December 2024", "time": "5:45 PM", "activity": "Dancing", "symptom": "None", "painLevel": 1, "meals": { "breakfast": "Fruit Salad", "lunch": "Sushi", "dinner": "Steak" }, "selectedFoods": ["Fruit Salad", "Sushi"] },  
      { "date": "22 December 2024", "time": "6:00 PM", "activity": "Meditation", "symptom": "Calm", "painLevel": 1, "meals": { "breakfast": "Smoothie Bowl", "lunch": "Rice & Beans", "dinner": "Grilled Salmon" }, "selectedFoods": ["Smoothie Bowl", "Rice & Beans"] },  
      { "date": "28 December 2024", "time": "8:30 PM", "activity": "Stretching", "symptom": "Relaxed", "painLevel": 1, "meals": { "breakfast": "Muffin", "lunch": "Pasta", "dinner": "Roast Chicken" }, "selectedFoods": ["Muffin", "Pasta"] },  
      
      { "date": "25 February 2025", "time": "5:48 PM", "activity": "เดินขึ้นลงบันได 20 นาที", "symptom": "เจ็บข้อเท้านิดหน่อย", "painLevel": 2, "meals": { "breakfast": "แพนเค้ก + กาแฟ", "lunch": "ข้าวคลุกกะปิ", "dinner": "แกงจืดเต้าหู้หมูสับ" }, "selectedFoods": ["กาแฟ", "ข้าวเหนียว"] },  
      { "date": "26 February 2025", "time": "0:30 AM", "activity": "นอนดึก", "symptom": "รู้สึกปวดหัวเล็กน้อย", "painLevel": 2, "meals": { "breakfast": "โอวัลติน + ขนมปัง", "lunch": "ก๋วยเตี๋ยวเรือ", "dinner": "ไข่ตุ๋น + ข้าว" }, "selectedFoods": ["โอวัลติน", "ขนมปัง"] }  
      ];
      
    
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]); // ✅ เก็บค่าที่บันทึกแล้ว
=======
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
>>>>>>> 5d2e05e79a56747bd84e44b2da5264d5bc9856df

  const entries: (DiaryEntry | null)[] = messages.map((message) => ({
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
  }));
      
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
  
  const canGoPrevious = currentPage > 2;
  const canGoNext = currentPage < chartPageIndex;
  const calculatePainData = () => {
    const monthlyData: { [key: string]: { total: number; days: number } } = {};
  
    entries.forEach((entry) => {
      if (!entry) return;
      const [, month] = entry.date.split(" "); // ดึงเฉพาะชื่อเดือน
      if (!monthlyData[month]) monthlyData[month] = { total: 0, days: 0 };
  
      monthlyData[month].total += entry.painLevel;
      monthlyData[month].days += 1;
    });
  
    return Object.keys(monthlyData).map((month) => ({
      month,
      averagePain:
        (monthlyData[month].total / (monthlyData[month].days * 10)) * 100, // คำนวณเป็นเปอร์เซ็นต์
    }));
  };
  
  
  
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
                      <div className="empty-page">Empty Page</div>
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
                        painData={calculatePainData()}
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
                <ChartCard painData={calculatePainData()} />
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