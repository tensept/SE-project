"use client";
import React, { useState } from 'react';

const SymptomTracker = () => {
  const [painLevel, setPainLevel] = useState(2);
  
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-pink-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#FF89A3"/>
              <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#FF89A3"/>
            </svg>
          </div>
          <div>
            <h1 className="font-medium text-lg">Guillermo Rauch</h1>
            <p className="text-sm text-gray-500">19 February 2025<br/>5:48 PM</p>
          </div>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 bg-pink-200 text-gray-800 rounded-full flex items-center">
            <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to List
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex flex-1">
        <div className="w-16 bg-pink-50 flex flex-col items-center py-6 space-y-8">
          <button className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center text-white shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 bg-pink-100 border border-pink-200 rounded-md flex items-center justify-center mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H16M8 12H16M8 18H12" stroke="#FF89A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-xs">List</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-10 h-10 bg-transparent border border-gray-200 rounded-md flex items-center justify-center mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-xs">Consult</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Symptom</h2>
            <div className="border border-blue-400 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-blue-300">
              <textarea 
                className="w-full outline-none resize-none bg-transparent" 
                rows={3}
                placeholder="I feel ----------------------------------------------------------------------------"
                defaultValue="I feel ----------------------------------------------------------------------------"
              ></textarea>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-3">Pain Status</h2>
            <div className="mb-1">
              <div className="relative w-full h-3 bg-pink-200 rounded-full">
                <div 
                  className="absolute -top-1.5 w-6 h-6 bg-pink-400 rounded-full shadow-md" 
                  style={{ left: `calc(${(painLevel - 1) * 10}% - 10px)` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 px-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <span 
                  key={num}
                  className="cursor-pointer"
                  onClick={() => setPainLevel(num)}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">Meals</h2>
            <div className="border border-gray-300 rounded-2xl p-4">
              <p className="font-medium mb-2">Breakfast</p>
              <textarea 
                className="w-full outline-none resize-none bg-transparent" 
                rows={5}
                placeholder="--------------------------------------------------------------------------------------------"
                defaultValue="--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;