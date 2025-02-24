import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartCardProps {
  painData: { month: string; averagePain: number }[];
}

const ChartCard: React.FC<ChartCardProps> = ({ painData }) => {
  const avgPain =
    painData.reduce((sum, d) => sum + d.averagePain, 0) / painData.length || 0;
  const isHealthy = avgPain < 50;
  const emoji = isHealthy ? "😊" : "😟";
  const message = isHealthy
    ? "สุขภาพดี! ทำต่อไปนะ!"
    : "ยังต้องดูแลตัวเองอีกนิด สู้ๆ นะ!";

  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={painData}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="averagePain" fill={isHealthy ? "#4CAF50" : "#ff6666"} />
        </BarChart>
      </ResponsiveContainer>

      <div className="health-status">
        <span className="emoji">{emoji}</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChartCard;
