/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

const HealthDiaryLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#fef7ff]">
      {/* Navigation Bar
      <nav className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <div className="w-20 h-20  rounded-full flex items-center justify-center mr-2">
            <img src="/logo.png" alt="Logo" className="w-15 h-15" />
          </div>
          <div>
            <span className="font-bold text-lg">Health</span>
            <span className="font-bold text-lg text-pink-500">Care</span>
          </div>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-pink-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-pink-500 font-medium">Diary</a>
          <a href="#" className="text-gray-700 hover:text-pink-500">History</a>
          <a href="#" className="text-gray-700 hover:text-pink-500">Consult</a>
          <a href="#" className="text-gray-700 hover:text-pink-500">How to use</a>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="relative flex justify-center">
        <img src="/12.png" alt="Health Diary" className="object-cover" />
        <div className="absolute left-6 sm:left-10 md:left-12 top-1/2 transform -translate-y-1/2 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-snug sm:leading-tight">
            ยินดีต้อนรับสู่สมุดบันทึก
            <span className="block mb-1 sm:mb-4"></span> {/* ลดระยะห่าง */}
            สำหรับสุขภาพที่ดีขึ้น
          </h1>
          <div className="text-sm sm:text-base noto-sans-thai md:text-lg lg:text-xl text-black mt-1 sm:mt-2 leading-snug sm:leading-normal">
            ช่วยบันทึกข้อมูลสุขภาพของคุณ
            <span className="block mb-1 sm:mb-2"></span>
            ได้รับคำแนะนำจากผู้เชี่ยวชาญ
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* วิธีใช้ */}
          <div className="bg-[#ffedee] rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wider">
              วิธีใช้
            </h2>
            <div className="border-t border-gray-400 mb-6"></div>
            <div className="rounded-3xl overflow-hidden">
              <img
                src="/14.png"
                alt="Medical notebook"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* สมุดบันทึกนี้ทำอะไรได้บ้าง */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              สมุดบันทึกนี้ทำอะไรได้บ้าง
            </h2>
            <div className="border-t border-gray-400 mb-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* คอลัมน์ซ้าย */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">บันทึกอาหารที่กิน</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    บันทึกอาการแต่ละวัน
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    เตือนอาหารที่กินไม่ได้
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    ระบุระดับความเจ็บปวด
                  </span>
                </div>
              </div>

              {/* คอลัมน์ขวา */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">ปรึกษาคุณหมอ</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className= "noto-sans-thai text-lg">ดูประวัติย้อนหลัง</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">
                    เพิ่มเหตุการณ์สำคัญ
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#ffc2d1] rounded-lg flex items-center justify-center">
                    <span className="text-black-800 text-lg">✓</span>
                  </div>
                  <span className="noto-sans-thai text-lg">แจ้งเตือนนัดหมาย</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      {/* <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">สมุดบันทึกนี้ทำอะไรได้บ้าง</h2>
        <div className="border-t border-gray-300 mb-6"></div>
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-medium">1</span>
            </div>
            <div className="text-sm">Click on "Diary" if you want to record your meals.</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-medium">2</span>
            </div>
            <div className="text-sm">You can watch "History" about your diary.</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-medium">3</span>
            </div>
            <div className="text-sm">Click on "Consult" when you need to ask the doctor a question.</div>
          </div>
        </div>
      </div> */}

      {/* <div className="flex justify-center md:justify">
        <img
          src="/8.png"
          alt="Health Diary"
          className="w-full max-w-lg md:max-w-6xl"
        />
      </div> */}

      {/* Footer
      <footer className="container mx-auto p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center mr-2">
            <img src="/api/placeholder/32/32" alt="Logo" className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold">Health</span>
            <span className="font-bold text-pink-500">Care</span>
          </div>
        </div>
        
        <div className="flex space-x-6 text-sm">
          <a href="#" className="text-gray-600 hover:text-pink-500">Home</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">Diary</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">History</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">Consult</a>
        </div>
      </footer> */}
      <br />
    </div>
  );
};

export default HealthDiaryLandingPage;
