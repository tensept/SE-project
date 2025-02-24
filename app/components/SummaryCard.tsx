import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Image from "next/image";
import "../components/summary.css"
interface SummaryCardProps {
  user: {
    name: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
    bloodPressure: string;
    profileImage: string;
  };
  painData: { month: string; averagePain: number }[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ user, painData }) => {
  const avgPain =
    painData.reduce((sum, d) => sum + d.averagePain, 0) / painData.length || 0;
  const isHealthy = avgPain < 50;
  const emoji = isHealthy ? "😊" : "😟";
  const message = isHealthy
    ? "สุขภาพดี! ทำต่อไปนะ!"
    : "ยังต้องดูแลตัวเองอีกนิด สู้ๆ นะ!";

  return (
    <div className="summary-card-container">
      {/* ข้อมูลโปรไฟล์ */}
        <Image src={user.profileImage} alt="User" width={150} height={150} /> 
        <h2>{user.name}</h2>
        <p>อายุ: {user.age} ปี</p>
        <p>เพศ: {user.gender}</p>
        <p>น้ำหนัก: {user.weight} กก.</p>
        <p>ส่วนสูง: {user.height} ซม.</p>
        <p>ความดันโลหิต: {user.bloodPressure}</p>
    </div>
  );
};

export default SummaryCard;
