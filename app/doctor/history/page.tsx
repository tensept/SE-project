"use client";
import React, { useState, useEffect } from "react";
import { useDoctorContext } from "../../contexts/DoctorContext";

const SymptomTracker = () => {
  const { diaryId } = useDoctorContext();
  const [date, setDate] = useState("");
  const [patient, setPatient] = useState("");
  const [activity, setActivity] = useState("");
  const [painLevel, setPainLevel] = useState(1);
  const [symptom, setSymptom] = useState("");
  const [breakfastNote, setBreakfastNote] = useState("");
  const [lunchNote, setLunchNote] = useState("");
  const [dinnerNote, setDinnerNote] = useState("");
  const [symptomImage, setSymptomImage] = useState<string>("");
  const [breakfastImage, setBreakfastImage] = useState<string>("");
  const [lunchImage, setLunchImage] = useState<string>("");
  const [dinnerImage, setDinnerImage] = useState<string>("");
  const [checkedFoods, setCheckedFoods] = useState([]);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const path = process.env.NEXT_PUBLIC_BACK_END;
        const response = await fetch(`${path}/diaries/${diaryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data fetched:", result);

        const {
          date,
          patient,
          activity,
          symptom,
          painScore,
          breakfast,
          lunch,
          dinner,
          food,
        } = result;

        setDate(date);
        setPatient(patient.name);
        setActivity(activity);
        setSymptom(symptom);
        setPainLevel(painScore);
        setBreakfastNote(breakfast);
        setLunchNote(lunch);
        setDinnerNote(dinner);
        setCheckedFoods(food);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchImage = async () => {
      const path = process.env.NEXT_PUBLIC_BACK_END;
      try {
        console.log("Fetching data from:", path);

        const response = await fetch(`${path}/images/${diaryId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data fetched:", result);

        for (const image of result) {
          switch (image.label) {
            case "symptom": {
              setSymptomImage(image.url);
              break;
            }
            case "breakfast": {
              setBreakfastImage(image.url);
              break;
            }
            case "lunch": {
              setLunchImage(image.url);
              break;
            }
            case "dinner": {
              setDinnerImage(image.url);
              break;
            }
            default: {
              console.log(`Unknown label: ${image.label}`);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDiary();
    fetchImage();
  }, [diaryId]);

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-pink-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                fill="#FF89A3"
              />
              <path
                d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                fill="#FF89A3"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-medium text-lg text-black">{patient}</h1>
            <p className="text-sm text-gray-500">
              {date}
              <br />
              5:48 PM
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <button className="px-4 py-2 bg-pink-200 text-gray-800 rounded-full flex items-center">
            <svg
              className="mr-2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="#333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Symptom</h2>
          <div className="border border-blue-400 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-blue-300">
            <textarea
              className="w-full outline-none resize-none bg-transparent text-black"
              rows={3}
              value={symptom}
              readOnly={true}
            ></textarea>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Pain Status</h2>
          <div className="mb-1">
            <div className="relative w-full h-3 bg-pink-200 rounded-full">
              <div
                className="absolute -top-1.5 w-6 h-6 bg-pink-400 rounded-full shadow-md"
                style={{ left: `calc(${(painLevel - 0.33) * 10}% - 10px)` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <span
                key={num}
                className="cursor-pointer"
                // onClick={() => setPainLevel(num)}
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Breakfast</h2>
          <div className="border border-blue-400 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-blue-300">
            <textarea
              className="w-full outline-none resize-none bg-transparent text-black"
              rows={3}
              value={breakfastNote}
              readOnly={true}
            ></textarea>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Lunch</h2>
          <div className="border border-blue-400 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-blue-300">
            <textarea
              className="w-full outline-none resize-none bg-transparent text-black"
              rows={3}
              value={lunchNote}
              readOnly={true}
            ></textarea>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Dinner</h2>
          <div className="border border-blue-400 rounded-2xl p-4 focus-within:ring-2 focus-within:ring-blue-300">
            <textarea
              className="w-full outline-none resize-none bg-transparent text-black"
              rows={3}
              value={dinnerNote}
              readOnly={true}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;
