"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const DiaryPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const pathname = usePathname(); // ดึง path ปัจจุบัน เช่น "/diary/2025-01-06"
  const [symptom, setSymptom] = useState("");
  const [painLevel, setPainLevel] = useState(1);
  const [breakfastNote, setBreakfastNote] = useState("");
  const [lunchNote, setLunchNote] = useState("");
  const [dinnerNote, setDinnerNote] = useState("");
  const [symptomImage, setSymptomImage] = useState<string | null>(null);
  const [breakfastImage, setBreakfastImage] = useState(null);
  const [lunchImage, setLunchImage] = useState(null);
  const [dinnerImage, setDinnerImage] = useState(null);
  const [diaryID, setDiaryID] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      let path = process.env.BACK_END;

      if (!path) {
        path = "http://localhost:1234";
      }

      try {
        console.log("Fetching data from:", path);

        const response = await fetch(`${path}/diaries/2/${dateFromPath}`, {
          method: "GET", // Explicitly specify the GET method
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data fetched:", result);

        const { id, symptom, painScore, breakfast } = result;
        setDiaryID(id);
        setSymptom(symptom);
        setPainLevel(painScore);
        setMealNote(breakfast);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Demo POST patient
    const postPatient = async () => {
      let path = process.env.BACK_END;

      if (!path) {
        // throw new Error("BACK_END environment variable is not defined");
        path = "http://localhost:1234";
      }

      try {
        console.log("Posting patient to:", path);
        const response = await fetch(path + "/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 2,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data posted:", result);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    postPatient();
    fetchDiary();
  }, []);

  const dateFromPath = pathname.split("/").pop(); // ดึงวันที่จาก path

  useEffect(() => {
    if (dateFromPath) {
      setCurrentDate(new Date(dateFromPath)); // แปลงวันที่จาก string เป็น Date object
    }
  }, []);

  const createDiary = async () => {
    let path = process.env.BACK_END;

    if (!path) {
      // throw new Error("BACK_END environment variable is not defined");
      path = "http://localhost:1234";
    }

    try {
      console.log("Posting data to:", path);

      const response = await fetch(path + "/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient: 2,
          date: dateFromPath,
          symptom: symptom,
          painScore: painLevel,
          breakfast: mealNote,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Data posted:", result);

      const { id } = result;
      setDiaryID(id);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const updateDiary = async () => {
    // accept id as a parameter
    let path = process.env.BACK_END;

    if (!path) {
      path = "http://localhost:1234";
    }

    const response = await fetch(`${path}/diaries/${diaryID}`, {
      // Include id in the URL
      method: "PATCH", // Use PATCH instead of PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: 2,
        date: dateFromPath,
        symptom: symptom,
        painScore: painLevel,
        breakfast: mealNote,
      }),
    });

    if (response.ok) {
      alert("Diary updated successfully!");
    } else {
      alert("Failed to update diary!");
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0]; // Optional chaining เพื่อหลีกเลี่ยง null
    if (file) {
      setImage(URL.createObjectURL(file)); // ใช้ URL ของไฟล์สำหรับแสดงตัวอย่าง
    }
  };

  const handleSave = () => {
    console.log("Symptom:", symptom);
    console.log("Pain Level:", painLevel);
    console.log("Meal Note:", mealNote);
    if (diaryID) {
      updateDiary();
    } else {
      createDiary();
      alert("Diary saved successfully!");
    }
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const painEmojis = [
    "😁",
    "😄",
    "😊",
    "🙂",
    "😐",
    "🙁",
    "😥",
    "🥲",
    "😰",
    "😭",
  ];
  const painColors = [
    "#76c7c0",
    "#99d9ea",
    "#ffd54f",
    "#ffa726",
    "#ff8a65",
    "#ff5252",
  ];

  const getPainColor = (level: number): string => {
    if (level <= 2) return painColors[0]; // Green
    if (level <= 4) return painColors[1]; // Light Blue
    if (level <= 6) return painColors[2]; // Yellow
    if (level <= 8) return painColors[3]; // Orange
    if (level <= 9) return painColors[4]; // Light Red
    return painColors[5]; // Red
  };

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#fff4f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ color: "#ff80ab", fontSize: "24px" }}>Diary</h1>
        <div>
          <button
            onClick={() => router.push("/calendar")}
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            🗓 Back to Calendar
          </button>
          <button
            onClick={handlePreviousDay}
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            ← Previous Day
          </button>
          <button
            onClick={handleNextDay}
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Next Day →
          </button>
        </div>
      </header>

      {/* Current Date */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#d81b60",
          fontWeight: "bold",
        }}
      >
        {currentDate
          ? `${currentDate.getDate()} ${currentDate.toLocaleDateString(
              "en-US",
              { month: "long" }
            )} ${currentDate.getFullYear()}`
          : "Loading..."}
      </div>

      {/* Symptom Section */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#d81b60", fontSize: "18px" }}>
          ลักษณะอาการหรือบาดแผล
        </h2>
        <textarea
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="Describe your symptom here..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #ff80ab",
            borderRadius: "5px",
            color: "black"
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {symptom.length}/250
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#ff80ab", cursor: "pointer" }}>
            แนบรูปบาดแผล
            *กรณีผู้ป่วยที่มีบาดแผล*
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSymptomImage)}
              style={{ display: "none" }}
            />
          </label>
          {symptomImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={symptomImage}
                alt="Symptom Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("meal-upload").click()} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            📸 Attach File
          </button>

          {/* ซ่อน input file และเชื่อมกับปุ่มด้านบน */}
          <input
            id="meal-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setSymptomImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {symptomImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={symptomImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Pain Status Section */}
      {/* ... (ยังมีเนื้อหาสำหรับ Pain และ Meal Section ที่คล้ายกัน) */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#d81b60", fontSize: "18px" }}>ระดับความเจ็บปวด</h2>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <span style={{ marginRight: "10px", color: "#d81b60" }}>1</span>
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            style={{
              flex: 1,
              accentColor: getPainColor(painLevel),
            }}
          />
          <span style={{ marginLeft: "10px", color: "#d81b60" }}>10</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i + 1}
              style={{
                textAlign: "center",
                width: "10%",
                color: painLevel === i + 1 ? "#d81b60" : "#000",
              }}
            >
              {i + 1}
              <br />
              {painEmojis[i]}
            </div>
          ))}
        </div>
      </section>

      {/* Meals SecƟon เช้า */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#d81b60", fontSize: "18px" }}>มื้อเช้า</h2>
        <textarea
          value={breakfastNote}
          onChange={(e) => setBreakfastNote(e.target.value)}
          placeholder="Describe your meals here..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #ff80ab",
            borderRadius: "5px",
            color: "black"
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {breakfastNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#ff80ab", cursor: "pointer" }}>
            แนบรูปอาหารมื้อเช้า
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setBreakfastImage)}
              style={{ display: "none" }}
            />
          </label>
          {breakfastImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={breakfastImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
        
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("meal-upload").click()} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            📸 Attach File
          </button>

          {/* ซ่อน input file และเชื่อมกับปุ่มด้านบน */}
          <input
            id="meal-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setBreakfastImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {breakfastImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={breakfastImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Meals SecƟon กลางวัน */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#d81b60", fontSize: "18px" }}>มื้อกลางวัน</h2>
        <textarea
          value={lunchNote}
          onChange={(e) => setLunchNote(e.target.value)}
          placeholder="Describe your meals here..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #ff80ab",
            borderRadius: "5px",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {lunchNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#ff80ab", cursor: "pointer" }}>
            แนบรูปอาหารมื้อกลางวัน
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSymptomImage)}
              style={{ display: "none" }}
            />
          </label>
          {lunchImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={lunchImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
        
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("meal-upload").click()} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            📸 Attach File
          </button>

          {/* ซ่อน input file และเชื่อมกับปุ่มด้านบน */}
          <input
            id="meal-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setLunchImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {lunchImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={lunchImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Meals SecƟon เย็น */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#d81b60", fontSize: "18px" }}>มื้อเย็น</h2>
        <textarea
          value={dinnerNote}
          onChange={(e) => setDinnerNote(e.target.value)}
          placeholder="Describe your meals here..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #ff80ab",
            borderRadius: "5px",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {dinnerNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#ff80ab", cursor: "pointer" }}>
            แนบรูปอาหารมื้อเย็น
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSymptomImage)}
              style={{ display: "none" }}
            />
          </label>
          {dinnerImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={dinnerImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
        
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("meal-upload").click()} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            📸 Attach File
          </button>

          {/* ซ่อน input file และเชื่อมกับปุ่มด้านบน */}
          <input
            id="meal-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setDinnerImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {dinnerImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={dinnerImage}
                alt="Meal Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </div>
          )}
        </div>
      </section>

      <button
        onClick={handleSave}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: "#ff80ab",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default DiaryPage;
