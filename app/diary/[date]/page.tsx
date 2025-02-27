"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
const DiaryPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const pathname = usePathname(); // ดึง path ปัจจุบัน เช่น "/diary/2025-01-06"
  const [activity, setActivity] = useState("");
  const [symptom, setSymptom] = useState("");
  const [painLevel, setPainLevel] = useState(1);
  const [breakfastNote, setBreakfastNote] = useState("");
  const [lunchNote, setLunchNote] = useState("");
  const [dinnerNote, setDinnerNote] = useState("");
  const [symptomImage, setSymptomImage] = useState<string>("");
  const [breakfastImage, setBreakfastImage] = useState<string>("");
  const [lunchImage, setLunchImage] = useState<string>("");
  const [dinnerImage, setDinnerImage] = useState<string>("");
  const [diaryID, setDiaryID] = useState(null);
  const [checkedFoods, setCheckedFoods] = useState(false);

  useEffect(() => {
    const fetchDiary = async () => {
      const path = process.env.NEXT_PUBLIC_BACK_END;

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

        const { id, activity, symptom, painScore, breakfast, lunch, dinner, food } = result;
        setDiaryID(id);
        setActivity(activity || "");
        setSymptom(symptom || "");
        setPainLevel(painScore || 1);
        setBreakfastNote(breakfast || "");
        setLunchNote(lunch || "");
        setDinnerNote(dinner || "");
        setCheckedFoods(food);

        console.log("id: ",id);
        const imageResponse = await fetch(`${path}/images/${id}`, {
          method: "GET", // Explicitly specify the GET method
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result2 = await imageResponse.json();
        console.log("Data fetched2:", result2);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Demo POST patient
    const postPatient = async () => {
      const path = process.env.NEXT_PUBLIC_BACK_END;

      try {
      console.log("Posting patient to:", path);
      const response = await fetch(path + "/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 2,
          name: "John Doe",
          age: 30,
        }),
      })
      } catch (error) {
        console.error("Error post patient:", error);
      };
    };

    postPatient();
    fetchDiary();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      const path = process.env.NEXT_PUBLIC_BACK_END;
      try {
        console.log("Fetching data from:", path);

        const response = await fetch(`${path}/images/${diaryID}`, {
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

    if (diaryID) {
      fetchImage();
    }
  }, [diaryID])

  const dateFromPath = pathname.split("/").pop(); // ดึงวันที่จาก path

  useEffect(() => {
    if (dateFromPath) {
      setCurrentDate(new Date(dateFromPath)); // แปลงวันที่จาก string เป็น Date object
    }
  }, []);

  const createDiary = async () => {
    const path = process.env.NEXT_PUBLIC_BACK_END;

    try {
      console.log("Posting data to:", path);

      const response = await fetch(path + "/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: 2,
          date: dateFromPath,
          activity: activity,
          symptom: symptom,
          painScore: painLevel,
          breakfast: breakfastNote,
          lunch: lunchNote,
          dinner: dinnerNote,
          food: checkedFoods,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Data posted:", result);

      const { id } = result;
      setDiaryID(id);

      const imageUpload = await fetch(`${path}/images/${id}`, {
        method: "POST", // Explicitly specify the GET method
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result2 = await imageUpload.json();
      console.log("Data upload2:", result2);

    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const updateDiary = async () => {
    // accept id as a parameter
    const path = process.env.NEXT_PUBLIC_BACK_END;

    console.log({
      patientId: 2,
      date: dateFromPath,
      activity: activity,
      symptom: symptom,
      painScore: painLevel,
      breakfast: breakfastNote,
      lunch: lunchNote,
      dinner: dinnerNote,
      food: checkedFoods,
    })

    const response = await fetch(`${path}/diaries/${diaryID}`, {
      // Include id in the URL
      method: "PATCH", // Use PATCH instead of PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientId: 2,
        date: dateFromPath,
        activity: activity,
        symptom: symptom,
        painScore: painLevel,
        breakfast: breakfastNote,
        lunch: lunchNote,
        dinner: dinnerNote,
        food: checkedFoods,
      }),
    });

    if (response.ok) {
      alert("Diary updated successfully!");
    } else {
      alert("Failed to update diary!");
    }
  };

  
  const uploadImage = async () => {
    const path = process.env.NEXT_PUBLIC_BACK_END;
  
    const imageUrls = [
      { url: symptomImage, filename: "symptom" },
      { url: breakfastImage, filename: "breakfast" },
      { url: lunchImage, filename: "lunch" },
      { url: dinnerImage, filename: "dinner" },
    ];
  
    const formData = new FormData();
  
    for (const { url, filename } of imageUrls) {
      if (url) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const file = new File([blob], `${filename}.jpg`, { type: blob.type });
          formData.append("images", file);
        } catch (error) {
          console.error("Error converting Blob URL to File:", error);
          alert("Failed to process image.");
          return;
        }
      } else {
        formData.append("images", "");
      }
    }
  
    console.log("FormData before sending:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await fetch(`${path}/images/${diaryID}`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Images uploaded:", result);
      alert("Images updated successfully!");
    } catch (error) {
      console.error("Error updating images:", error);
      alert("Failed to update images!");
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

  const handleSave = async () => {
    console.log("Symptom:", symptom);
    console.log("Pain Level:", painLevel);
    console.log("Breakfase Note:", breakfastNote);
    console.log("Lunch Note:", lunchNote);
    console.log("Dinner Note:", dinnerNote);
    if (diaryID) {
      updateDiary();
      uploadImage();
    } else {
      await createDiary();
      uploadImage();
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

  const foods = [
    "ชา",
    "กาแฟ",
    "น้ำเย็น",
    "บุหรี่",
    "เหล้า",
    "เบียร์",
    "ข้าวเหนียว",
    "อาหารหมักดอง",
    "ไข่ไก่",
    "ปลาเค็ม",
    "ปลาร้า",
    "ไก่",
    "หมู",
    "วัว",
    "ปลาไม่มีเกล็ด",
    "เครื่องในสัตว์",
    "อาหารทะเล",
    "เส้นก๋วยเตี๋ยว",
    "อาหารแปรรูป",
    "มาม่า",
    "ปลากระป๋อง",
  ];

  const checkedBoxFoods = () => {
    if (!checkedFoods) {
      setCheckedFoods(Array(foods.length).fill(false));
    } else {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 คอลัมน์
            gap: "10px 20px", // ระยะห่างระหว่างแถวและคอลัมน์
            maxWidth: "800px", // จำกัดความกว้างของ container
            margin: "auto", // จัดให้อยู่ตรงกลาง
          }}
        >
          {foods.map((food, index) => (
            <label
              key={index}
              style={{
                color: "#d81b60",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                checked={checkedFoods ? checkedFoods[index] : false}
                onChange={() => {
                  const newCheckedFoods = [...checkedFoods];
                  newCheckedFoods[index] = !newCheckedFoods[index];
                  setCheckedFoods(newCheckedFoods);
                  console.log(newCheckedFoods);
                }}
                style={{ marginRight: "10px" }}
                className="custom-checkbox"
              />
              {food}
            </label>
          ))}
        </div>
      );
    }
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
        <h1 style={{ color: "#ff80ab", fontSize: "24px" }}>สมุดบันทึก</h1>
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
            {/* 🗓 Back to Calendar */}
            🗓 กลับสู่หน้าปฏิทิน
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
            {/* ← Previous Day */}← วันก่อนหน้า
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
            {/* Next Day → */}
            วันถัดไป →
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
              "th-TH",
              { month: "long" }
            )} ${currentDate.getFullYear() + 543}`
          : "Loading..."}
      </div>

      {/* Activity Section */}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#000000", fontSize: "18px" }}>
          พฤติกรรมการใช้ชีวิต
        </h2>
        <textarea
          value={activity || ""}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Describe your activity here..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",
            color: "black",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {(activity || "").length}/250
        </div>
      </section>

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
        <h2 style={{ color: "#000000", fontSize: "18px" }}>
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
            border: "1px solid #000000",
            borderRadius: "5px",
            color: "black",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {symptom.length}/250
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer" }}>
            แนบรูปบาดแผล *กรณีผู้ป่วยที่มีบาดแผล*
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSymptomImage)}
              style={{ display: "none" }}
            />
          </label>
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
                  width: "100%", // ปรับให้ภาพแคบลง
                  maxHeight: "300px",
                  height: "auto",
                  objectFit: "contain", // แสดงภาพแบบเต็มโดยไม่ถูกตัด
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0.5, 0.5, 0.5, 0.5)", // เพิ่มเงาให้ภาพดูเด่นขึ้น
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
        <h2 style={{ color: "#000000", fontSize: "18px" }}>ระดับความเจ็บปวด</h2>
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

      <section>
        <h2 style={{ color: "#000000", fontSize: "18px" }}>
          รายการอาหารที่รับประทานได้ : ปลามีเกล็ด ข้าว ลูกเดือย กล้วยน้ำว้า
          มะละกอสุก ผักปลอดสารพิษ น้ำนมจากพืช น้ำไม่เย็น
        </h2>
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
        <h2 style={{ color: "#000000", fontSize: "18px" }}>มื้อเช้า</h2>
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
            border: "1px solid #000000",
            borderRadius: "5px",
            color: "black",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {breakfastNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer" }}>
            แนบรูปอาหารมื้อเช้า
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setBreakfastImage)}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("breakfast-upload").click()} // กดแล้วเปิด input file
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

          <input
            id="breakfast-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setBreakfastImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {breakfastImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={breakfastImage}
                alt="Breakfast Preview"
                style={{
                  width: "100%", // ปรับให้ภาพแคบลง
                  maxHeight: "300px",
                  height: "auto",
                  objectFit: "contain", // แสดงภาพแบบเต็มโดยไม่ถูกตัด
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0.5, 0.5, 0.5, 0.5)", // เพิ่มเงาให้ภาพดูเด่นขึ้น
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
        <h2 style={{ color: "#000000", fontSize: "18px" }}>มื้อกลางวัน</h2>
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
            border: "1px solid #000000",
            borderRadius: "5px",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {lunchNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer" }}>
            แนบรูปอาหารมื้อกลางวัน
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSymptomImage)}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("lunch-upload").click()} // กดแล้วเปิด input file
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
            id="lunch-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setLunchImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {lunchImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={lunchImage}
                alt="Lunch Preview"
                style={{
                  width: "100%", // ปรับให้ภาพแคบลง
                  maxHeight: "300px",
                  height: "auto",
                  objectFit: "contain", // แสดงภาพแบบเต็มโดยไม่ถูกตัด
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0.5, 0.5, 0.5, 0.5)", // เพิ่มเงาให้ภาพดูเด่นขึ้น
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
        <h2 style={{ color: "#000000", fontSize: "18px" }}>มื้อเย็น</h2>
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
            border: "1px solid #000000",
            borderRadius: "5px",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {dinnerNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer" }}>
            แนบรูปอาหารมื้อเย็น
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setSymptomImage)}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => document.getElementById("dinner-upload").click()} // กดแล้วเปิด input file
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
            id="dinner-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setDinnerImage)}
            style={{ display: "none" }} // ซ่อน input
          />

          {dinnerImage && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={dinnerImage}
                alt="Dinner Preview"
                style={{
                  width: "100%", // ปรับให้ภาพแคบลง
                  maxHeight: "300px",
                  height: "auto",
                  objectFit: "contain", // แสดงภาพแบบเต็มโดยไม่ถูกตัด
                  borderRadius: "5px",
                  boxShadow: "0px 4px 6px rgba(0.5, 0.5, 0.5, 0.5)", // เพิ่มเงาให้ภาพดูเด่นขึ้น
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* check junkfood*/}
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#000000", fontSize: "18px" }}>
          หากรับประทานอาหารที่แพทย์สั่งห้ามให้ ✅ ถูกที่หน้าข้อความ
        </h2>
        {/* check box */}
        {checkedBoxFoods()}
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
