import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine
} from "recharts";

interface ChartCardProps {
  painData: { month: string; averagePain: number }[];
}

const ChartCard: React.FC<ChartCardProps> = ({ painData }) => {
  console.log("painData", painData);
  const currentMonth = new Date().getMonth();
  console.log("currentMonth", currentMonth);
  const avgPain = painData[currentMonth+1].averagePain;
  console.log("avgPain", avgPain.toFixed(1));
  const isHealthy = avgPain < 50;
  const emoji = isHealthy ? "😊" : "😟";
  const message = isHealthy
    ? "สุขภาพดี! ทำต่อไปนะ!"
    : "ยังต้องดูแลตัวเองอีกนิด สู้ๆ นะ!";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-1 text-gray-800 flex items-center justify-between">
        <span>แผนภูมิระดับความเจ็บปวด</span>
        <span className="text-2xl">{emoji}</span>
      </h2>
      <p className="text-sm text-gray-600 mb-4">คะแนนเฉลี่ย: {avgPain.toFixed(1)}%</p>
      
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={painData} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#9ca3af' }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#9ca3af' }}
              label={{ 
                value: 'ระดับความเจ็บปวด (%)', 
                angle: -90, 
                position: 'insideLeft', 
                style: { textAnchor: 'middle', fill: '#6b7280' } 
              }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'ระดับความเจ็บปวด']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <ReferenceLine y={50} stroke="#ff9800" strokeDasharray="3 3" label={{ value: 'ระดับเฝ้าระวัง', position: 'right', fill: '#ff9800' }} />
            <Bar 
              dataKey="averagePain" 
              name="ระดับความเจ็บปวด" 
              fill={isHealthy ? "#4CAF50" : "#ff6666"} 
              radius={[4, 4, 0, 0]}
              barSize={30}
              animationDuration={1000}
              animationEasing="ease"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="health-status bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-lg font-medium">{message}</p>
        <div className="mt-2 text-sm text-gray-600">
          {isHealthy ? (
            <p>คุณกำลังทำได้ดี ระดับความเจ็บปวดอยู่ในเกณฑ์ที่ควบคุมได้</p>
          ) : (
            <p>พยายามลดระดับความเจ็บปวดให้ต่ำกว่า 50% เพื่อสุขภาพที่ดีขึ้น</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;