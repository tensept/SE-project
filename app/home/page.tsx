"use client";
import React from 'react';

const HealthDiaryLandingPage = () => {
  return (
    <div className="min-h-screen bg-pink-40">
      {/* Navigation Bar */}
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
      </nav>

      {/* Hero Section */}
<div className="relative flex justify-center">
  <img 
    src="/12.png" 
    alt="Health Diary" 
    className="object-cover"
  />
  <div className="absolute left-12 top-1/2 transform -translate-y-1/2 p-6">
  <h1 className="text-7xl md:text-2xl font-bold text-black leading-relaxed">
  Welcome to Diary
  <span className="block mb-4"></span> {/* ใช้ span เพื่อเพิ่มระยะห่าง */}
  for Better Health
</h1>
    <br />
    <p className="text-black text-lg md:text-2xl mt-2 leading-loose">
      Experience life's momentum with<span className="block mb-4"></span>health at your command.
    </p>
  </div>
</div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-8 tracking-wider">FEATURES WE PROVIDE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-pink-100 rounded-3xl p-6 flex items-center justify-between">
            <img src="/4.png" alt="Medical notebook" className="w-32 h-32" />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Make your diary</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Food Warning</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Interactive Doctor</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Pain Status</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Record Symptoms</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">History</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Add Event</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-800">✓</span>
              </div>
              <span className="font-medium">Notification</span>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">How to use</h2>
        <div className="border-t border-gray-300 mb-6"></div></div>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-medium">1</span>
            </div>
            <p className="text-sm">Click on "Diary" if you want to record your meals.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-medium">2</span>
            </div>
            <p className="text-sm">You can watch "History" about your diary.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-medium">3</span>
            </div>
            <p className="text-sm">Click on "Consult" when you need to ask the doctor a question.</p>
          </div>
        </div>
      </div> */}


<div className="flex justify-center md:justify">
      <img 
        src="/8.png" 
        alt="Health Diary" 
        className="w-full max-w-lg md:max-w-6xl"
      />
    </div>          

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