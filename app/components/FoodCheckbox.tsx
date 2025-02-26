import React from "react";

const restrictedFoods = [
  "ชา", "กาแฟ", "น้ำเย็น", "บุหรี่", "เหล้า", "เบียร์",
  "ข้าวเหนียว", "อาหารหมักดอง", "ไข่ไก่", "ปลาเค็ม", "ปลาร้า",
  "ไก่", "หมู", "วัว", "ปลาไม่มีเกล็ด", "เครื่องในสัตว์", 
  "อาหารทะเล", "เส้นก๋วยเตี๋ยว", "อาหารแปรรูป", "มาม่า", "ปลากระป๋อง"
];

interface FoodCheckboxProps {
  selectedFoods: string[]; // กำหนดให้เป็น array ของ string
  setSelectedFoods: React.Dispatch<React.SetStateAction<string[]>>; // ฟังก์ชัน setState
}

const FoodCheckbox: React.FC<FoodCheckboxProps> = ({ selectedFoods, setSelectedFoods }) => {
  const toggleFood = (food: string) => {
    if (selectedFoods.includes(food)) {
      setSelectedFoods(selectedFoods.filter((item) => item !== food));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px 20px", maxWidth: "800px", margin: "auto"
    }}>
      {restrictedFoods.map((food, index) => (
        <label key={index} style={{ color: "#d81b60", display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={selectedFoods.includes(food)}
            onChange={() => toggleFood(food)}
            style={{ marginRight: "10px" }}
          />
          {food}
        </label>
      ))}
    </div>
  );
};

export default FoodCheckbox;
