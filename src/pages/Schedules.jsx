import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Schedules() {
  // Sample data for demonstration purposes
  const scheduleData = [
    {
      id: 1,
      deviceName: "Air Conditioner",
      room: "Living Room",
      turnOnTime: "08:00 AM",
      turnOffTime: "10:00 PM",
      status: "On",
    },
    {
      id: 2,
      deviceName: "Lamp",
      room: "Bedroom",
      turnOnTime: "06:00 PM",
      turnOffTime: "06:00 AM",
      status: "Off",
    },
    {
        id: 3,
        deviceName: "Lamp",
        room: "Bedroom",
        turnOnTime: "07:00 PM",
        turnOffTime: "08:00 AM",
        status: "Off",
      },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Schedules
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                No
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                Device Name
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                Room
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                Start
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                End
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => (
              <tr
                key={item.id}
                className={`text-center transition duration-300 ease-in-out ${
                  index % 2 === 0
                    ? "bg-green-50 hover:bg-green-100"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <td className="px-4 py-4 border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-4 border-gray-300">
                  {item.deviceName}
                </td>
                <td className="px-4 py-4 border-gray-300">
                  {item.room}
                </td>
                <td className="px-4 py-4 border-gray-300">
                  {item.turnOnTime}
                </td>
                <td className="px-4 py-4 border-gray-300">
                  {item.turnOffTime}
                </td>
                <td
                  className={`px-4 py-4 border-gray-300 ${
                    item.status === "On"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-4 py-6 border-gray-300 flex justify-center gap-4">
                  <button className="block text-blue-600 hover:text-blue-800 transition duration-200">
                    <FaEdit />
                  </button>
                  <button className="block text-red-600 hover:text-red-800 transition duration-200">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedules;
