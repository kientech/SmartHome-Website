import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time as "8:00PM"
      const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
      const formattedTime = now.toLocaleTimeString([], timeOptions);

      // Format date as "April 20, 2024"
      const dateOptions = { month: "long", day: "numeric", year: "numeric" };
      const formattedDate = now.toLocaleDateString([], dateOptions);

      setCurrentTime(formattedTime);
      setCurrentDate(formattedDate);

      // Set greeting based on the current hour
      const currentHour = now.getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateDateTime(); // Set initial time and date
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between p-4 mx-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-[#232F70] text-xl">
              {greeting}, Kien Duong
            </h1>
            <p className="font-base text-md text-gray-400">Have a nice day</p>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {/* <button className="flex items-center gap-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white">
            <span>
              <IoIosAddCircleOutline />
            </span>
            <span>New Device</span>
          </button> */}
          <div className="">
            <p className="font-semibold text-xl text-blue-500">{currentTime}</p>
            <p className="font-base text-md text-gray-400">{currentDate}</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search device..."
              className="px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
