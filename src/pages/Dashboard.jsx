import React, { useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [energyView, setEnergyView] = useState("weekly");
  const [roomView, setRoomView] = useState("weekly");
  const [deviceView, setDeviceView] = useState("monthly");
  const [temperatureView, setTemperatureView] = useState("weekly");
  const [costView, setCostView] = useState("monthly"); // State for total cost view

  const pricePerKWh = 0.15; // Giá điện

  // Sample data for different views
  const dailyData = [3, 5, 2, 4, 6, 7, 2];
  const weeklyData = [12, 15, 8, 20, 17, 14, 22];
  const monthlyData = [
    120, 150, 180, 200, 170, 140, 220, 210, 190, 160, 180, 200,
  ];
  const yearlyData = [1500, 1600, 1700, 1800]; // Example yearly data
  const roomData = [30, 40, 20, 50]; // Room-wise energy consumption (kWh)
  const deviceUsage = [30, 20, 15, 35]; // Device usage distribution
  const temperatureData = [22, 24, 21, 25, 23, 24, 26]; // Weekly temperature

  // Labels for different views
  const dailyLabels = ["1", "2", "3", "4", "5", "6", "7"];
  const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthlyLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yearlyLabels = ["2021", "2022", "2023", "2024"];
  const roomLabels = ["Living Room", "Bedroom", "Kitchen", "Workroom"];
  const deviceLabels = ["Lights", "Thermostats", "Cameras", "Others"];

  // Calculate total cost based on selected view
  const calculateCost = (data) => {
    return data.reduce((acc, value) => acc + value, 0) * pricePerKWh;
  };

  // Total cost calculation based on selected view
  const totalEnergyUsed =
    costView === "daily"
      ? dailyData
      : costView === "weekly"
      ? weeklyData
      : costView === "monthly"
      ? monthlyData
      : yearlyData;

  const totalCost =
    calculateCost(totalEnergyUsed) +
    calculateCost(roomData) +
    calculateCost(deviceUsage);

  const lineData = {
    labels:
      energyView === "daily"
        ? dailyLabels
        : energyView === "weekly"
        ? weeklyLabels
        : energyView === "monthly"
        ? monthlyLabels
        : yearlyLabels,
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data:
          energyView === "daily"
            ? dailyData
            : energyView === "weekly"
            ? weeklyData
            : energyView === "monthly"
            ? monthlyData
            : yearlyData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: roomLabels,
    datasets: [
      {
        label: "Energy Consumption (kWh)",
        data: roomData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: deviceLabels,
    datasets: [
      {
        data: deviceUsage,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const areaData = {
    labels:
      temperatureView === "daily"
        ? dailyLabels
        : temperatureView === "weekly"
        ? weeklyLabels
        : temperatureView === "monthly"
        ? monthlyLabels
        : yearlyLabels,
    datasets: [
      {
        label: "Temperature (°C)",
        data:
          temperatureView === "daily"
            ? dailyData
            : temperatureView === "weekly"
            ? temperatureData
            : [],
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Energy Consumption Over Time",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#232F70]">Dashboard</h1>
        <p className="text-md text-gray-600">Overview of your smart home</p>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px]">
          <label htmlFor="energy-view" className="mr-2">
            Select Energy View:
          </label>
          <select
            id="energy-view"
            value={energyView}
            onChange={(e) => setEnergyView(e.target.value)}
            className="p-2 border rounded-lg mb-4"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Line data={lineData} options={options} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex-1 min-w-[300px]">
          <Bar data={barData} options={options} />
        </div>
      </div>
      <div className="flex justify-between mt-8 gap-8 ">
        {/* Temperature Area Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md flex-1 w-1/2">
          <label htmlFor="temperature-view" className="mr-2">
            Select Temperature View:
          </label>
          <select
            id="temperature-view"
            value={temperatureView}
            onChange={(e) => setTemperatureView(e.target.value)}
            className="p-2 border rounded-lg mb-4"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Line data={areaData} options={options} />
        </div>
        <div className="bg-green-100 w-1/2 flex-1 h-full p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#232F70]">
              Total Electricity Cost
            </h2>
            <select
              id="cost-view"
              value={costView}
              onChange={(e) => setCostView(e.target.value)}
              className="p-2 border rounded-lg mb-4"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <p className="text-lg text-green-600">
            Total Energy Used:{" "}
            {totalEnergyUsed.reduce((acc, value) => acc + value, 0)} kWh
          </p>
          <p className="text-lg text-green-600">
            Total Cost: ${totalCost.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
