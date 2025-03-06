import React from "react";

import Image from "next/image";
import "../components/summary.css";
interface SummaryCardProps {
  user: {
    name: string;
    age: number | string;
    gender: string;
    weight: number;
    height: number;
    bloodPressure: number | string;
    profileImage: string;
  };
  painData: { month: string; averagePain: number }[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ user }) => {

  return (
    <div className="summary-card-container">
      {/* ข้อมูลโปรไฟล์ */}
      <Image src={user.profileImage} alt="User" width={150} height={150} />
      <h2>{user.name}</h2>
      <div>อายุ: {user.age} ปี</div>
      <div>เพศ: {user.gender}</div>
      <div>น้ำหนัก: {user.weight} กก.</div>
      <div>ส่วนสูง: {user.height} ซม.</div>
      <div>ความดันโลหิต: {user.bloodPressure}</div>
    </div>
  );
};

export default SummaryCard;
