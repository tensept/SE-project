'use client';

import React from 'react';

interface DiaryCardProps {
  date: string;
  time: string;
  symptom: string;
  painLevel: number;
  meals: {
    breakfast: string;
  };
}

const DiaryCard: React.FC<DiaryCardProps> = ({ date, time, symptom, painLevel, meals }) => {
    return (
        <div className="w-full h-full p-12 mb-2">
        <div className="flex flex-col items-center mb-6 mt-[-30px]">
          <span className="text-gray-600">{date}</span>
          <span className="text-gray-400">{time}</span>
        </div>
      
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-medium mb-2">Symptom</h3>
            <div className="w-full min-h-[100px] p-2 border border-black rounded-lg bg-white">
                {symptom || "I feel..."}
                </div>

          </div>
      
          <div>
            <h3 className="font-medium mb-2">Pain Status</h3>
            <div className="w-full min-h-[50px] p-2 border border-black rounded-lg bg-white flex items-center">
              {`Level ${painLevel}`}
            </div>
          </div>
      
          <div>
            <h3 className="font-medium mb-2">Meals</h3>
            <div className="w-full min-h-[100px] p-2 border border-black rounded-lg bg-white flex">
              {meals.breakfast || "Breakfast"}
            </div>
          </div>
        </div>
      
      </div>
    );
  };  

export default DiaryCard;