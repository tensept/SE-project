"use client";
import React, { useState, useEffect } from "react";
import "../follow/flipbook.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import DiaryCard from "../components/DiaryCard";
import SummaryCard from "../components/SummaryCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
}

const FlipBook: React.FC = () => {
  const [diary, setDiary] = useState<any>({});
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const fetchDiary = async () => {
    try {
      const response = await fetch(`http://localhost:1234/diaries/1`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 404) {
        console.log("No diary found for the date");
        return;
      }

      const data = await response.json();
      setDiary(data);
      const data_for_ent = data;
      console.log("dfe1: ",data_for_ent);
      setEntries(data_for_ent || []); // ✅ Ensure entries is always an array
    } catch (error) {
      console.error("Error fetching diary:", error);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  const userInfo = {
    profilePic: "/Jud.jpg",
    name: diary?.patient?.name || "",
    age: diary?.patient?.age || "",
    gender: "Male",
    weight: "70 kg",
    height: "175 cm",
    bloodPressure: "120/80",
  };

  const formattedEntries =
    entries.length % 2 === 0 ? entries : [...entries, null as unknown as DiaryEntry];
  console.log("formatted: ",formattedEntries);
  console.log("Entity: ",entries)
  const [currentPage, setCurrentPage] = useState(2);
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage + 2 < formattedEntries.length + 2;

  const calculatePainData = () => {
    const monthlyData: { [key: string]: { total: number; count: number } } = {};

    entries.forEach((entry) => {
      const [, month] = entry.date;
      if (!monthlyData[month]) monthlyData[month] = { total: 0, count: 0 };
      monthlyData[month].total += entry.painLevel;
      monthlyData[month].count += 1;
    });

    return Object.keys(monthlyData).map((month) => ({
      month,
      averagePain: monthlyData[month].total / monthlyData[month].count,
    }));
  };

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
              const isLastPage = leftPage >= formattedEntries.length;

              return (
                <div
                  key={index}
                  className={`page ${leftPage === currentPage ? "active" : ""}`}
                  style={{
                    transform: leftPage < currentPage ? "rotateY(180deg)" : "rotateY(0deg)",
                    zIndex: leftPage === currentPage ? "9999" : "9998",
                  }}
                >
                  {/* ✅ Left Page */}
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
                          date={formattedEntries[leftPage]?.date ?? ""}
                          time={formattedEntries[leftPage]?.time ?? ""}
                          activity={formattedEntries[leftPage]?.activity ?? ""}
                          symptom={formattedEntries[leftPage]?.symptom ?? ""}
                          painLevel={formattedEntries[leftPage]?.painScore ?? 0}
                          meals={formattedEntries[leftPage]?.meals ?? { 
                            breakfast: formattedEntries[leftPage]?.breakfast, 
                            lunch: formattedEntries[leftPage]?.lunch, 
                            dinner: formattedEntries[leftPage]?.dinner 
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* ✅ Right Page */}
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
                          painLevel={formattedEntries[rightPage]?.painScore ?? 0}
                          meals={formattedEntries[rightPage]?.meals ?? { 
                            breakfast: formattedEntries[rightPage]?.breakfast, 
                            lunch: formattedEntries[rightPage]?.lunch, 
                            dinner: formattedEntries[rightPage]?.dinner 
                          }}
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
