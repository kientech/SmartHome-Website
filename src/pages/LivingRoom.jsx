import React, { useState, useEffect } from "react";
import { RiLightbulbLine } from "react-icons/ri";
import SwitchToggle from "../components/SwitchToggle";
import { RiTempHotLine } from "react-icons/ri";
import { RiWaterFlashLine } from "react-icons/ri";
import { RiMoreLine } from "react-icons/ri";
import { RiLineChartLine } from "react-icons/ri";
import { RiDoorClosedLine } from "react-icons/ri";

function LivingRoom() {
  const [ws, setWs] = useState(null); // WebSocket connection
  const [isDoorOn, setIsDoorOn] = useState(false);
  const [isLamp1On, setIsLamp1On] = useState(false);
  const [isLamp2On, setIsLamp2On] = useState(false);
  const [isLamp3On, setIsLamp3On] = useState(false);

  const [temperature, setTemperature] = useState(27);
  const [humidity, setHumidity] = useState(80);

  const [isLightOn1, setIsLightOn1] = useState(false);
  const [isLightOn2, setIsLightOn2] = useState(false);
  const [isLightOn3, setIsLightOn3] = useState(false);

  // Kết nối WebSocket khi component được mount
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    setWs(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (message) => {
      console.log(`Received message: ${message.data}`);

      try {
        // Attempt to parse the incoming message as JSON
        const correctedMessage = message.data
          .replace(/\bON\b/g, '"ON"')
          .replace(/\bOFF\b/g, '"OFF"');
        const parsedData = JSON.parse(correctedMessage);
        console.log("🚀 ~ useEffect ~ parsedData:", parsedData);

        // Update the state with the parsed values
        setTemperature(parsedData.temperature);
        setHumidity(parsedData.humidity);
      } catch (error) {
        console.log("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      socket.close();
    };
  }, []);

  // Hàm để gửi lệnh bật/tắt đèn
  const toggleLight1 = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const command = isLightOn1 ? "OFF1" : "ON1";
      ws.send(command);
      setIsLightOn1(!isLightOn1);
    }
  };

  const toggleLight2 = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const command = isLightOn2 ? "OFF2" : "ON2";
      ws.send(command);
      setIsLightOn2(!isLightOn2);
    }
  };

  const toggleLight3 = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const command = isLightOn3 ? "OFF3" : "ON3";
      ws.send(command);
      setIsLightOn3(!isLightOn3);
    }
  };

  // Hàm xử lý bật tắt từng đèn
  const handleDoorToggle = (state) => {
    setIsDoorOn(state);
  };

  const handleLamp1Toggle = (state) => {
    setIsLamp1On(state);
  };

  const handleLamp2Toggle = (state) => {
    setIsLamp2On(state);
  };

  const handleLamp3Toggle = (state) => {
    setIsLamp3On(state);
  };

  return (
    <div className="mt-4">
      <div className="w-full grid grid-cols-4 gap-4">
        {/* Đèn 1 */}
        <div
          className={`py-4 px-6 rounded-lg gap-x-2 transition-colors duration-300 ${
            isDoorOn
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg border border-gray-50 mb-2">
              <RiDoorClosedLine size={24} color={isDoorOn ? "#fff" : "#000"} />
            </div>
            <SwitchToggle onChange={handleDoorToggle} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <h1
              className={`font-semibold text-lg ${
                isDoorOn ? "text-white" : "text-black"
              }`}
            >
              Door
            </h1>
            <h2 className={isDoorOn ? "text-white" : "text-black"}>
              {isDoorOn ? "On" : "Off"}
            </h2>
          </div>
        </div>

        {/* Đèn 2 */}
        <div
          className={`py-4 px-6 rounded-lg gap-x-2 transition-colors duration-300 ${
            isLamp1On
              ? "bg-gradient-to-r from-blue-400 to-blue-500"
              : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg border border-gray-50 mb-2">
              <RiLightbulbLine size={24} color={isLamp1On ? "#fff" : "#000"} />
            </div>
            <SwitchToggle onChange={handleLamp1Toggle} onClick={toggleLight1} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <h1
              className={`font-semibold text-lg ${
                isLamp1On ? "text-white" : "text-black"
              }`}
            >
              Main Light
            </h1>
            <h2 className={isLamp1On ? "text-white" : "text-black"}>
              {isLamp1On ? "On" : "Off"}
            </h2>
          </div>
        </div>

        {/* Đèn 3 */}
        <div
          className={`py-4 px-6 rounded-lg gap-x-2 transition-colors duration-300 ${
            isLamp2On
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
              : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg border border-gray-50 mb-2">
              <RiLightbulbLine size={24} color={isLamp2On ? "#fff" : "#000"} />
            </div>
            <SwitchToggle onChange={handleLamp2Toggle} onClick={toggleLight2} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <h1
              className={`font-semibold text-lg ${
                isLamp2On ? "text-white" : "text-black"
              }`}
            >
              Top Light
            </h1>
            <h2 className={isLamp2On ? "text-white" : "text-black"}>
              {isLamp2On ? "On" : "Off"}
            </h2>
          </div>
        </div>

        {/* Đèn 4 */}
        <div
          className={`py-4 px-6 rounded-lg gap-x-2 transition-colors duration-300 ${
            isLamp3On
              ? "bg-gradient-to-r from-rose-200 to-rose-400"
              : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg border border-gray-50 mb-2">
              <RiLightbulbLine size={24} color={isLamp3On ? "#fff" : "#000"} />
            </div>
            <SwitchToggle onChange={handleLamp3Toggle} onClick={toggleLight3}/>
          </div>
          <div className="flex items-center justify-between mt-2">
            <h1
              className={`font-semibold text-lg ${
                isLamp3On ? "text-white" : "text-black"
              }`}
            >
              Smart TV
            </h1>
            <h2 className={isLamp3On ? "text-white" : "text-black"}>
              {isLamp3On ? "On" : "Off"}
            </h2>
          </div>
        </div>
      </div>

      <div className="my-4">
        <div className="flex gap-x-4">
          <div className=" w-3/4">
            <div className="bg-white p-4 rounded-lg">
              <h1 className="mb-2">Living Room Camera</h1>
              <div className="w-full h-[300px] rounded-lg">
                <img
                  src="https://cdn.dribbble.com/userupload/7213079/file/original-861540030d6a8faab0da7a1308abe88d.png?resize=1504x1128"
                  alt=""
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="px-4 py-8 rounded-lg bg-white mt-4">
              <h1 className="font-base text-md mb-4">Schedules</h1>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  {[1, 2].map((item) => (
                    <div className="flex items-center gap-x-2 bg-red-50 p-2 rounded-lg">
                      <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-300">
                        <RiLightbulbLine color="white" size={24} />
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between gap-x-8">
                          <div className="ml-2">
                            <span className="font-base text-[11px]">Start</span>
                            <p className="font-semibold text-[12px]">
                              20:35:59
                            </p>
                          </div>
                          <div className="h-[20px] w-[1px] bg-gray-200"></div>
                          <div>
                            <span className="font-base text-[11px]">End</span>
                            <p className="font-semibold text-[12px]">
                              20:35:59
                            </p>
                          </div>
                        </div>
                        <div className="ml-16">
                          <RiMoreLine />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 flex flex-col gap-y-4">
            <div className="bg-gradient-to-r from-blue-300 to-blue-500 px-6 py-4 rounded-lg">
              <h1 className="font-base text-md mb-4 text-white">Temerature</h1>
              <div className="flex gap-x-4 items-center mt-2">
                <div className="bg-white inline-block p-2 rounded-lg">
                  <RiTempHotLine size={30} color="#60a5fa" />
                </div>
                <h1 className="font-bold text-3xl text-white">
                  {temperature}ºC
                </h1>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-300 to-blue-500 px-6 py-4 rounded-lg">
              <h1 className="font-base text-md mb-4 text-white">Humidity</h1>
              <div className="flex gap-x-4 items-center mt-2">
                <div className="bg-white inline-block p-2 rounded-lg">
                  <RiWaterFlashLine size={30} color="#60a5fa" />
                </div>
                <h1 className="font-bold text-3xl text-white">{humidity}%</h1>
              </div>
            </div>
            <div className="w-full bg-white px-2 py-4 rounded-lg">
              <div className="bg-green-500 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <h1 className="font-base text-sm text-white">
                    Total Enery Saving
                  </h1>
                  <RiMoreLine color="white" />
                </div>
                <div className="mt-4 flex items-center gap-x-16">
                  <h1 className="font-bold text-xl text-white">456 KWH</h1>
                  <RiLineChartLine size={30} color="white" />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-sm text-gray-300 mb-2">Recent</h1>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <RiLineChartLine />
                        </span>
                        <div>
                          <h1 className="text-[12px] font-semibold">TV Show</h1>
                          <p className="text-[10px] text-gray-300">
                            Today, 10:15
                          </p>
                        </div>
                      </div>
                      <h1 className="text-md font-semibold text-gray-700">
                        123 kWh
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivingRoom;
