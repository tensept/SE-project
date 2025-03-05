'use client';

import React from 'react';

interface DiaryCardProps {
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

const DiaryCard: React.FC<DiaryCardProps> = ({
  date, time, activity, symptom, painLevel, meals, selectedFoods
}) => {
  const formatThaiDate = (dateStr: string) => {
    const [yy, mm, dd] = dateStr.split("-").map(Number);
  
    // รายชื่อเดือนภาษาไทย
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
  
    const thaiYear = yy + 543; // แปลง ค.ศ. เป็น พ.ศ.
  
    return `${dd} ${thaiMonths[mm - 1]} พ.ศ. ${thaiYear}`;
  };
  
  const formattedDate = formatThaiDate(date);
  return (
    <div className="w-full h-full p-6 mb-2">
      <div className="flex flex-col items-center mb-2">
        <span className="noto-sans-thai">{formattedDate}</span>
        <span className="text-gray-400">{time}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="noto-sans-thai mb-3">กิจกรรมที่ทำในวันนี้</h3>
          <div className="w-full min-h-[100px] p-2 border border-black rounded-lg bg-white">
            {activity || "ไม่มีกิจกรรมที่ทำในวันนี้"}
          </div>
        </div>

        <div>
          <h3 className="noto-sans-thai mb-3">อาการความเจ็บปวด</h3>
          <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white noto-sans-thai">
            {symptom || "รู้สึก......."}
          </div>
        </div>

        <div>
          <h3 className="noto-sans-thai mb-3">ระดับความเจ็บปวด</h3>
          <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white noto-sans-thai">
            {`ระดับความเจ็บปวด : ${painLevel}`}
          </div>
        </div>

        <div>
          <h3 className="noto-sans-thai mb-3">มื้ออาหาร</h3>
          <div className="w-full min-h-[100px] p-2 border border-black rounded-lg bg-white Noto Sans Thai">
            <span style={{ whiteSpace: "pre-line", fontFamily: "Noto Sans Thai" }}>
              {`อาหารเช้า : ${meals.breakfast}`}{"\n"}
              {`อาหารกลางวัน : ${meals.lunch}`}{"\n"}
              {`อาหารเย็น : ${meals.dinner}`}
            </span>
          </div>
        </div>

        {/* ✅ เพิ่มส่วนแสดงอาหารต้องห้ามที่รับประทาน */}
        <div>
          <h3 className="noto-sans-thai mb-3">อาหารที่ไม่ควรรับประทาน</h3>
          <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white noto-sans-thai">
            {selectedFoods.length > 0 ? selectedFoods.join(", ") : "ไม่มีอาหารที่ไม่ควรรับประทาน"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
