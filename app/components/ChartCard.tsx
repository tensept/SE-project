import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";

interface ChartCardProps {
  painData: { month: string; averagePain: number }[];
}

const ChartCard: React.FC<ChartCardProps> = ({ painData }) => {
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);
  const [avgPain, setAvgPain] = useState<number>(0);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const emoji = isHealthy ? "😊" : "😟";
  const message = isHealthy
    ? "สุขภาพดี! ทำต่อไปนะ!"
    : "ยังต้องดูแลตัวเองอีกนิด สู้ๆ นะ!";

  useEffect(() => {
    // This will run only on the client side after the component has mounted
    const currentDate = new Date();
    setCurrentMonth(currentDate.getMonth());
  }, []);

  useEffect(() => {
    if (currentMonth !== null && painData.length > currentMonth) {
      setAvgPain(painData[currentMonth].averagePain);
    }
  }, [currentMonth, painData]);
  console.log("painData: ", painData);

  useEffect(() => {
    setIsHealthy(avgPain! < 50);
  }, [avgPain]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-xl mb-1 text-gray-800 flex items-center justify-between noto-sans-thai-bold">
        <span className="noto-sans-thai">แผนภูมิระดับความเจ็บปวด</span>
        <span className="text-2xl">{emoji}</span>
      </h2>
      <div className="noto-sans-thai text-gray-600 mb-4">
        คะแนนเฉลี่ย: {avgPain.toFixed(1)}%
      </div>

      <div className="bg-gray-50 p-3 rounded-lg mb-4 noto-sans-thai">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={painData}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#9ca3af" }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#6b7280" }}
              axisLine={{ stroke: "#9ca3af" }}
              label={{
                value: "ระดับความเจ็บปวด (%)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: "#6b7280" , fontFamily: "Noto Sans Thai"},
              }}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "ระดับความเจ็บปวด"]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <ReferenceLine
              y={50}
              stroke="#ff9800"
              strokeDasharray="3 3"
              label={{
                value: "ระดับเฝ้าระวัง",
                position: "right",
                fill: "#ff9800",
              }}
            />
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
        <div className="text-lg  noto-sans-thai">{message}</div>
        <div className="mt-2 text-sm text-gray-600 noto-sans-thai">
          {isHealthy ? (
            <div>คุณกำลังทำได้ดี ระดับความเจ็บปวดอยู่ในเกณฑ์ที่ควบคุมได้</div>
          ) : (
            <div>
              พยายามลดระดับความเจ็บปวดให้ต่ำกว่า 50% เพื่อสุขภาพที่ดีขึ้น
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
