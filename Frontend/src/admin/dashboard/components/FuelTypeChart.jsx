import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import { File } from "lucide-react";

const FuelTypeChart = ({ fuelType }) => {
  const chartRef = useRef(null);
  const buttonRef = useRef(null);

  const chartData = fuelType.map((entry) => ({
    name: entry.fuelType,
    value: entry.count,
  }));

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

  const exportToPDF = async () => {
    try {
      const chartElement = chartRef.current;
      const buttonElement = buttonRef.current;

      if (!chartElement) return;

      if (buttonElement) buttonElement.style.display = "none";

      await new Promise((resolve) => setTimeout(resolve, 100));

      const imgData = await htmlToImage.toPng(chartElement);

      if (buttonElement) buttonElement.style.display = "block";

      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let imageWidth = pdfWidth - 20;
      let imageHeight =
        (chartElement.offsetHeight * imageWidth) / chartElement.offsetWidth;

      if (imageHeight > pdfHeight - 20) {
        const scaleFactor = (pdfHeight - 20) / imageHeight;
        imageWidth *= scaleFactor;
        imageHeight = pdfHeight - 20;
      }

      pdf.addImage(imgData, "PNG", 10, 10, imageWidth, imageHeight);
      pdf.save("FuelTypeChart.pdf");
    } catch (error) {
      console.error("Error exporting chart to PDF:", error);
    }
  };

  return (
    <motion.div
      ref={chartRef}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-100">
          FuelTypes Vehicles
        </h2>
        <button
          ref={buttonRef}
          onClick={exportToPDF}
          className="px-3 py-3 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          <File size={20} />
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis
              stroke="#9CA3AF"
              domain={[0, "dataMax"]}
              allowDecimals={false}
              tickFormatter={(value) => Math.round(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
            <Bar dataKey={"value"} fill="#8884d8">
              {fuelType.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default FuelTypeChart;
