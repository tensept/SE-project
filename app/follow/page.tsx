"use client";
import React, { useState, useEffect } from "react";
import "../follow/flipbook.css"; // ✅ ใช้ไฟล์ CSS เดิม
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import DiaryCard from '../components/DiaryCard';

interface DiaryEntry {
    date: string;
    time: string;
    symptom: string;
    painLevel: number;
    meals: {
      breakfast: string;
    };
  }
const FlipBook: React.FC = () => {
    
    const [entries, setEntries] = useState<DiaryEntry[]>([
        { date: '29 December 2023', time: '6:00 PM', symptom: '', painLevel: 3, meals: { breakfast: '' } },
        { date: '30 December 2023', time: '5:30 PM', symptom: '', painLevel: 1, meals: { breakfast: '' } },
        { date: '31 December 2023', time: '5:48 PM', symptom: '', painLevel: 2, meals: { breakfast: '' } },
        { date: '1 January 2024', time: '6:48 PM', symptom: '', painLevel: 2, meals: { breakfast: '' } },
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
      

  return (
    <div className="center">
      <div className="book-container">
       {/* ✅ Clip Marker 1: Diary */}
       <button
        className="clip-marker diary-marker"
        onClick={() => setCurrentPage(0)}
      >
        Diary
      </button>

      {/* ✅ Clip Marker 2: Follow-up */}
      <button
        className="clip-marker followup-marker"
        onClick={() => setCurrentPage(formattedEntries.length - 1)}
      >
        Follow-up
      </button>
          <div className="book">
            {/* ปุ่มย้อนกลับ */}
        <button className="nav-button left" onClick={previous} disabled={!canGoPrevious}>
          <SlArrowLeft />
        </button>
          <div className="pages">
            <div className="beads">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bead"></div>
              ))}
            </div>

            {Array.from({ length: Math.ceil(formattedEntries.length / 2) }).map((_, index) => {
            const leftPage = index * 2;
            const rightPage = leftPage + 1;

                return (
                    <div
                      key={index}
                      className={`page ${leftPage === currentPage ? "active" : ""}`}
                      style={{
                        transform: leftPage < currentPage ? "rotateY(180deg)" : "rotateY(0deg)",
                        zIndex: leftPage === currentPage ? "9999" : "9998",
                      }}
                    >
                   {/* ✅ หน้าซ้าย (ต้องมีข้อมูล) */}
                {formattedEntries[leftPage] && (
                  <div className="page-side front w-full h-full flex items-center justify-center">
                    <DiaryCard
                      key={`left-${leftPage}`}
                      date={formattedEntries[leftPage]?.date ?? ""}
                      time={formattedEntries[leftPage]?.time ?? ""}
                      symptom={formattedEntries[leftPage]?.symptom ?? ""}
                      painLevel={formattedEntries[leftPage]?.painLevel ?? 0}
                      meals={formattedEntries[leftPage]?.meals ?? { breakfast: "" }}
                    />
                  </div>
                )}

                {/* ✅ หน้าขวา (ต้องมีข้อมูล หรือเว้นว่าง) */}
                {formattedEntries[rightPage] && (
                  <div className="page-side back w-full h-full flex items-center justify-center">
                    <DiaryCard
                      key={`right-${rightPage}`}
                      date={formattedEntries[rightPage]?.date ?? ""}
                      time={formattedEntries[rightPage]?.time ?? ""}
                      symptom={formattedEntries[rightPage]?.symptom ?? ""}
                      painLevel={formattedEntries[rightPage]?.painLevel ?? 0}
                      meals={formattedEntries[rightPage]?.meals ?? { breakfast: "" }}
                    />
                  </div>
                )}
                    </div>
                  );
                })}

            </div>
             {/* ปุ่มไปข้างหน้า */}
             <button className="nav-button right" onClick={next} disabled={!canGoNext}>
          <SlArrowRight />
        </button>
          </div>

      </div>
    </div>
  );
};

export default FlipBook;
