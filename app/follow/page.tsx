"use client";
import React, { useState, useEffect } from "react";
import "../follow/flipbook.css"; 
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import DiaryCard from '../components/DiaryCard';
import SummaryCard from '../components/SummaryCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DiaryEntry {
<<<<<<< HEAD
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
}

=======
    date: string;
    time: string;
    symptom: string;
    painLevel: number;
    meals: {
      breakfast: string;
    };
  }

  
>>>>>>> bda4de12bd6b9939c11a4151bc63c124b81aa6ea
const FlipBook: React.FC = () => {
  const userInfo = {
    profilePic: "/Jud.jpg",
    name: "John Doe",
    age: 30,
    gender: "Male",
    weight: "70 kg",
    height: "175 cm",
    bloodPressure: "120/80",
  };

  const [entries, setEntries] = useState<DiaryEntry[]>([
    { date: '29 December 2023', time: '6:00 PM', activity: '', symptom: '', painLevel: 3, meals: { breakfast: '', lunch: '', dinner: ''} },
    { date: '30 December 2023', time: '5:30 PM', activity: '', symptom: '', painLevel: 1, meals: { breakfast: '', lunch: '', dinner: '' } },
    { date: '31 December 2023', time: '5:48 PM', activity: '', symptom: '', painLevel: 2, meals: { breakfast: '', lunch: '', dinner: '' } },
    { date: '1 January 2024', time: '6:48 PM', activity: '', symptom: '', painLevel: 2, meals: { breakfast: '', lunch: '', dinner: '' } },
  ]);

  const formattedEntries = entries.length % 2 === 0 ? entries : [...entries, null as unknown as DiaryEntry];

  const [currentPage, setCurrentPage] = useState(2);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage + 2 < formattedEntries.length + 2; // ✅ เพิ่มเงื่อนไขหน้าสุดท้าย

  const calculatePainData = () => {
    const monthlyData: { [key: string]: { total: number; count: number } } = {};
    
<<<<<<< HEAD
    entries.forEach((entry) => {
      const [, month] = entry.date.split(" ");
      if (!monthlyData[month]) monthlyData[month] = { total: 0, count: 0 };
      monthlyData[month].total += entry.painLevel;
      monthlyData[month].count += 1;
    });

    return Object.keys(monthlyData).map((month) => ({
      month,
      averagePain: monthlyData[month].total / monthlyData[month].count,
    }));
  };
=======
    const [entries, setEntries] = useState<DiaryEntry[]>([
        { date: '29 December 2023', time: '6:00 PM', symptom: '', painLevel: 3, meals: { breakfast: '' } },
        { date: '30 December 2023', time: '5:30 PM', symptom: '', painLevel: 1, meals: { breakfast: '' } },
        { date: '31 December 2023', time: '5:48 PM', symptom: '', painLevel: 2, meals: { breakfast: '' } },
        { date: '1 January 2024', time: '6:58 PM', symptom: '', painLevel: 2, meals: { breakfast: '' } },
        { date: '2 January 2024', time: '7:00 PM', symptom: '', painLevel: 2, meals: { breakfast: '' } }
      ]);
      
      
      const [isFetching, setIsFetching] = useState(false);
    
      const formattedEntries = entries.length % 2 === 0 ? entries : [...entries, null as unknown as DiaryEntry];
      const [currentPage, setCurrentPage] = useState(2);
      const canGoPrevious = currentPage > 0;
      const canGoNext = currentPage + 2 < entries.length;
      
      const fetchMoreEntries = () => {
        if (isFetching) return;
        setIsFetching(true);
      
        let newEntries: DiaryEntry[] = [
          { date: '28 December 2023', time: '6:00 PM', symptom: '', painLevel: 3, meals: { breakfast: '' } },
          { date: '27 December 2023', time: '5:30 PM', symptom: '', painLevel: 1, meals: { breakfast: '' } },
          { date: '26 December 2023', time: '5:30 PM', symptom: '', painLevel: 1, meals: { breakfast: '' } },
          { date: '25 December 2023', time: '5:30 PM', symptom: '', painLevel: 1, meals: { breakfast: '' } },
          { date: '24 December 2023', time: '5:30 PM', symptom: '', painLevel: 1, meals: { breakfast: '' } }
        ];
      
        setEntries((prev) => [...newEntries, ...prev]);
      
        // ✅ ปรับให้หน้าแรกยังเป็น 30 Dec - 31 Dec
        setCurrentPage((prev) => prev + 2);
      
        setTimeout(() => setIsFetching(false), 500);
      };
      
      // ✅ เช็คว่าถอยหลังไปถึงหน้าแรกหรือยัง แล้วโหลดเพิ่ม
      useEffect(() => {
        if (currentPage === 0) {
          fetchMoreEntries();
        }
      }, [currentPage]);
      
      
      const previous = () => {
        setCurrentPage((prev) => Math.max(prev - 2, 0)); // ✅ ป้องกันติดลบ
      };
      
      const next = () => {
        if (currentPage + 2 < formattedEntries.length) {
          setCurrentPage((prev) => prev + 2);
        }
      };
      
>>>>>>> bda4de12bd6b9939c11a4151bc63c124b81aa6ea

  return (
    <div className="center">
      <div className="book-container">
        <button className="clip-marker diary-marker" onClick={() => setCurrentPage(0)}>
          <span>Diary</span>
        </button>
        <button className="clip-marker followup-marker" onClick={() => setCurrentPage(formattedEntries.length)}>
          <span>Follow-up</span>
        </button>

        <div className="book">
          <button className="nav-button left" onClick={() => setCurrentPage((prev) => Math.max(prev - 2, 0))} disabled={!canGoPrevious}>
            <SlArrowLeft />
          </button>

          <div className="pages">
            {Array.from({ length: Math.ceil(formattedEntries.length / 2) + 1 }).map((_, index) => {
              const leftPage = index * 2;
              const rightPage = leftPage + 1;
              const isLastPage = leftPage >= formattedEntries.length; // ✅ เช็คว่าถึงหน้าสุดท้ายหรือยัง

              return (
                <div
                  key={index}
                  className={`page ${leftPage === currentPage ? "active" : ""}`}
                  style={{
                    transform: leftPage < currentPage ? "rotateY(180deg)" : "rotateY(0deg)",
                    zIndex: leftPage === currentPage ? "9999" : "9998",
                  }}
                >
                  {/* ✅ หน้าซ้าย */}
                  <div className="page-side front w-full h-full flex items-center justify-center">
                    {isLastPage ? (
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
                      formattedEntries[leftPage] && (
                        <DiaryCard
                          key={`left-${leftPage}`}
                          date={formattedEntries[leftPage]?.date ?? ""}
                          time={formattedEntries[leftPage]?.time ?? ""}
                          activity={formattedEntries[leftPage]?.activity ?? ""}
                          symptom={formattedEntries[leftPage]?.symptom ?? ""}
                          painLevel={formattedEntries[leftPage]?.painLevel ?? 0}
                          meals={formattedEntries[leftPage]?.meals ?? { breakfast: "", lunch: "", dinner: "" }}
                        />
                      )
                    )}
                  </div>

                  {/* ✅ หน้าขวา */}
                  <div className="page-side back w-full h-full flex items-center justify-center">
                    {isLastPage ? (
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={calculatePainData()}>
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 10]} />
                            <Tooltip />
                            <Bar dataKey="averagePain" fill="#ff7f50" />
                          </BarChart>
                        </ResponsiveContainer>
                        <h3>
                          สุขภาพ{" "}
                          {calculatePainData().reduce((sum, d) => sum + d.averagePain, 0) / calculatePainData().length < 5
                            ? "😊 ดีขึ้นแล้ว!"
                            : "😟 ต้องดูแลตัวเองเพิ่ม!"}
                        </h3>
                      </div>
                    ) : (
                      formattedEntries[rightPage] && (
                        <DiaryCard
                          key={`right-${rightPage}`}
                          date={formattedEntries[rightPage]?.date ?? ""}
                          time={formattedEntries[rightPage]?.time ?? ""}
                          activity={formattedEntries[rightPage]?.activity ?? ""}
                          symptom={formattedEntries[rightPage]?.symptom ?? ""}
                          painLevel={formattedEntries[rightPage]?.painLevel ?? 0}
                          meals={formattedEntries[rightPage]?.meals ?? { breakfast: "", lunch: "", dinner: "" }}
                        />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="nav-button right" onClick={() => setCurrentPage((prev) => prev + 2)} disabled={!canGoNext}>
            <SlArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
