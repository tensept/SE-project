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
  return (
    <div className="w-full h-full p-6 mb-2">
      <div className="flex flex-col items-center mb-2">
        <span className="text-gray-600">{date}</span>
        <span className="text-gray-400">{time}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="font-medium mb-2">Activities</h3>
          <div className="w-full min-h-[100px] p-2 border border-black rounded-lg bg-white">
            {activity || "I do..... "}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Symptom</h3>
          <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white">
            {symptom || "I feel..."}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Pain Status</h3>
          <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white">
            {`Level ${painLevel}`}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Meals</h3>
          <div className="w-full min-h-[100px] p-2 border border-black rounded-lg bg-white">
            <span style={{ whiteSpace: "pre-line" }}>
              {`Breakfast : ${meals.breakfast}`}{"\n"}
              {`Lunch : ${meals.lunch}`}{"\n"}
              {`Dinner : ${meals.dinner}`}
            </span>
          </div>
        </div>

        {/* ✅ เพิ่มส่วนแสดงอาหารต้องห้ามที่รับประทาน */}
        <div>
          <h3 className="font-medium mb-2">Restricted Foods Consumed</h3>
          <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white">
            {selectedFoods.length > 0 ? selectedFoods.join(", ") : "No restricted foods consumed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
