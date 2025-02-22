"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const SymptomTracker = () => {
  const [painLevel, setPainLevel] = useState(10);
  const router = useRouter();
  const restrictedFoods = ['banana', 'lemon', 'cherry', 'apple'];
  
  return (
    <div className="flex flex-col min-h-screen bg-white rounded-3xl">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-pink-100">
      <div className="flex items-center space-x-5">
  <div className="w-10 h-10 rounded-full bg-[#FFC2D1] flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#FFFFFF"/>
      <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#FFFFFF"/>
    </svg>
  </div>
  <div className="ml-2"> {/* หรือใช้ ml-4 ถ้าต้องการห่างมากขึ้น */}
    <h1 className="font-medium text-lg">Guillermo Rauch</h1>
    <p className="text-sm text-gray-500">19 February 2025<br/>5:48 PM</p>
  </div>
</div>

        <div className="ml-auto">
          <button 
          onClick={() => router.push('/doctor')}
          className="px-4 py-2 bg-[#FFC2D1] text-gray-800 rounded-full flex items-center">
            <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ย้อนกลับ
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-1">

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">พฤติกรรมการใช้ชีวิต</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <textarea 
                className="w-full outline-none resize-none bg-transparent" 
                rows={2}
                readOnly
                placeholder="Activity ----------------------------------------------------------------------------"
                defaultValue="Activity ----------------------------------------------------------------------------"
              ></textarea>
            </div>
          </div>

            <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">ลักษณะอาการหรือบาดแผล</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <textarea 
              className="w-full outline-none resize-none bg-transparent" 
              rows={2}
              readOnly
              placeholder="I feel ----------------------------------------------------------------------------"
              defaultValue="I feel ----------------------------------------------------------------------------"
              ></textarea>
              <img 
              src="/12.png" 
              alt="Health Diary" 
              className="object-cover"
              />
            </div>
            </div>

            <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">ระดับความเจ็บปวด</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <textarea 
              className="w-full outline-none resize-none bg-transparent" 
              rows={1}
              readOnly
              placeholder="Level 2"
              defaultValue="Level 2"
              ></textarea>
            </div>
            </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">มื้อเช้า</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <textarea 
                className="w-full outline-none resize-none bg-transparent" 
                rows={2}
                readOnly
                placeholder="---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
                defaultValue="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
              ></textarea>
              <img 
                src="/12.png" 
                alt="Health Diary" 
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">มื้อกลางวัน</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <textarea 
                className="w-full outline-none resize-none bg-transparent" 
                rows={2}
                readOnly
                placeholder="---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
                defaultValue="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
              ></textarea>
              <img 
                src="/12.png" 
                alt="Health Diary" 
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">มื้อเย็น</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <textarea 
                className="w-full outline-none resize-none bg-transparent" 
                rows={2}
                readOnly
                placeholder="---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
                defaultValue="--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
              ></textarea>
              <img 
                src="/12.png" 
                alt="Health Diary" 
                className="object-cover"
              />
            </div>
          </div>

        <div>
          <label className="text-lg font-medium mb-3">อาหารสแลงที่รับประทาน</label>
          <span className="block mb-2 sm:mb-2"></span>
          <div className="pl-6"> {/* ใช้ padding-left เพื่อเยื้องเข้าไป */}
            {restrictedFoods.map((food, index) => (
              <div key={index} className="flex items-center mb-2">
                <CheckCircle className="mr-2 h-5 w-5 text-[#FB6F92]" />
                <span>{food}</span>
              </div>
            ))}
          </div>
        </div>


        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;