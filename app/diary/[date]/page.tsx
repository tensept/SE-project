/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";
import { useDiary as useDiaryContext } from "../../contexts/DiaryContext";
import { useRouter, usePathname } from "next/navigation";

const DiaryPage = () => {
  const router = useRouter();
  const {
    currentDate,
    setCurrentDate,
    activity,
    setActivity,
    symptom,
    setSymptom,
    painLevel,
    setPainLevel,
    breakfastNote,
    setBreakfastNote,
    lunchNote,
    setLunchNote,
    dinnerNote,
    setDinnerNote,
    symptomImage,
    setSymptomImage,
    breakfastImage,
    setBreakfastImage,
    lunchImage,
    setLunchImage,
    dinnerImage,
    setDinnerImage,
    diaryID,
    checkedFoods,
    setCheckedFoods,
    createDiary,
    updateDiary,
    uploadImage,
  } = useDiaryContext();
  console.log(diaryID);

  const pathname = usePathname();
  const dateFromPath = pathname.split("/").pop();

  useEffect(() => {
    if (dateFromPath) {
      setCurrentDate(new Date(dateFromPath));
      console.log("dateFromPath: " + dateFromPath);
      console.log("currentDate: " + currentDate);
    }
  }, [dateFromPath]);

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
    }
  };

  const handlePreviousDay = () => {
    if (currentDate) {
      const previousDay = new Date(currentDate);
      previousDay.setDate(previousDay.getDate() - 1);
      setCurrentDate(previousDay);
    }
  };

  const handleNextDay = () => {
    if (currentDate) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCurrentDate(nextDay);
    }
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
                alignItems: "center",fontFamily: "Noto Sans Thai",
                marginTop:"10px",
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
        <h1 className="text-[#d81b60] text-[30px] noto-sans-thai text-lg" >สมุดบันทึก</h1>
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
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
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
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
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
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
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
          fontFamily: "Noto Sans Thai",
          fontSize: "24px",
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
        <h2 style={{ color: "#000000", fontSize: "18px" ,fontFamily: "Noto Sans Thai", }}>
          พฤติกรรมการใช้ชีวิต
        </h2>
        <textarea
          value={activity || ""}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="อธิบายพฤติกรรมการใช้ชีวิต..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",
            color: "black",
            fontFamily: "Noto Sans Thai",
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
        <h2 style={{ color: "#000000", fontSize: "18px", fontFamily: "Noto Sans Thai", }}>
          ลักษณะอาการหรือบาดแผล
        </h2>
        <textarea
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          placeholder="อธิบายลักษณะอาการ บาดแผล..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",
            color: "black",
            fontFamily: "Noto Sans Thai",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {symptom.length}/250
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer",fontFamily: "Noto Sans Thai", }}>
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
            onClick={() => {
              const mealUploadElement = document.getElementById("meal-upload");
              if (mealUploadElement) {
                mealUploadElement.click();
              }
            }} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
              fontSize:"14px",
            }}
          >
            📸 แนบรูปภาพ
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
      <h2 style={{ color: "#000000", fontSize: "18px" }}>
        ระดับความเจ็บปวด
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i + 1}
            onClick={() => setPainLevel(i + 1)}
            style={{
              cursor: "pointer",
              textAlign: "center",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: painLevel === i + 1 ? "#d81b60" : "#f0f0f0",
              color: painLevel === i + 1 ? "white" : "black",
              transition: "0.3s",
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
        <h2 style={{ color: "#000000", fontSize: "18px" ,fontFamily: "Noto Sans Thai",}}>
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
          marginTop: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          fontFamily: "Noto Sans Thai",
        }}
      >
        <h2 style={{ color: "#000000", fontSize: "18px" }}>มื้อเช้า</h2>
        <textarea
          value={breakfastNote}
          onChange={(e) => setBreakfastNote(e.target.value)}
          placeholder="อธิบายมื้อเช้าที่รับประทาน..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",
            color: "black",fontFamily: "Noto Sans Thai",
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
            onClick={() => {
              const breakfastUploadElement = document.getElementById("breakfast-upload");
              if (breakfastUploadElement) {
                breakfastUploadElement.click();
              }
            }} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
              fontSize:"14px",
            }}
          >
            📸 แนบรูปภาพ
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
        <h2 style={{ color: "#000000", fontSize: "18px" ,fontFamily: "Noto Sans Thai",}}>มื้อกลางวัน</h2>
        <textarea
          value={lunchNote}
          onChange={(e) => setLunchNote(e.target.value)}
          placeholder="อธิบายมื้อกลางวันที่รับประทาน..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",fontFamily: "Noto Sans Thai",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {lunchNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer" ,fontFamily: "Noto Sans Thai", }}>
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
            onClick={() => {
              const lunchUploadElement = document.getElementById("lunch-upload");
              if (lunchUploadElement) {
                lunchUploadElement.click();
              }
            }} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
              fontSize:"14px",
            }}
          >
            📸 แนบรูปภาพ
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
        <h2 style={{ color: "#000000", fontSize: "18px",fontFamily: "Noto Sans Thai", }}>มื้อเย็น</h2>
        <textarea
          value={dinnerNote}
          onChange={(e) => setDinnerNote(e.target.value)}
          placeholder="อธิบายมื้อเย็นที่รับประทาน..."
          maxLength={250}
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #000000",
            borderRadius: "5px",fontFamily: "Noto Sans Thai",
          }}
        />
        <div style={{ textAlign: "right", marginTop: "5px", color: "#d81b60" }}>
          {dinnerNote.length}/250
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ color: "#000000", cursor: "pointer",fontFamily: "Noto Sans Thai", }}>
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
            onClick={() => {
              const dinnerUploadElement = document.getElementById("dinner-upload");
              if (dinnerUploadElement) {
                dinnerUploadElement.click();
              }
            }} // กดแล้วเปิด input file
            style={{
              backgroundColor: "#ff80ab",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginRight: "10px",
              cursor: "pointer",
              fontFamily: "Noto Sans Thai",
              fontWeight: "bold",
              fontSize:"14px",
            }}
          >
            📸 แนบรูปภาพ
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
          หากรับประทานอาหารดังต่อไปนี้ให้ ✅ ถูกที่หน้าข้อความ
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
          fontSize: "16px",fontFamily: "Noto Sans Thai",fontWeight:"bold",
          
        }}
      >
        บันทึกข้อมูล
      </button>
    </div>
  );
};

export default DiaryPage;
